# Deployment to Cloudflare Pages

This portfolio is a statically generated Astro site. Cloudflare runs Node.js only during the build and uploads the generated `dist` directory to Pages. There is no application server, container, database, Caddy route, or VPS dependency in production.

## Current deployment state

- Repository: https://github.com/brunowinkeler/bwinkeler-portfolio
- GitHub default branch: `main`
- Cloudflare production branch: `main`
- Production domain: `bwinkeler.com`
- Cloudflare Pages project: active
- Custom domain: active

## 1. Prepare the Git branch

The deployment source of truth is `main`. For each change:

1. run `npm run validate`;
2. create a topic branch from `main`;
3. review and commit the change;
4. push the topic branch to the existing GitHub repository;
5. review its Cloudflare preview before merging it into `main`.

Do not push directly to `main` merely to obtain a preview.

## 2. Create the Pages project

1. Sign in to the Cloudflare dashboard.
2. Open **Workers & Pages**.
3. Select **Create application**.
4. Select **Pages**.
5. Select **Import an existing Git repository** or **Connect to Git**.
6. Authorize the Cloudflare Pages GitHub application for `brunowinkeler/bwinkeler-portfolio`.
7. Select that repository and choose **Begin setup**.

Use these settings for the first deployment:

| Setting | Value |
|---|---|
| Project name | `bwinkeler-portfolio` or another available name |
| Production branch | `main` |
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | leave empty |
| Environment variables | none required |

The project name determines the temporary address, for example `bwinkeler-portfolio.pages.dev`.

The repository contains `.node-version`, so the Pages build uses the same Node.js version validated locally and in CI. Cloudflare Pages v3 does not reliably infer Node.js from `package.json` engines alone.

Select **Save and Deploy**. Review the build log and the resulting `pages.dev` address.

## 3. Review the preview

Before connecting the real domain, verify at least:

- `/`;
- `/experience/`;
- `/projects/`;
- `/projects/bwinkeler-platform/`;
- `/robots.txt`;
- `/rss.xml`;
- `/sitemap-index.xml`;
- desktop and mobile layouts;
- dark theme default and light theme selection;
- GitHub, LinkedIn, and email links;
- absence of private or confidential information.

Cloudflare preview deployments add `X-Robots-Tag: noindex` automatically. Branch aliases use normalized branch names, so a branch such as `feature/new-post` is typically available through an alias similar to `feature-new-post.<project>.pages.dev`.

## 4. Promote the reviewed code

After the preview is approved:

1. merge the topic branch into `main`;
2. push `main`;
3. confirm that the automatic production deployment succeeds.

Pushes to `main` update production. Other branches and pull requests receive preview deployments without changing the custom domain.

## 5. Associate `bwinkeler.com`

The domain is already a Cloudflare zone and its public nameservers point to Cloudflare. At the time this guide was written, the apex had no public A, AAAA, or CNAME destination, so there is no current origin record to migrate.

1. Open **Workers & Pages**.
2. Select the portfolio Pages project.
3. Open **Custom domains**.
4. Select **Set up a domain**.
5. Enter `bwinkeler.com`.
6. Select **Continue** and confirm the proposed DNS record.

For an apex domain managed in the same Cloudflare account, Pages creates the required flattened CNAME record automatically. Use the Pages **Custom domains** flow; do not manually create a CNAME before associating the hostname, and do not create an A or AAAA record pointing to the VPS.

Wait until the custom-domain status becomes **Active** and its certificate is issued. Then verify:

- `https://bwinkeler.com` returns the portfolio;
- `http://bwinkeler.com` redirects to HTTPS;
- the certificate is valid;
- canonical URLs use `https://bwinkeler.com`;
- DNSSEC remains active;
- the `pages.dev` deployment is still available for operational recovery.

## 6. Optional `www` redirect

The canonical hostname is the apex `bwinkeler.com`. If `www.bwinkeler.com` should also work:

1. add `www.bwinkeler.com` through the Pages **Custom domains** flow so Cloudflare creates a proxied DNS record;
2. create a Cloudflare **Single Redirect** rule;
3. match `http*://www.bwinkeler.com/*`;
4. redirect to `https://bwinkeler.com/${1}`;
5. use status `301` and preserve the query string.

Do not maintain two independently indexable copies of the site.

## 7. Rollback

Cloudflare Pages stores previous deployments. To roll back application content:

1. open the Pages project's deployment history;
2. select the last known-good deployment;
3. use the dashboard rollback or redeploy action;
4. verify the smoke-test routes again.

A Git revert on `main` is the source-control equivalent and creates a new deployment.

## 8. Retire the old GitHub Pages deployment

The repository was renamed from `brunowinkeler.github.io` to `bwinkeler-portfolio`. A GitHub user page is served only from a repository named exactly `brunowinkeler.github.io`, so the rename already stops the legacy `https://brunowinkeler.github.io` site from being served by this repository. Keep the Cloudflare Pages custom domain active and verified as the sole production origin.

After the cutover succeeds:

1. open the GitHub repository **Settings** > **Pages**;
2. disable the legacy branch-based Pages source, unless a deliberate redirect site will be maintained there;
3. verify that `bwinkeler.com` still resolves only through Cloudflare Pages;
4. remove stale GitHub Pages custom-domain settings if any appear in the repository settings.

This avoids serving an outdated duplicate portfolio from the old GitHub Pages URL.

## Important operational notes

- Git integration is the intended deployment mode. Do not create a separate Direct Upload project for the same production site.
- No secrets are required for the current build.
- Do not add the LinkedIn MCP browser profile or cookies to the repository.
- Cloudflare Pages is independent of the OVHcloud VPS, shared PostgreSQL, and Caddy.
- The Cloudflare zone's SSL mode can remain `Full (strict)` for other origins; Pages itself is served directly by Cloudflare.

## Official references

- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/pages/configuration/preview-deployments/
- https://developers.cloudflare.com/pages/configuration/branch-build-controls/
