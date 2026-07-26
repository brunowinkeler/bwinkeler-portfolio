# Service Manifest: BWinkeler Portfolio

## Identity

- Platform architecture version: 1.3
- Service ID: `portfolio`
- Product name: BWinkeler Portfolio
- Repository: https://github.com/brunowinkeler/brunowinkeler.github.io
- Owner: Bruno Winkeler
- Criticality: family

## Publication

- Production origin: https://bwinkeler.com
- Hosting: Cloudflare Pages
- Output type: static site
- Build output: `dist`
- VPS dependency: none
- Caddy route: none
- Public API: none
- WebSocket: none

## Runtime resources

- Containers: none
- Database: none
- Redis or queue: none
- Object storage: none initially
- Persistent runtime data: none
- Secrets required by the site: none

Images and other public assets are compiled into the static output. Values shipped to the browser are public and must never contain credentials or private data.

## Build contract

- Node.js: 22.12 or newer compatible release
- Package manager: npm
- Install command: `npm ci`
- Validation command: `npm run validate`
- Build command: `npm run build`
- Output directory: `dist`

## Health and operations

- Liveness: `GET /`
- Smoke test: verify `/`, `/experience/`, `/projects/`, `/robots.txt`, `/rss.xml`, and `/sitemap-index.xml`
- Log format: Cloudflare Pages platform logs; no application runtime logs
- Expected runtime memory and CPU: not applicable to static assets

## Security and privacy

- Authentication: none
- User registration: none
- Form submission: none initially
- Cookies: none initially
- Analytics: none initially
- Sensitive data: must not be published
- Residential address and personal phone number: excluded from the redesign

## Deploy

- CI workflow: `.github/workflows/ci.yml`
- Deployment runbook: `docs/DEPLOYMENT.md`
- Blog authoring guide: `docs/BLOGGING.md`
- Release identifier: Git commit deployed by Cloudflare Pages
- Migration order: not applicable
- Rollback: redeploy the previous successful Cloudflare Pages commit
- Database rollback limitation: not applicable

## Dependencies

- External services: Cloudflare Pages and DNS
- Infrastructure changes required: connect the repository to Cloudflare Pages and assign `bwinkeler.com`
- Known portability constraints: none; `dist` can be served by any static host

## Open decisions

- Review LinkedIn-derived professional details for confidentiality and NDA restrictions.
- Decide whether the existing portrait will be retained for production.
- Publish the blog only after the first article has been reviewed.
- Decide whether to keep or rename the existing GitHub repository after the Cloudflare Pages migration.
