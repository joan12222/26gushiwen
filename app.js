const { categories, works } = window.CONTENT_DATA;

const state = {
  category: "全部",
  query: "",
  workId: works[0].id,
  tab: "原文",
  annotationsVisible: true,
  answersVisible: true
};

const categoryList = document.querySelector("#categoryList");
const workList = document.querySelector("#workList");
const searchInput = document.querySelector("#searchInput");
const workCategory = document.querySelector("#workCategory");
const workTitle = document.querySelector("#workTitle");
const workMeta = document.querySelector("#workMeta");
const tabStrip = document.querySelector("#tabStrip");
const activeSectionTitle = document.querySelector("#activeSectionTitle");
const sectionBody = document.querySelector("#sectionBody");
const quizList = document.querySelector("#quizList");
const questionCount = document.querySelector("#questionCount");
const toggleAnnotationBtn = document.querySelector("#toggleAnnotationBtn");
const toggleAnswerBtn = document.querySelector("#toggleAnswerBtn");
const printBtn = document.querySelector("#printBtn");

function getActiveWork() {
  return works.find((work) => work.id === state.workId) || works[0];
}

function getFilteredWorks() {
  const query = state.query.trim().toLowerCase();
  return works.filter((work) => {
    const inCategory = state.category === "全部" || work.category === state.category;
    const searchable = [work.title, work.author, work.source, work.category, ...work.keywords].join(" ").toLowerCase();
    return inCategory && (!query || searchable.includes(query));
  });
}

function renderCategories() {
  categoryList.innerHTML = categories.map((category) => {
    const count = category === "全部" ? works.length : works.filter((work) => work.category === category).length;
    const activeClass = category === state.category ? " active" : "";
    return `<button class="category-btn${activeClass}" type="button" data-category="${category}">${category} · ${count}</button>`;
  }).join("");
}

function renderWorkList() {
  const filteredWorks = getFilteredWorks();
  if (!filteredWorks.some((work) => work.id === state.workId) && filteredWorks[0]) {
    state.workId = filteredWorks[0].id;
    state.tab = "原文";
  }

  workList.innerHTML = filteredWorks.map((work) => {
    const activeClass = work.id === state.workId ? " active" : "";
    return `
      <button class="work-btn${activeClass}" type="button" data-work-id="${work.id}">
        <strong>${work.title}</strong>
        <span>${work.author} · ${work.questions.length}题</span>
      </button>
    `;
  }).join("") || `<p class="meta">没有匹配的篇目。</p>`;
}

function renderTabs(work) {
  const tabs = Object.keys(work.sections);
  if (!tabs.includes(state.tab)) {
    state.tab = tabs[0];
  }

  tabStrip.innerHTML = tabs.map((tab) => {
    const activeClass = tab === state.tab ? " active" : "";
    return `<button class="tab-btn${activeClass}" type="button" data-tab="${tab}">${tab}</button>`;
  }).join("");
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderAnnotatedParagraph(paragraph, annotations) {
  const sortedAnnotations = [...annotations].sort((a, b) => b.term.length - a.term.length);
  let cursor = 0;
  let html = "";

  while (cursor < paragraph.length) {
    const matched = sortedAnnotations.find((item) => paragraph.startsWith(item.term, cursor));
    if (matched) {
      html += `
        <span class="annotated-term" tabindex="0">
          <span class="term-text">${escapeHtml(matched.term)}</span>
          <span class="inline-note">${escapeHtml(matched.note)}</span>
        </span>
      `;
      cursor += matched.term.length;
    } else {
      html += escapeHtml(paragraph[cursor]);
      cursor += 1;
    }
  }

  return `<p class="original-paragraph">${html}</p>`;
}

function renderParallelTranslation(work) {
  if (work.translationGroups) {
    return work.translationGroups.map((group) => `
      <section class="translation-group">
        <h3>${escapeHtml(group.title)}</h3>
        <p class="translation-author">${escapeHtml(group.author)}</p>
        ${group.pairs.map((pair) => `
          <div class="translation-pair">
            <p class="translation-original">${escapeHtml(pair.original)}</p>
            <p class="translation-text">${escapeHtml(pair.translation)}</p>
          </div>
        `).join("")}
      </section>
    `).join("");
  }

  return "";
}

function renderSection(work) {
  activeSectionTitle.textContent = state.tab;
  sectionBody.classList.toggle("original-body", state.tab === "原文");
  sectionBody.classList.toggle("translation-pair-body", state.tab === "对照翻译");
  toggleAnnotationBtn.hidden = state.tab !== "原文";
  toggleAnnotationBtn.textContent = state.annotationsVisible ? "隐藏注释" : "显示注释";

  if (state.tab === "原文" && work.annotations && state.annotationsVisible) {
    sectionBody.innerHTML = work.sections[state.tab]
      .map((paragraph) => renderAnnotatedParagraph(paragraph, work.annotations))
      .join("");
    return;
  }

  if (state.tab === "对照翻译") {
    sectionBody.innerHTML = renderParallelTranslation(work);
    return;
  }

  sectionBody.innerHTML = work.sections[state.tab]
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

function renderQuiz(work) {
  questionCount.textContent = `${work.questions.length} 题`;
  quizList.classList.toggle("answers-hidden", !state.answersVisible);
  quizList.innerHTML = work.questions.map((question, index) => `
    <section class="question-item">
      <h4>${index + 1}. ${question.type}</h4>
      <p>${escapeHtml(question.prompt)}</p>
      <div class="answer">${escapeHtml(question.answer)}</div>
    </section>
  `).join("");
  toggleAnswerBtn.textContent = state.answersVisible ? "隐藏答案" : "显示答案";
}

function renderActiveWork() {
  const work = getActiveWork();
  workCategory.textContent = work.category;
  workTitle.textContent = work.title;
  workMeta.textContent = `${work.author} · ${work.source}`;
  renderTabs(work);
  renderSection(work);
  renderQuiz(work);
}

function render() {
  renderCategories();
  renderWorkList();
  renderActiveWork();
}

categoryList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  render();
});

workList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-work-id]");
  if (!button) return;
  state.workId = button.dataset.workId;
  state.tab = "原文";
  render();
});

tabStrip.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tab]");
  if (!button) return;
  state.tab = button.dataset.tab;
  renderActiveWork();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

toggleAnswerBtn.addEventListener("click", () => {
  state.answersVisible = !state.answersVisible;
  renderQuiz(getActiveWork());
});

toggleAnnotationBtn.addEventListener("click", () => {
  state.annotationsVisible = !state.annotationsVisible;
  renderSection(getActiveWork());
});

printBtn.addEventListener("click", () => {
  window.print();
});

render();
