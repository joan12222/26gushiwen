const fs = require("fs");
const path = require("path");
const vm = require("vm");
const pipeline = require("./content-pipeline");

const ROOT = __dirname;
const CONTENT_DIR = path.join(ROOT, "content");
const REQUIRED_SECTIONS = ["标识", "作者", "出处", "行间注释", "原文", "注释", "文化常识", "对照翻译", "全文赏析", "题库"];

function loadWorks() {
  const dataPath = path.join(ROOT, "content-data.js");
  if (fs.existsSync(dataPath)) {
    const context = { window: {} };
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(dataPath, "utf8"), context);
    return JSON.parse(JSON.stringify(context.window.CONTENT_DATA.works));
  }
  const source = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const start = source.indexOf("const works =");
  const end = source.indexOf("const state =");
  if (start < 0 || end < 0) throw new Error("无法从 app.js 定位 works 数据");

  const context = {};
  vm.createContext(context);
  vm.runInContext(
    source.slice(start, end).replace("const works =", "globalThis.works ="),
    context
  );
  return JSON.parse(JSON.stringify(context.works));
}

function parseMarkdown(filePath) {
  const text = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
  const titleMatch = text.match(/^#\s+(.+)$/m);
  const sections = {};
  const headingPattern = /^##\s+(.+)$/gm;
  const headings = [...text.matchAll(headingPattern)];

  headings.forEach((match, index) => {
    const contentStart = match.index + match[0].length;
    const contentEnd = index + 1 < headings.length ? headings[index + 1].index : text.length;
    sections[match[1].trim()] = text.slice(contentStart, contentEnd).trim();
  });

  return {
    file: path.relative(ROOT, filePath).replaceAll("\\", "/"),
    text,
    title: titleMatch ? titleMatch[1].replace(/^\d+\.\s*/, "").trim() : "",
    sections
  };
}

function paragraphCount(section = "") {
  return section
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter((item) => item && !/^###\s+/.test(item))
    .length;
}

function findMarkdownFile(work, files) {
  const suffix = `${work.id}.md`;
  const matches = files.filter((file) => file.endsWith(suffix));
  return matches.length === 1 ? matches[0] : null;
}

function inspect() {
  const works = loadWorks();
  const files = fs.readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(CONTENT_DIR, name));
  const parsed = new Map(files.map((file) => [file, parseMarkdown(file)]));
  const ids = new Set();
  const issues = [];
  const items = [];

  for (const work of works) {
    if (ids.has(work.id)) issues.push({ type: "duplicate-id", id: work.id });
    ids.add(work.id);

    const file = findMarkdownFile(work, files);
    if (!file) {
      issues.push({ type: "markdown-match", id: work.id, message: "未找到唯一 Markdown 文件" });
      continue;
    }

    const markdown = parsed.get(file);
    const missingSections = REQUIRED_SECTIONS.filter((name) => !(name in markdown.sections));
    const pendingCount = (markdown.text.match(/【待核对】/g) || []).length;
    const originalCount = (work.sections["原文"] || []).length;
    const translationCount = (work.sections["对照翻译"] || []).length;
    const explicitPairCount = (work.translationGroups || [])
      .reduce((sum, group) => sum + (group.pairs || []).length, 0);
    const hasExplicitGroups = explicitPairCount > 0 && work.translationGroups.every((group) =>
      group.title && group.author && group.pairs.length &&
      group.pairs.every((pair) => pair.original && pair.translation)
    );
    const markdownOriginalCount = paragraphCount(markdown.sections["原文"]);
    const markdownTranslationCount = paragraphCount(markdown.sections["对照翻译"]);

    if (missingSections.length) {
      issues.push({ type: "missing-section", id: work.id, sections: missingSections });
    }
    if (pendingCount) {
      issues.push({ type: "pending", id: work.id, count: pendingCount });
    }
    if (!originalCount || !translationCount) {
      issues.push({ type: "empty-content", id: work.id });
    }

    items.push({
      id: work.id,
      title: work.title,
      file: markdown.file,
      app: { originalCount, translationCount },
      markdown: {
        originalCount: markdownOriginalCount,
        translationCount: markdownTranslationCount
      },
      explicitPairCount,
      requiresReview: originalCount !== translationCount && !hasExplicitGroups,
      autoPairable: (originalCount === translationCount && originalCount > 0) || hasExplicitGroups
    });
  }

  const matchedFiles = new Set(items.map((item) => item.file));
  for (const markdown of parsed.values()) {
    if (!matchedFiles.has(markdown.file)) {
      issues.push({ type: "orphan-markdown", file: markdown.file });
    }
  }

  try {
    const markdownWorks = pipeline.loadMarkdownWorks().map(({ file, text, ...work }) => work);
    if (JSON.stringify(markdownWorks) !== JSON.stringify(works)) {
      issues.push({ type: "generated-data-mismatch", message: "Markdown 与 content-data.js 不一致，请运行 node content-tool.js build" });
    }
  } catch (error) {
    issues.push({ type: "markdown-parse", message: error.message });
  }

  return { works, files, items, issues };
}

function audit() {
  const result = inspect();
  const reviewItems = result.items.filter((item) => item.requiresReview);
  const summary = {
    works: result.works.length,
    markdownFiles: result.files.length,
    structuralIssues: result.issues.length,
    pendingMarkers: result.issues
      .filter((item) => item.type === "pending")
      .reduce((sum, item) => sum + item.count, 0),
    autoPairable: result.items.filter((item) => item.autoPairable).length,
    requiresReview: reviewItems.length
  };

  console.log(JSON.stringify({ summary, issues: result.issues, reviewItems }, null, 2));
  process.exitCode = result.issues.length ? 1 : 0;
}

function migrate() {
  const result = inspect();
  if (result.issues.length) {
    console.error("审计未通过，不能生成迁移候选。请先运行 node content-tool.js audit。 ");
    process.exitCode = 1;
    return;
  }

  const candidates = result.works.map((work) => {
    if (work.translationGroups) {
      return {
        id: work.id,
        title: work.title,
        status: "explicit",
        groups: work.translationGroups
      };
    }
    const originals = work.sections["原文"] || [];
    const translations = work.sections["对照翻译"] || [];
    if (originals.length !== translations.length) {
      return {
        id: work.id,
        title: work.title,
        status: "review-required",
        originalCount: originals.length,
        translationCount: translations.length
      };
    }
    return {
      id: work.id,
      title: work.title,
      status: "candidate",
      pairs: originals.map((original, index) => ({ original, translation: translations[index] }))
    };
  });

  console.log(JSON.stringify({ generatedAt: new Date().toISOString(), candidates }, null, 2));
}

function applyMigration() {
  const result = inspect();
  const reviewItems = result.items.filter((item) => item.requiresReview);
  if (result.issues.length || reviewItems.length) {
    console.error("审计或人工复核未通过，不能写入规范化 Markdown。");
    process.exitCode = 1;
    return;
  }
  const count = pipeline.applyMigration();
  console.log(`已规范化 ${count} 篇 Markdown。`);
}

function build() {
  const pendingFiles = pipeline.listMarkdownFiles().filter((file) => fs.readFileSync(file, "utf8").includes("【待核对】"));
  if (pendingFiles.length) {
    console.error("存在【待核对】条目，不能生成 content-data.js。");
    process.exitCode = 1;
    return;
  }
  const categories = [
    "全部",
    "高中文言文阅读训练基础篇",
    "高中文言文阅读训练提高篇",
    "高中文言文阅读训练对比阅读",
    "高中古诗词阅读鉴赏训练基础篇",
    "高中古诗词阅读鉴赏训练提高篇",
    "高中古诗词阅读鉴赏训练对比阅读"
  ];
  const works = pipeline.buildData(categories);
  console.log(`已从 Markdown 生成 content-data.js，共 ${works.length} 篇。`);
}

function switchDataSource() {
  pipeline.switchAppToGeneratedData();
  console.log("app.js 已切换为 content-data.js 数据源，并移除整篇翻译兜底逻辑。");
}

function main() {
  const command = process.argv[2];
  if (command === "audit") return audit();
  if (command === "migrate" && process.argv.includes("--apply")) return applyMigration();
  if (command === "migrate") return migrate();
  if (command === "build") return build();
  if (command === "switch") return switchDataSource();
  console.error("用法：node content-tool.js <audit|migrate [--apply]|build|switch>");
  process.exitCode = 1;
}

main();
