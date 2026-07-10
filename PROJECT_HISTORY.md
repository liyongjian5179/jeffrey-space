# Project History

This file records the journey of Jeffrey Space so future maintainers and agents understand the context without keeping old site archives in the production repository.

## Origin

The project started as a redesign of Jeffrey Li's personal website. Earlier site materials were used as source context for photos, resume material, company logos, activity images, and content structure.

During the redesign, the project moved away from being a numbered continuation of older site versions and became the standalone canonical personal site:

```text
jeffrey-space
```

The planned production domain is:

```text
hijeffrey.com
```

## Design Evolution

The visual direction converged on a warm engineering handbook style:

- cream paper-like background
- engineering blue and warm yellow
- runbook and system language
- structured cards
- strong belief slides
- personal IP illustrations
- one real profile photo for trust
- real activity photos only where they represent lived projects

The site intentionally avoids a cold monitoring-dashboard look.

## Key Product Decisions

### Personal Photo

Only one real personal photo is used as an identity anchor in the About section. Other identity moments use Jeffrey's personal IP illustration style.

### Passion Projects

The racing project keeps original activity photos because it represents a real lived passion, not personal IP decoration.

Family content uses a softer system illustration instead of extra personal photos.

### Beliefs Section

The Beliefs section became a full-screen statement area. Long explanatory subtitles were removed because they competed with the statements, especially in English.

Current direction: title plus strong belief statements.

### Fonts

The project originally used a local Google-fonts folder that grew to roughly 70 MB. That was removed.

Current font strategy:

- Online Google Fonts for visual consistency.
- System fallbacks for resilience.
- No bundled full Chinese font package.

### Project Name

The project name was changed from a versioned personal-site name to:

```text
jeffrey-space
```

The name is meant to hold more than a portfolio: identity, engineering beliefs, writing, tools, passions, and contact.

## Cleanup Decisions

The following historical materials were removed from the production project:

- old site archive under `assets/site-original/`
- old download metadata under `data/downloaded-assets.json`
- migration scripts under `scripts/`
- unused `assets/images/carousel-3.jpg`

Reason: the project should be clean and production-facing. Historical context now lives in this file instead of old asset folders.

## Current Production Shape

Core files:

- `index.html`
- `src/content.js`
- `src/app.js`
- `src/styles.css`
- `assets/images/`
- `assets/docs/`
- `CNAME`
- `README.md`
- `PROJECT_NOTES.md`
- `RESPONSIVE_CHECKLIST.md`
- `AGENTS.md`

Validation commands:

```bash
node --check src/app.js
node --check src/content.js
```
