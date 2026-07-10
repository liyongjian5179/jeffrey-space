import "./styles.css";
import { JEFFREY_SITE_DATA as data } from "./content.js";
let currentLang = localStorage.getItem("jeffrey-site-lang") || "zh";
let toastTimer;
let activeProjectIndex = 0;
let activeProjectImageIndex = 0;
let consoleTimers = [];
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const get = (path) => path.split(".").reduce((obj, key) => obj && obj[key], data[currentLang]);

function render() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  $$("[data-i18n]").forEach((el) => { el.textContent = get(el.dataset.i18n) || ""; });
  $$("[data-i18n-html]").forEach((el) => { el.innerHTML = get(el.dataset.i18nHtml) || ""; });
  $$("[data-i18n], [data-i18n-html]").forEach((el) => { el.hidden = !el.textContent.trim(); });
  $$(".lang button").forEach((btn) => btn.classList.toggle("active", btn.dataset.lang === currentLang));

  $("#navLinks").innerHTML = data[currentLang].nav.map(([id, label]) => `<a href="#${id}">${label}</a>`).join("");
  $("#heroActions").innerHTML = data[currentLang].hero.actions.map(([id, label, klass]) => `<a class="btn ${klass}" href="#${id}">${label}</a>`).join("");
  $("#statusStrip").innerHTML = data[currentLang].hero.status.map(([value, label]) => `<div class="status-card"><b>${value}</b><span>${label}</span></div>`).join("");
  $("#heroConsole").innerHTML = `
    <div class="console-title">
      <span class="console-dot"></span>
      <span>${data[currentLang].hero.console.title}</span>
    </div>
    <div class="console-lines">
      ${data[currentLang].hero.console.items.map(([cmd, output]) => `
        <div class="console-line">
          <span class="console-prompt">$</span>
          <span class="console-cmd">${cmd}</span>
          <span class="console-output">${output}</span>
        </div>
      `).join("")}
    </div>
  `;
  animateHeroConsole();

  $("#aboutList").innerHTML = data[currentLang].about.items.map(([num, title, desc]) => `
    <div class="manual-item">
      <span class="manual-icon">${num}</span>
      <div><h3>${title}</h3><p>${desc}</p></div>
    </div>
  `).join("");
  const aboutProfile = data[currentLang].about.profile;
  $("#profilePhotoCard").innerHTML = aboutProfile ? `
    <div class="profile-avatar-frame">
      <span class="profile-avatar-tape">${aboutProfile.stickers?.[0] || "Jeffrey"}</span>
      <img src="${aboutProfile.image}" alt="${aboutProfile.title}">
      <span class="profile-sticker profile-sticker-main">${aboutProfile.stickers?.[1] || "AI Infra"}</span>
      <span class="profile-sticker profile-sticker-note">${aboutProfile.stickers?.[2] || "SRE"}</span>
    </div>
    <figcaption>
      <span>${aboutProfile.label}</span>
      <strong>${aboutProfile.title}</strong>
      <p>${aboutProfile.description}</p>
    </figcaption>
  ` : "";
  $("#metricsGrid").innerHTML = data[currentLang].about.metrics.map(([value, label]) => `
    <div class="metric-card"><span class="value">${value}</span><span class="label">${label}</span></div>
  `).join("");
  $("#beliefSlides").innerHTML = data[currentLang].beliefs.items.map(([num, text, meta], index) => `
    <article class="belief-slide belief-slide-${index + 1} reveal">
      <span class="belief-number">${num}</span>
      <p>${text}</p>
      <small>${meta}</small>
    </article>
  `).join("");
  $("#projectGrid").innerHTML = data[currentLang].projects.items.map(([title, desc, tags, image, input, output], index) => `
    <article class="project-card reveal">
      <img src="${image}" alt="${title}">
      <div class="project-body">
        <h3>${title}</h3>
        <p>${desc}</p>
        ${input && output ? `
          <div class="system-frame">
            <div><b>${data[currentLang].systemFrame.inputLabel}</b><span>${input}</span></div>
            <div><b>${data[currentLang].systemFrame.outputLabel}</b><span>${output}</span></div>
          </div>
        ` : ""}
        <div class="tags">${tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        <button class="project-detail-btn" type="button" data-open-project="${index}">${data[currentLang].systemFrame.detailLabel}</button>
      </div>
    </article>
  `).join("");
  $("#timeline").innerHTML = data[currentLang].experience.items.map(([date, title, company, desc, points], index) => {
    const [logo, link] = data[currentLang].experience.companies[index] || [];
    const labels = data[currentLang].experience.frameLabels;
    const logoMarkup = logo ? `
      <div class="timeline-logo">
        ${link && link !== "#" ? `<a href="${link}" target="_blank" rel="noreferrer" aria-label="${company}">` : ""}
          <img src="${logo}" alt="${company} logo" loading="lazy" decoding="async">
        ${link && link !== "#" ? "</a>" : ""}
      </div>
    ` : "";

    return `
    <article class="timeline-card reveal">
      <div class="timeline-date">${date}</div>
      <div class="timeline-content">
        <div class="timeline-company-row">
          ${logoMarkup}
          <div>
            <h3>${title}</h3>
            <div class="company">${company}</div>
          </div>
        </div>
        <p>${desc}</p>
        <div class="timeline-runbook">
          ${points.map((point, pointIndex) => `
            <div class="timeline-runbook-item">
              <b>${labels[pointIndex] || String(pointIndex + 1).padStart(2, "0")}</b>
              <span>${point}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </article>
  `;
  }).join("");
  $("#skillsGrid").innerHTML = data[currentLang].skills.items.map(([title, subtitle, desc], index) => `
    <article class="skill-card reveal" data-index="${String(index + 1).padStart(2, "0")}">
      <h3>${title}</h3>
      <span class="subtitle">${subtitle}</span>
      <p>${desc}</p>
    </article>
  `).join("");
  $("#outputsGrid").innerHTML = data[currentLang].outputs.items.map(([title, meta, desc, status], index) => `
    <article class="output-card reveal" data-index="${String(index + 1).padStart(2, "0")}">
      <span class="output-status">${status}</span>
      <h3>${title}</h3>
      <p class="output-meta">${meta}</p>
      <p>${desc}</p>
    </article>
  `).join("");
  $("#contactActions").innerHTML = data[currentLang].contact.actions.map(renderContactAction).join("");
  initProjectTilt();
  attachReveal();
  scrollToCurrentHash();
}

function clearConsoleTimers() {
  consoleTimers.forEach((timer) => clearTimeout(timer));
  consoleTimers = [];
}

function typeConsoleOutput(el, chars, index = 0) {
  if (index >= chars.length) {
    el.classList.remove("is-typing");
    return;
  }
  el.textContent += chars[index];
  const timer = setTimeout(() => typeConsoleOutput(el, chars, index + 1), 18 + Math.random() * 24);
  consoleTimers.push(timer);
}

function animateHeroConsole() {
  clearConsoleTimers();
  const outputs = $$(".console-output", $("#heroConsole"));
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  outputs.forEach((el, index) => {
    const chars = Array.from(el.textContent);
    el.textContent = "";
    el.classList.add("is-typing");
    const timer = setTimeout(() => typeConsoleOutput(el, chars), 260 + index * 520);
    consoleTimers.push(timer);
  });
}

function initProjectTilt() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;

  $$(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-3px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function renderContactAction([type, value, label]) {
  if (type === "copy-email") {
    return `<button class="btn" type="button" data-copy-email="${value}">${label}</button>`;
  }
  if (type === "qr") {
    return `<button class="btn" type="button" data-open-qr="${value}">${label}</button>`;
  }
  const externalAttrs = type === "external" ? " target=\"_blank\" rel=\"noreferrer\"" : "";
  return `<a class="btn" href="${value}"${externalAttrs}>${label}</a>`;
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("copy failed");
}

function showToast(message) {
  const toast = $("#siteToast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2400);
}

function openQrModal(image) {
  const modal = $("#qrModal");
  $("#qrTitle").textContent = data[currentLang].contact.qrTitle;
  $("#qrDescription").textContent = data[currentLang].contact.qrDescription;
  $("#qrImage").src = image;
  $("#qrImage").alt = data[currentLang].contact.qrTitle;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  $(".qr-close").focus();
}

function closeQrModal() {
  $("#qrModal").hidden = true;
  document.body.classList.remove("modal-open");
}

function getProject(index = activeProjectIndex) {
  return data[currentLang].projects.items[index];
}

function getProjectImages(project) {
  return project[7] && project[7].length ? project[7] : [project[3]];
}

function renderProjectModalImage() {
  const project = getProject();
  if (!project) return;
  const images = getProjectImages(project);
  const image = images[activeProjectImageIndex] || images[0];
  $("#projectModalImage").src = image;
  $("#projectModalImage").alt = `${project[0]} ${activeProjectImageIndex + 1}`;
  $("#projectModalDots").innerHTML = images.map((_, index) => `
    <button class="${index === activeProjectImageIndex ? "active" : ""}" type="button" data-project-dot="${index}" aria-label="Show image ${index + 1}"></button>
  `).join("");
  $$("[data-project-prev], [data-project-next]").forEach((btn) => {
    btn.hidden = images.length < 2;
  });
}

function openProjectModal(index) {
  const project = getProject(index);
  if (!project) return;
  activeProjectIndex = index;
  activeProjectImageIndex = 0;
  const [title, desc, tags, , input, output, detail] = project;
  $("#projectModalKicker").textContent = data[currentLang].projects.title;
  $("#projectModalTitle").textContent = title;
  $("#projectModalDescription").textContent = detail || desc;
  $("#projectModalFrame").innerHTML = `
    <div><b>${data[currentLang].systemFrame.inputLabel}</b><span>${input}</span></div>
    <div><b>${data[currentLang].systemFrame.outputLabel}</b><span>${output}</span></div>
  `;
  $("#projectModalTags").innerHTML = tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
  renderProjectModalImage();
  $("#projectModal").hidden = false;
  document.body.classList.add("modal-open");
  $(".project-close").focus();
}

function closeProjectModal() {
  $("#projectModal").hidden = true;
  document.body.classList.remove("modal-open");
}

function shiftProjectImage(delta) {
  const project = getProject();
  if (!project) return;
  const images = getProjectImages(project);
  activeProjectImageIndex = (activeProjectImageIndex + delta + images.length) % images.length;
  renderProjectModalImage();
}

function scrollToSection(id, updateHash = true) {
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollTop = 0;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  if (updateHash) history.pushState(null, "", `#${id}`);
  return true;
}

function scrollToCurrentHash() {
  if (!window.location.hash) return;
  requestAnimationFrame(() => {
    scrollToSection(decodeURIComponent(window.location.hash.slice(1)), false);
  });
}

function attachReveal() {
  const items = $$(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => observer.observe(el));
}

$$(".lang button").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem("jeffrey-site-lang", currentLang);
    render();
  });
});

document.addEventListener("click", async (event) => {
  const internalLink = event.target.closest('a[href^="#"]');
  if (internalLink) {
    const id = decodeURIComponent(internalLink.getAttribute("href").slice(1));
    if (id && scrollToSection(id)) {
      event.preventDefault();
      return;
    }
  }

  const projectButton = event.target.closest("[data-open-project]");
  if (projectButton) {
    openProjectModal(Number(projectButton.dataset.openProject));
    return;
  }

  if (event.target.closest("[data-close-project]")) {
    closeProjectModal();
    return;
  }

  if (event.target.closest("[data-project-prev]")) {
    shiftProjectImage(-1);
    return;
  }

  if (event.target.closest("[data-project-next]")) {
    shiftProjectImage(1);
    return;
  }

  const dot = event.target.closest("[data-project-dot]");
  if (dot) {
    activeProjectImageIndex = Number(dot.dataset.projectDot);
    renderProjectModalImage();
    return;
  }

  const qrButton = event.target.closest("[data-open-qr]");
  if (qrButton) {
    openQrModal(qrButton.dataset.openQr);
    return;
  }

  if (event.target.closest("[data-close-qr]")) {
    closeQrModal();
    return;
  }

  const button = event.target.closest("[data-copy-email]");
  if (!button) return;

  const email = button.dataset.copyEmail;
  try {
    await copyText(email);
    showToast(currentLang === "zh" ? `邮箱已复制：${email}` : `Email copied: ${email}`);
  } catch {
    showToast(currentLang === "zh" ? `邮箱：${email}` : `Email: ${email}`);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !$("#qrModal").hidden) closeQrModal();
  if (event.key === "Escape" && !$("#projectModal").hidden) closeProjectModal();
  if ($("#projectModal").hidden) return;
  if (event.key === "ArrowLeft") shiftProjectImage(-1);
  if (event.key === "ArrowRight") shiftProjectImage(1);
});

window.addEventListener("hashchange", scrollToCurrentHash);

render();
