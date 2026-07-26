# BWinkeler Portfolio

Static portfolio and technical writing site for Bruno Winkeler. The redesign uses Astro, TypeScript, semantic HTML, and a small custom CSS system. It is intended for deployment to Cloudflare Pages at `bwinkeler.com`.

The visual direction combines Astro Nano's lightweight editorial structure with a recruiter-friendly profile header. Light mode is the default; dark mode is an explicit visitor preference.

## Requirements

- Node.js 22.12 or newer
- npm 10 or newer

## Development

```text
npm install
npm run dev
```

The local site is available at `http://localhost:4321`.

## Validation

```text
npm run validate
```

This runs formatting checks, linting, Astro/TypeScript diagnostics, unit tests, and the production build.

## Content

- Site identity and links: `src/config/site.ts`
- Blog articles: `src/content/blog/<slug>/index.md`
- Projects: `src/content/projects/<slug>/index.md`
- Work entries: `src/content/work/<slug>.md`
- Blog authoring guide: `docs/BLOGGING.md`
- Cloudflare Pages runbook: `docs/DEPLOYMENT.md`
- Content provenance: `docs/CONTENT_SOURCES.md`
- Operational contract: `docs/SERVICE_MANIFEST.md`

### Blog images

Keep article images beside the article whenever possible:

```text
src/content/blog/my-article/
├── index.md
├── cover.jpg
└── diagram.png
```

Add an optional cover to the article front matter:

```yaml
cover: "./cover.jpg"
coverAlt: "Concise description of the image"
```

Reference images in Markdown with a relative path:

```text
![Accessible description](./diagram.png)
```

Astro optimizes local images during the static build. Every meaningful image must have useful alternative text. Decorative images should use an empty alternative.

## Deployment

This is a statically generated site. Cloudflare Pages runs the build and serves
the resulting files from its global CDN; no Node.js server or VPS is required
at runtime.

Cloudflare Pages settings:

- Build command: `npm run build`
- Output directory: `dist`
- Node.js version: pinned in `.node-version`

Do not point the root domain to the VPS. The root domain belongs to this Cloudflare Pages project.

Follow `docs/DEPLOYMENT.md` for the safe preview, production-branch, custom-domain,
verification, and rollback procedure.

## License

MIT. See `LICENSE` and `THIRD_PARTY_NOTICES.md`.
