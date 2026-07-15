const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const CONTENT_DIR = path.join(ROOT, "content");
const DATA_FILE = path.join(ROOT, "content-data.js");
const REQUIRED_SECTIONS = ["作者", "出处", "标识", "行间注释", "原文", "注释", "文化常识", "对照翻译", "全文赏析", "题库"];

function loadLegacyWorks() {
  const source = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const start = source.indexOf("const works =");
  const end = source.indexOf("const state =");
  if (start < 0 || end < 0) throw new Error("无法从 app.js 定位迁移前数据");
  const context = {};
  vm.createContext(context);
  vm.runInContext(source.slice(start, end).replace("const works =", "globalThis.works ="), context);
  return JSON.parse(JSON.stringify(context.works));
}

function listMarkdownFiles() {
  return fs.readdirSync(CONTENT_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(CONTENT_DIR, name));
}

function findMarkdownFile(id, files) {
  const matches = files.filter((file) => file.endsWith(`${id}.md`));
  if (matches.length !== 1) throw new Error(`${id} 未找到唯一 Markdown 文件`);
  return matches[0];
}

function splitLevelTwoSections(text) {
  const sections = {};
  const matches = [...text.matchAll(/^##\s+(.+)$/gm)];
  matches.forEach((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : text.length;
    sections[match[1].trim()] = text.slice(start, end).trim();
  });
  return sections;
}

function parseParagraphs(value = "") {
  return value.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
}

function parseMetadata(value) {
  const result = {};
  for (const line of value.split("\n")) {
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    result[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }
  return result;
}

function parseAnnotations(value) {
  return parseParagraphs(value).map((line) => {
    const separator = line.indexOf("：");
    if (separator < 0) throw new Error(`无法解析行间注释：${line}`);
    return { term: line.slice(0, separator), note: line.slice(separator + 1) };
  });
}

function parseTranslationGroups(value) {
  const groupMatches = [...value.matchAll(/^###\s+分篇：(.+)$/gm)];
  return groupMatches.map((match, groupIndex) => {
    const start = match.index + match[0].length;
    const end = groupIndex + 1 < groupMatches.length ? groupMatches[groupIndex + 1].index : value.length;
    const body = value.slice(start, end).trim();
    const authorMatch = body.match(/^作者：(.+)$/m);
    const pairMatches = [...body.matchAll(/^###\s+对照\s+\d+\s*$[\s\S]*?^####\s+原文\s*$\n([\s\S]*?)\n^####\s+译文\s*$\n([\s\S]*?)(?=\n^###\s+对照\s+\d+\s*$|$)/gm)];
    return {
      title: match[1].trim(),
      author: authorMatch ? authorMatch[1].trim() : "",
      pairs: pairMatches.map((pair) => ({ original: pair[1].trim(), translation: pair[2].trim() }))
    };
  });
}

function parseQuestions(value) {
  const matches = [...value.matchAll(/^###\s+题目\s+\d+\s*$/gm)];
  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : value.length;
    const body = value.slice(start, end).trim();
    const type = body.match(/^类型：(.+)$/m);
    const prompt = body.match(/^####\s+题干\s*$\n([\s\S]*?)\n^####\s+答案\s*$/m);
    const answer = body.match(/^####\s+答案\s*$\n([\s\S]*)$/m);
    if (!type || !prompt || !answer) throw new Error(`无法解析题目 ${index + 1}`);
    return { type: type[1].trim(), prompt: prompt[1].trim(), answer: answer[1].trim() };
  });
}

function parseMarkdown(filePath) {
  const text = fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
  const title = text.match(/^#\s+(.+)$/m);
  const sections = splitLevelTwoSections(text);
  const missing = REQUIRED_SECTIONS.filter((name) => !(name in sections));
  if (!title || missing.length) throw new Error(`${path.basename(filePath)} 缺少章节：${missing.join("、")}`);
  const metadata = parseMetadata(sections["标识"]);
  return {
    id: metadata.id,
    title: title[1].trim(),
    author: sections["作者"].trim(),
    source: sections["出处"].trim(),
    category: metadata.category,
    keywords: metadata.keywords ? metadata.keywords.split(",").map((item) => item.trim()).filter(Boolean) : [],
    annotations: parseAnnotations(sections["行间注释"]),
    translationGroups: parseTranslationGroups(sections["对照翻译"]),
    sections: {
      "原文": parseParagraphs(sections["原文"]),
      "注释": parseParagraphs(sections["注释"]),
      "文化常识": parseParagraphs(sections["文化常识"]),
      "对照翻译": parseTranslationGroups(sections["对照翻译"]).flatMap((group) => group.pairs.map((pair) => pair.translation)),
      "全文赏析": parseParagraphs(sections["全文赏析"])
    },
    questions: parseQuestions(sections["题库"]),
    file: path.relative(ROOT, filePath).replaceAll("\\", "/"),
    text
  };
}

function makeGroups(work) {
  if (work.translationGroups && work.translationGroups.length) return work.translationGroups;
  const originals = work.sections["原文"] || [];
  const translations = work.sections["对照翻译"] || [];
  if (originals.length !== translations.length) throw new Error(`${work.id} 尚未完成明确对照`);
  return [{
    title: work.title,
    author: work.author,
    pairs: originals.map((original, index) => ({ original, translation: translations[index] }))
  }];
}

function serializeGroups(groups) {
  return groups.map((group) => [
    `### 分篇：${group.title}`,
    "",
    `作者：${group.author}`,
    "",
    ...group.pairs.flatMap((pair, index) => [
      `### 对照 ${index + 1}`,
      "",
      "#### 原文",
      "",
      pair.original,
      "",
      "#### 译文",
      "",
      pair.translation,
      ""
    ])
  ].join("\n").trim()).join("\n\n");
}

function serializeQuestions(questions) {
  return questions.map((question, index) => [
    `### 题目 ${index + 1}`,
    "",
    `类型：${question.type}`,
    "",
    "#### 题干",
    "",
    question.prompt,
    "",
    "#### 答案",
    "",
    question.answer
  ].join("\n")).join("\n\n");
}

function serializeWork(work) {
  const section = (name) => (work.sections[name] || []).join("\n\n");
  return [
    `# ${work.title}`,
    "",
    "## 标识",
    `id: ${work.id}`,
    `category: ${work.category}`,
    `keywords: ${(work.keywords || []).join(", ")}`,
    "",
    "## 作者",
    work.author,
    "",
    "## 出处",
    work.source,
    "",
    "## 行间注释",
    (work.annotations || []).map((item) => `${item.term}：${item.note}`).join("\n\n"),
    "",
    "## 原文",
    section("原文"),
    "",
    "## 注释",
    section("注释"),
    "",
    "## 文化常识",
    section("文化常识"),
    "",
    "## 对照翻译",
    serializeGroups(makeGroups(work)),
    "",
    "## 全文赏析",
    section("全文赏析"),
    "",
    "## 题库",
    serializeQuestions(work.questions || []),
    ""
  ].join("\n");
}

function applyMigration() {
  const works = loadLegacyWorks();
  const files = listMarkdownFiles();
  for (const work of works) {
    fs.writeFileSync(findMarkdownFile(work.id, files), serializeWork(work), "utf8");
  }
  return works.length;
}

function loadMarkdownWorks() {
  return listMarkdownFiles().map(parseMarkdown).sort((a, b) => a.file.localeCompare(b.file));
}

function buildData(categories) {
  const works = loadMarkdownWorks().map(({ file, text, ...work }) => work);
  const data = `// 此文件由 content-tool.js build 自动生成，请勿手工编辑。\nwindow.CONTENT_DATA = ${JSON.stringify({ categories, works }, null, 2)};\n`;
  fs.writeFileSync(DATA_FILE, data, "utf8");
  return works;
}

function switchAppToGeneratedData() {
  const appPath = path.join(ROOT, "app.js");
  const source = fs.readFileSync(appPath, "utf8");
  const stateStart = source.indexOf("const state =");
  if (stateStart < 0) throw new Error("无法定位 app.js 交互逻辑");
  let runtime = source.slice(stateStart);
  const fallback = /\n  const originals = work\.sections\["原文"\] \|\| \[\];[\s\S]*?\n}\n\nfunction renderSection/;
  runtime = runtime.replace(fallback, "\n  return \"\";\n}\n\nfunction renderSection");
  if (runtime.includes("originals.length !== translations.length")) {
    throw new Error("未能移除整篇翻译兜底逻辑");
  }
  fs.writeFileSync(appPath, `const { categories, works } = window.CONTENT_DATA;\n\n${runtime}`, "utf8");
}

module.exports = {
  DATA_FILE,
  REQUIRED_SECTIONS,
  applyMigration,
  buildData,
  listMarkdownFiles,
  loadLegacyWorks,
  loadMarkdownWorks,
  makeGroups,
  parseMarkdown,
  serializeWork,
  switchAppToGeneratedData
};
