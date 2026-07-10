# Agent Handoff Guide

This file helps future agents quickly understand and safely modify Jeffrey Space.

## Project Identity

- Project name: `jeffrey-space`
- Production domain: `hijeffrey.com`
- Purpose: Jeffrey Li's canonical personal digital space for SRE, AI Infra, engineering beliefs, passion projects, writing, and contact.
- Deployment target: static hosting, especially Cloudflare Pages and GitHub Pages.

## Start Here

Read these files first:

1. `README.md` for project overview and commands.
2. `PROJECT_NOTES.md` for design, content, asset, font, and deployment decisions.
3. `PROJECT_HISTORY.md` for the project's journey and why old migration assets were removed.
4. `RESPONSIVE_CHECKLIST.md` before layout or visual changes.

## Architecture

This is a Vite-built static site:

- `index.html`: page shell, sections, modals, analytics, and Vite module entry.
- `vite.config.js`: build output configuration.
- `src/content.js`: all major bilingual content exported as an ES module.
- `src/app.js`: rendering, interactions, and imports for content/styles.
- `src/styles.css`: visual system and responsive layout.
- `assets/images/`: production image assets.
- `assets/docs/`: production document assets.
- `CNAME`: GitHub Pages custom domain.

Prefer changing copy in `src/content.js` instead of editing `index.html`.

## Local Commands

```bash
npm install
npm run dev
node --check src/app.js
node --check src/content.js
npm run build
```

Preview URL:

```text
http://localhost:8765
```

## Design Direction

Keep the site in the warm engineering handbook style:

- cream background
- engineering blue
- warm yellow annotation details
- restrained red only for risk or emphasis
- structured cards and runbook-like information blocks
- clear bilingual typography
- personal IP for site identity
- real photos only where they add trust or context

Avoid turning the site into a generic portfolio template or a dark monitoring dashboard.

## Content Rules

- Keep Chinese and English versions aligned in structure, but do not force literal translations.
- Public-facing copy should not explain internal design decisions.
- Belief slides should be short and strong. Long English text needs separate layout consideration.
- Contact labels and buttons should stay simple and readable.

## Asset Rules

- Only keep production-facing files under `assets/images/` and `assets/docs/`.
- Do not reintroduce old site archives into the production repository.
- Do not add a full local Chinese font package. The current strategy uses online Google Fonts with system fallbacks.
- Before adding large images, check file size and whether the asset is actually referenced.

## Verification Checklist

After changes:

- Run `node --check src/app.js`.
- Run `node --check src/content.js`.
- Run `npm run build` and confirm `dist/` contains `index.html`, `_assets/`, `assets/`, and `CNAME`.
- Search for stale copy or old project names when renaming.
- Check Chinese and English layouts.
- For visual changes, review the breakpoints in `RESPONSIVE_CHECKLIST.md`.

## Hosting Notes

- Cloudflare Pages build command: `npm run build`.
- Cloudflare Pages output directory: `dist`.
- `CNAME` contains `hijeffrey.com`.
- If using a GitHub user site, the remote repository may be named `liyongjian5179.github.io`.
- The project identity should remain `jeffrey-space`.
