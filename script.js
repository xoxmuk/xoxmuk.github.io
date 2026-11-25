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

function text(template, values = {}) {
  return String(template ?? "").replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
}

function applyInterface() {
  const ui = portfolio.interface || {};
  document.documentElement.lang = ui.language || "ru";
  document.title = ui.title || portfolio.profile?.title || "";
  document.querySelectorAll("[data-ui]").forEach(element => {
    element.textContent = ui[element.dataset.ui] || "";
  });
  document.querySelectorAll("[data-ui-title]").forEach(element => {
    element.title = ui[element.dataset.uiTitle] || "";
  });
  document.querySelectorAll("[data-ui-aria]").forEach(element => {
    element.setAttribute("aria-label", ui[element.dataset.uiAria] || "");
  });
  document.querySelectorAll("[data-menu]").forEach(element => {
    element.textContent = ui.menu?.[element.dataset.menu] || "";
  });
  document.querySelectorAll("[data-sidebar]").forEach(element => {
    element.textContent = ui.sidebar?.[element.dataset.sidebar] || "";
  });
  document.getElementById("windowLabel");
  pageTitle.textContent = ui.title || portfolio.profile?.title || "";
}

function header(icon, title, subtitle = "") {
  return `<div class="view-header"><div class="view-icon">${escapeHtml(icon)}</div><div><h1>${escapeHtml(title)}</h1>${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ""}</div></div>`;
}

function renderAbout() {
  const profile = portfolio.profile || {};
  const content = portfolio.interface?.views?.about || {};
  return `${header(content.icon, profile.name || content.title, profile.role || "")}
    <div class="info-grid">
      <section class="card"><h2>${escapeHtml(content.profileHeading)}</h2><div class="card-body"><p>${escapeHtml(profile.description)}</p><p><strong>${escapeHtml(content.nameLabel)}</strong> ${escapeHtml(profile.name)}</p><p><strong>${escapeHtml(content.locationLabel)}</strong> ${escapeHtml(profile.location)}</p></div></section>
      <section class="card"><h2>${escapeHtml(content.welcomeHeading)}</h2><div class="card-body"><p>${escapeHtml(content.welcomeText)}</p><p><a href="${escapeHtml(safeUrl(profile.github || "#"))}" target="_blank" rel="noopener noreferrer">${escapeHtml(content.githubLabel)}</a></p></div></section>
    </div>`;
}

function renderProjects() {
  const projects = Array.isArray(portfolio.projects) ? portfolio.projects : [];
  const content = portfolio.interface?.views?.projects || {};
  const cards = projects.map(project => `<section class="card"><h2>${escapeHtml(project.name)}</h2><div class="card-body"><p>${escapeHtml(project.description)}</p>${project.url ? `<p><a href="${escapeHtml(safeUrl(project.url))}" target="_blank" rel="noopener noreferrer">${escapeHtml(content.openLabel)}</a></p>` : ""}</div></section>`).join("");
  return `${header(content.icon, content.title, text(content.countLabel, { count: projects.length }))}<div class="project-grid">${cards || `<p>${escapeHtml(content.emptyText)}</p>`}</div>`;
}

function renderSkills() {
  const skills = Array.isArray(portfolio.skills) ? portfolio.skills : [];
  const content = portfolio.interface?.views?.skills || {};
  const rows = skills.map(skill => {
    const level = Math.max(0, Math.min(100, Number(skill.level) || 0));
    return `<div><div class="skill-name"><span>${escapeHtml(skill.name)}</span><span>${level}%</span></div><div class="progress"><span style="width:${level}%"></span></div></div>`;
  }).join("");
  return `${header(content.icon, content.title, content.subtitle)}<section class="card"><h2>${escapeHtml(content.heading)}</h2><div class="card-body skills-list">${rows || `<p>${escapeHtml(content.emptyText)}</p>`}</div></section>`;
}

function renderContact() {
  const profile = portfolio.profile || {};
  const content = portfolio.interface?.views?.contact || {};
  const email = profile.email || "";
  const github = profile.github || "";
  return `${header(content.icon, content.title, content.subtitle)}
    <div class="info-grid">
      <section class="card"><h2>${escapeHtml(content.heading)}</h2><div class="card-body">${email ? `<p><strong>${escapeHtml(content.emailLabel)}</strong> <a href="${escapeHtml(safeUrl(`mailto:${email}`))}">${escapeHtml(email)}</a></p>` : ""}${github ? `<p><strong>${escapeHtml(content.githubLabel)}</strong> <a href="${escapeHtml(safeUrl(github))}" target="_blank" rel="noopener noreferrer">${escapeHtml(github)}</a></p>` : ""}</div></section>
    </div>`;
}

const views = {
  about: renderAbout,
  projects: renderProjects,
  skills: renderSkills,
  contact: renderContact
};

function showView(view, updateHistory = true) {
  if (!views[view]) view = "about";
  currentView = view;
  mainArea.innerHTML = views[view]();
  const content = portfolio.interface?.views?.[view] || {};
  pageTitle.textContent = portfolio.interface?.title || portfolio.profile?.title || "";
  addressText.textContent = content.title || "";
  statusText.textContent = view === "projects"
    ? text(portfolio.interface?.status?.projects, { count: portfolio.projects?.length || 0 })
    : view === "skills"
      ? text(portfolio.interface?.status?.skills, { count: portfolio.skills?.length || 0 })
      : content.title || portfolio.interface?.statusDefault || "";
  if (updateHistory && location.hash !== `#${view}`) history.pushState({ view }, "", `#${view}`);
}

async function start() {
  try {
    const response = await fetch("portfolio.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("portfolio.json");
    portfolio = await response.json();
    applyInterface();
    showView(location.hash.slice(1) || "about", false);
  } catch {
    mainArea.textContent = "portfolio.json";
    statusText.textContent = "!";
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
