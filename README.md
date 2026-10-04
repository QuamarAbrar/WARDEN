# WARDEN

WARDEN is a research-preview website for a conceptual AI defense intelligence model. It presents an analyst-led approach to connecting security events, explaining unusual activity, and turning findings into investigation leads. It is a front-end concept, not a production security product.

## What the preview demonstrates

- Four investigation modes: detect, track, predict, and respond.
- An illustrative identity-misuse trace using synthetic events.
- A proposed workflow that keeps analysts responsible for reviewing evidence and choosing actions.
- Evaluation questions and a controlled path for exploring the concept.

The site does not connect to security systems, process real telemetry, or provide an access-request backend. The displayed trace and assessments are examples, not live model output.

## Requirements

- Node.js 22 or newer
- pnpm 10 (the repository pins pnpm 10.34.3 in `.mise.toml`)

## Getting started

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Vite prints the local development URL when the server starts. To validate the TypeScript and JSX:

```sh
pnpm typecheck
```

Create and locally preview a production build with:

```sh
pnpm build
pnpm preview
```

## Project structure

- `src/App.tsx` — page content and interactive FAQ
- `src/index.css` — layout, responsive styling, and motion
- `src/main.tsx` — React entry point
- `public/assets/` — static artwork used by the page
- `index.html` and `.figma/make/site.json` — document shell and site metadata
- `vite.config.ts` — Vite, React, Tailwind CSS, and preview tooling configuration

## Project status

WARDEN is a conceptual research preview. Its copy intentionally describes a proposed workflow rather than established capabilities, benchmarks, integrations, or availability. Any evaluation should use synthetic or explicitly approved sample events and retain human review and existing operational controls.
