const mainArea = document.getElementById("mainArea");
const pageTitle = document.getElementById("pageTitle");
const addressText = document.getElementById("addressText");
const statusText = document.getElementById("statusText");
const backButton = document.getElementById("backButton");
const forwardButton = document.getElementById("forwardButton");

let portfolio;
let currentView = "about";

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[character]);
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:", "mailto:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}

function header(icon, title, subtitle = "") {
  return `<div class="view-header"><div class="view-icon">${icon}</div><div><h1>${escapeHtml(title)}</h1>${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ""}</div></div>`;
}

function renderAbout() {
  const profile = portfolio.profile || {};
  return `${header("👤", profile.name || "Обо мне", profile.role || "")}
    <div class="info-grid">
      <section class="card"><h2>Профиль</h2><div class="card-body"><p>${escapeHtml(profile.description || "")}</p><p><strong>Имя:</strong> ${escapeHtml(profile.name || "")}</p><p><strong>Местоположение:</strong> ${escapeHtml(profile.location || "")}</p></div></section>
      <section class="card"><h2>Добро пожаловать</h2><div class="card-body"><p>Это моё портфолио — здесь собраны проекты, навыки и контакты.</p><p><a href="${escapeHtml(safeUrl(profile.github || "#"))}" target="_blank" rel="noopener noreferrer">Мой GitHub</a></p></div></section>
    </div>`;
}

function renderProjects() {
  const projects = Array.isArray(portfolio.projects) ? portfolio.projects : [];
  const cards = projects.map(project => `<section class="card"><h2>${escapeHtml(project.name || "Проект")}</h2><div class="card-body"><p>${escapeHtml(project.description || "")}</p>${project.url ? `<p><a href="${escapeHtml(safeUrl(project.url))}" target="_blank" rel="noopener noreferrer">Открыть проект ↗</a></p>` : ""}</div></section>`).join("");
  return `${header("📁", "Проекты", `Всего проектов: ${projects.length}`)}<div class="project-grid">${cards || "<p>Проекты пока не добавлены.</p>"}</div>`;
}

function renderSkills() {
  const skills = Array.isArray(portfolio.skills) ? portfolio.skills : [];
  const rows = skills.map(skill => {
    const level = Math.max(0, Math.min(100, Number(skill.level) || 0));
    return `<div><div class="skill-name"><span>${escapeHtml(skill.name || "Навык")}</span><span>${level}%</span></div><div class="progress"><span style="width:${level}%"></span></div></div>`;
  }).join("");
  return `${header("🛠️", "Навыки", "Технологии и инструменты")}<section class="card"><h2>Мои навыки</h2><div class="card-body skills-list">${rows || "<p>Навыки пока не добавлены.</p>"}</div></section>`;
}

function renderContact() {
  const profile = portfolio.profile || {};
  const email = profile.email || "";
  const github = profile.github || "";
  return `${header("✉️", "Контакты", "Буду рад знакомству и новым проектам")}
    <div class="info-grid">
      <section class="card"><h2>Связаться со мной</h2><div class="card-body">${email ? `<p><strong>Email:</strong> <a href="${escapeHtml(safeUrl(`mailto:${email}`))}">${escapeHtml(email)}</a></p>` : ""}${github ? `<p><strong>GitHub:</strong> <a href="${escapeHtml(safeUrl(github))}" target="_blank" rel="noopener noreferrer">${escapeHtml(github)}</a></p>` : ""}</div></section>
    </div>`;
}

const views = {
  about: { title: "Обо мне", render: renderAbout },
  projects: { title: "Проекты", render: renderProjects },
  skills: { title: "Навыки", render: renderSkills },
  contact: { title: "Контакты", render: renderContact }
};

function showView(view, updateHistory = true) {
  if (!views[view]) view = "about";
  currentView = view;
  mainArea.innerHTML = views[view].render();
  pageTitle.textContent = portfolio.profile?.title || "Портфолио";
  addressText.textContent = views[view].title;
  statusText.textContent = view === "projects"
    ? `${portfolio.projects?.length || 0} объект(ов)`
    : view === "skills"
      ? `${portfolio.skills?.length || 0} навыков`
      : views[view].title;
  if (updateHistory && location.hash !== `#${view}`) history.pushState({ view }, "", `#${view}`);
}

async function start() {
  try {
    const response = await fetch("portfolio.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Не удалось загрузить portfolio.json");
    portfolio = await response.json();
    const initialView = location.hash.slice(1) || "about";
    showView(initialView, false);
  } catch {
    mainArea.innerHTML = `${header("⚠️", "Ошибка загрузки", "Не удалось получить данные портфолио.")}<p>Проверьте, что файл portfolio.json доступен рядом со страницей.</p>`;
    statusText.textContent = "Ошибка";
  }
}

document.querySelectorAll("[data-view]").forEach(button => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

backButton.addEventListener("click", () => history.back());
forwardButton.addEventListener("click", () => history.forward());

window.addEventListener("popstate", () => showView(location.hash.slice(1) || "about", false));
window.addEventListener("hashchange", () => {
  const view = location.hash.slice(1) || "about";
  if (view !== currentView) showView(view, false);
});

start();
