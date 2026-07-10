# Project Notes

## Project Identity

Project name: `jeffrey-space`

This project is the canonical personal site for Jeffrey Li. It should be treated as a complete standalone site, not as a versioned continuation of older personal website experiments.

Production domain:

```text
hijeffrey.com
```

## Design Direction

Jeffrey Space uses a warm engineering handbook style:

- cream background
- engineering blue
- warm yellow annotations
- restrained red for risk or emphasis
- structured cards and runbook-like information blocks
- personal IP illustrations for identity
- real activity photos only where they add context
- bilingual Chinese / English content

## Content Model

Most visible text lives in `src/content.js`.

Use this file for:

- navigation labels
- hero copy
- beliefs
- passion projects
- experience
- skills
- public outputs
- contact actions

Keep `index.html` focused on structure, not content.

## Asset Model

- Production-facing assets live in `assets/images/` and `assets/docs/`.
- Vite production bundles are emitted to `dist/_assets`; the source `assets/` directory is copied to `dist/assets` after build so dynamic content paths keep working.
- The live page should not depend on old production-site image or document URLs.
- Historical source archives and migration scripts have been removed from the production project. Use `PROJECT_HISTORY.md` for context instead of carrying old assets forward.

## Build And Deployment

The project uses Vite for development and production builds.

```text
Cloudflare Pages build command: npm run build
Cloudflare Pages output directory: dist
Cloudflare Pages root directory: repository root
```

The build script runs `vite build`, then copies `assets/` and `CNAME` into `dist/`.

## Font Strategy

The live site uses online Google Fonts with system fallbacks.

Current font families:

- `Noto Sans SC` for body text
- `Noto Serif SC` for Chinese statement headings
- `Fraunces` for English display type and large numbers
- `Fira Code` for runbook, labels, and technical details
- `Caveat` for handwritten sticker notes

Do not reintroduce a full local Chinese font package unless there is a clear deployment reason.

## Repository Naming

Recommended project repository name:

```text
jeffrey-space
```

If publishing as a GitHub Pages user site, the GitHub repository may need to be:

```text
liyongjian5179.github.io
```

The project name can still remain `jeffrey-space`.

## Domain Setup

The root `CNAME` file should contain:

```text
hijeffrey.com
```

When using GitHub Pages, configure the repository Pages settings and DNS records to point `hijeffrey.com` to GitHub Pages.
