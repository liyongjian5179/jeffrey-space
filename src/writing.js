import "./styles.css";
import { JEFFREY_SITE_DATA as data } from "./content.js";

let currentLang = localStorage.getItem("jeffrey-site-lang") || "zh";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const get = (path) => path.split(".").reduce((obj, key) => obj && obj[key], data[currentLang]);

const complianceDomains = ["liyongjian.top", "5179.top"];
const localDebugHosts = ["localhost", "127.0.0.1", "0.0.0.0", "::1"];

function shouldShowCompliance(hostname = window.location.hostname) {
  const host = hostname.toLowerCase();
  if (localDebugHosts.includes(host)) return true;
  return complianceDomains.some((domain) => host === domain || host.endsWith(`.${domain}`));
}

function syncComplianceVisibility() {
  const compliance = $("[data-domain-compliance]");
  if (!compliance) return;
  compliance.hidden = !shouldShowCompliance();
}

function setMeta(selector, value) {
  const el = $(selector);
  if (el) el.setAttribute("content", value);
}

function renderArticleGroups() {
  const list = $("#writingList");
  if (!list) return;
  const groups = data[currentLang].outputs.articleGroups || [];
  list.innerHTML = groups.map((group, groupIndex) => `
    <section class="article-group">
      <div class="article-group-head">
        <span class="article-group-index">${String(groupIndex + 1).padStart(2, "0")}</span>
        <h2 class="article-group-label">${group.label}</h2>
        <p class="article-group-hint">${group.hint}</p>
      </div>
      <div class="article-group-items">
        ${group.items.map(([date, title, desc, url]) => `
          <a class="article-item" href="${url}" target="_blank" rel="noopener noreferrer">
            <time class="article-date" datetime="${date}">${date}</time>
            <span class="article-main">
              <span class="article-title">${title}<span class="article-arrow" aria-hidden="true">↗</span></span>
              <span class="article-desc">${desc}</span>
            </span>
          </a>
        `).join("")}
      </div>
    </section>
  `).join("");

  const total = groups.reduce((sum, group) => sum + group.items.length, 0);
  const counter = $("#writingCount");
  if (counter) {
    const template = data[currentLang].writingPage.count || "{n}";
    counter.textContent = template.replace("{n}", total);
  }
}

function render() {
  const page = data[currentLang].writingPage;
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  document.title = page.metaTitle;
  setMeta('meta[name="description"]', page.metaDescription);
  setMeta('meta[property="og:title"]', page.metaTitle);
  setMeta('meta[property="og:description"]', page.metaDescription);
  setMeta('meta[name="twitter:title"]', page.metaTitle);
  setMeta('meta[name="twitter:description"]', page.metaDescription);
  syncComplianceVisibility();

  $$("[data-i18n]").forEach((el) => { el.textContent = get(el.dataset.i18n) || ""; });
  $$(".lang button").forEach((btn) => {
    const isActive = btn.dataset.lang === currentLang;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  $("#navLinks").innerHTML = data[currentLang].nav
    .map(([id, label]) => `<a href="/#${id}">${label}</a>`)
    .join("");
  $("#backHome").textContent = `← ${page.back}`;
  renderArticleGroups();
}

$$(".lang button").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem("jeffrey-site-lang", currentLang);
    render();
  });
});

let navOpen = false;
let navCloseTimer = null;

function setNavOpen(isOpen, { focus = true } = {}) {
  const nav = $(".nav");
  const navLinks = $("#navLinks");
  const scrim = $("[data-nav-scrim]");
  const toggle = $("[data-nav-toggle]");
  if (!nav || !navLinks || !scrim || !toggle) return;

  window.clearTimeout(navCloseTimer);
  navOpen = isOpen;
  nav.classList.toggle("nav-open", navOpen);

  const labels = currentLang === "zh"
    ? { open: "关闭菜单", closed: "菜单" }
    : { open: "Close menu", closed: "Menu" };
  const label = navOpen ? labels.open : labels.closed;
  toggle.setAttribute("aria-label", label);
  toggle.setAttribute("aria-expanded", String(navOpen));
  const labelNode = $("[data-nav-toggle-label]", toggle);
  if (labelNode) labelNode.textContent = label;

  if (navOpen) {
    navLinks.classList.add("is-mounted");
    scrim.hidden = false;
    requestAnimationFrame(() => {
      navLinks.classList.add("is-open");
      scrim.classList.add("is-open");
    });
    return;
  }

  navLinks.classList.remove("is-open");
  scrim.classList.remove("is-open");
  if (focus) toggle.focus({ preventScroll: true });
  navCloseTimer = window.setTimeout(() => {
    navLinks.classList.remove("is-mounted");
    scrim.hidden = true;
  }, 150);
}

$("[data-nav-toggle]")?.addEventListener("click", () => setNavOpen(!navOpen));
$("[data-nav-scrim]")?.addEventListener("click", () => setNavOpen(false));

function attachReveal() {
  const items = $$(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible", "reveal-complete"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      window.setTimeout(() => entry.target.classList.add("reveal-complete"), 300);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  items.forEach((el) => observer.observe(el));
}

render();
attachReveal();
