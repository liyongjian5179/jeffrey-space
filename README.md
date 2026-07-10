# Jeffrey Space

Jeffrey Li 的个人数字空间：一个面向 SRE、AI Infra、工程观点、热爱项目、内容输出和联系方式的双语个人网站。

Planned production domain: `hijeffrey.com`

English version is available below: [English](#english)

## 中文

### 项目简介

Jeffrey Space 是一个静态前端项目，可以部署到 GitHub Pages 或任意静态托管服务。它不再作为旧版个人站的延续版本，而是作为 Jeffrey Li 的正式个人站项目维护。

### 站点特点

- 中英双语内容。
- 温暖工程手册风视觉系统。
- 首页和身份系统使用 Jeffrey 个人 IP 插画。
- 关于我部分保留真实头像作为身份锚点。
- 热爱项目卡片支持弹窗图库。
- 覆盖工程观点、经历、技能、公开输出和联系方式。
- 适配桌面、平板和移动端。
- 字体使用线上 Google Fonts + 系统兜底，不再打包大型本地中文字体。

### 目录结构

```text
.
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── wrangler.jsonc
├── src/
│   ├── app.js
│   ├── content.js
│   └── styles.css
├── assets/
│   ├── docs/
│   └── images/
├── AGENTS.md
├── PROJECT_NOTES.md
├── PROJECT_HISTORY.md
└── RESPONSIVE_CHECKLIST.md
```

### 核心文件

- `index.html`：静态入口，包含统计脚本、导航、页面结构、弹窗和 Vite module 入口。
- `vite.config.js`：Vite 构建配置，生产 JS/CSS/media 输出到 `dist/assets/js|css|media`，静态资源保留在 `dist/assets/images|docs`。
- `wrangler.jsonc`：Cloudflare Workers Static Assets 部署配置，供必须填写 Deploy command 的 Cloudflare 项目使用。
- `src/content.js`：中英双语内容数据，包括导航、首页、观点、热爱、经历、技能、输出和联系方式。
- `src/app.js`：页面渲染、语言切换、滚动 reveal、项目图库、二维码弹窗等交互逻辑，并导入样式和内容模块。
- `src/styles.css`：视觉系统、响应式布局、卡片、排版、弹窗和各 section 样式。
- `assets/images/`：正式页面使用的图片资源。
- `assets/docs/`：简历等文档资源。
- `AGENTS.md`：给后续 agent 的项目接手指南。
- `PROJECT_HISTORY.md`：记录项目来时路、关键取舍和清理决策。

### 本地预览

首次拉取项目后先安装依赖：

```bash
npm install
```

启动 Vite dev server：

```bash
npm run dev
```

然后访问：

```text
http://localhost:8765
```

### 发布前检查

```bash
node --check src/app.js
node --check src/content.js
npm run build
```

视觉验收可以参考 `RESPONSIVE_CHECKLIST.md`。

### 部署

正式域名：

```text
hijeffrey.com
```

普通项目仓库推荐使用：

```text
jeffrey-space
```

如果作为 GitHub Pages 用户主页发布，GitHub 仓库名通常需要是：

```text
liyongjian5179.github.io
```

这种情况下，项目内部名称仍然可以保持为 `jeffrey-space`。

当前 Cloudflare 控制台配置（Workers / Static Assets，Deploy command 必填的界面）：

```text
构建命令 / Build command: npm run build
部署命令 / Deploy command: npm run deploy:cloudflare
版本命令 / Version command: npm run deploy:cloudflare
根目录 / Root directory: 留空，使用仓库根目录
```

如果页面上还有 Output directory / 构建输出目录字段，填写：

```text
dist
```

这个流程依赖仓库内的 `wrangler.jsonc`，它会告诉 Wrangler 把 `./dist` 作为静态资源目录发布。

如果以后新建的是纯 Cloudflare Pages 自动发布项目，才使用下面这种配置：

```text
Build command: npm run build
Build output directory: dist
Root directory: 留空，使用仓库根目录
Deploy command: 留空
```

构建产物会输出到 `dist/`。Vite 会压缩 JS/CSS 并生成 hash 文件；原始 `assets/` 和 `CNAME` 会复制进 `dist/`，保证动态图片路径和自定义域名文件可用。

根目录已包含 `CNAME` 文件，用于 GitHub Pages 自定义域名：

```text
hijeffrey.com
```

### 维护说明

- 正式资源放在 `assets/images/` 和 `assets/docs/`。
- 页面不要依赖旧站点的线上图片或文档 URL。
- 如果后续需要继续优化体积，优先审计图片资源。
- 如果需要理解项目来时路，先看 `PROJECT_HISTORY.md`，不要把旧版归档重新放回正式项目。

---

## English

### Overview

Jeffrey Space is Jeffrey Li's personal digital home: a bilingual personal site for SRE, AI Infra, engineering beliefs, passion projects, writing, and contact.

It is a static frontend project designed for GitHub Pages or any static hosting service. It should be maintained as the canonical personal site project, not as a versioned continuation of older site experiments.

### Highlights

- Bilingual content: Simplified Chinese and English.
- Warm engineering handbook visual style.
- Personal IP illustration for the hero and identity system.
- Real profile photo as a lightweight identity anchor.
- Passion project cards with modal galleries.
- Engineering beliefs, experience, skills, public outputs, and contact actions.
- Responsive layout for desktop, tablet, and mobile.
- Online Google Fonts with system fallbacks, without a bundled large local Chinese font package.

### Directory Structure

```text
.
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── wrangler.jsonc
├── src/
│   ├── app.js
│   ├── content.js
│   └── styles.css
├── assets/
│   ├── docs/
│   └── images/
├── AGENTS.md
├── PROJECT_NOTES.md
├── PROJECT_HISTORY.md
└── RESPONSIVE_CHECKLIST.md
```

### Key Files

- `index.html`: Static entry file, analytics, navigation, page sections, modals, and the Vite module entry.
- `vite.config.js`: Vite build configuration. Production JS/CSS/media go to `dist/assets/js|css|media`, while static site assets stay under `dist/assets/images|docs`.
- `wrangler.jsonc`: Cloudflare Workers Static Assets config for Cloudflare projects that require a Deploy command.
- `src/content.js`: Structured bilingual content for navigation, hero, beliefs, projects, experience, skills, outputs, and contact.
- `src/app.js`: Rendering, language switching, reveal animation, project gallery, QR modal, interactions, and style/content imports.
- `src/styles.css`: Visual system, responsive layout, section styles, cards, typography, and modal styles.
- `assets/images/`: Production-facing image assets.
- `assets/docs/`: Resume and document assets.
- `AGENTS.md`: Handoff guide for future coding agents.
- `PROJECT_HISTORY.md`: Project journey, key decisions, and cleanup history.

### Local Preview

Install dependencies after cloning:

```bash
npm install
```

Start the Vite dev server:

```bash
npm run dev
```

Then open:

```text
http://localhost:8765
```

### Validation

Run lightweight syntax checks and a production build before publishing:

```bash
node --check src/app.js
node --check src/content.js
npm run build
```

Use `RESPONSIVE_CHECKLIST.md` for visual QA across desktop, tablet, and mobile.

### Deployment

Production domain:

```text
hijeffrey.com
```

For a normal project repository, use:

```text
jeffrey-space
```

For a GitHub Pages user site, GitHub usually requires the repository name:

```text
liyongjian5179.github.io
```

In that case, `jeffrey-space` can remain the project name in `package.json`, README, and internal documentation.

Current Cloudflare dashboard settings for this project (Workers / Static Assets, where Deploy command is required):

```text
Build command: npm run build
Deploy command: npm run deploy:cloudflare
Version command: npm run deploy:cloudflare
Root directory: leave empty and use the repository root
```

If the page also has an Output directory field, set it to:

```text
dist
```

This flow relies on the checked-in `wrangler.jsonc`, which tells Wrangler to publish `./dist` as static assets.

Only use the following settings for a pure Cloudflare Pages auto-publish project:

```text
Build command: npm run build
Build output directory: dist
Root directory: leave empty and use the repository root
Deploy command: leave empty
```

The production build outputs to `dist/`. Vite minifies JS/CSS and emits hashed files; the original `assets/` directory and `CNAME` are copied into `dist/` so dynamic image paths and custom-domain setup keep working.

The root `CNAME` file is included for GitHub Pages custom domain configuration:

```text
hijeffrey.com
```

### Production Notes

- Keep production assets local under `assets/images/` and `assets/docs/`.
- Do not depend on old site URLs for images or documents.
- If file size becomes a concern, audit images first.
- Read `PROJECT_HISTORY.md` for context before reintroducing archived material.
