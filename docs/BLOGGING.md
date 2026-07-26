# Publishing blog posts

The blog is part of the same static Astro site. Posts are source files committed to Git, not database records. A push triggers Cloudflare Pages to rebuild the site and publish new HTML, RSS, sitemap, and optimized images.

While every post is a draft, the public navigation hides the blog and `/blog/` contains a `noindex` directive.

## Create a post

Create a folder under `src/content/blog` using a lowercase, URL-safe slug:

```text
src/content/blog/debugging-an-spi-driver/
├── index.md
├── cover.jpg
└── logic-analyzer.png
```

Use `index.md` for ordinary Markdown or `index.mdx` when the article needs Astro or interactive components.

Start with this front matter:

```yaml
---
title: "Debugging an SPI driver"
description: "How timing captures exposed an intermittent communication fault."
date: 2026-07-27
updatedDate: 2026-07-28
tags:
  - Embedded systems
  - SPI
  - Debugging
draft: true
cover: "./cover.jpg"
coverAlt: "Logic analyzer connected to an embedded development board"
---
```

Fields:

| Field | Required | Description |
|---|---:|---|
| `title` | yes | Article title and SEO title |
| `description` | yes | Summary used in cards, metadata, RSS, and social previews |
| `date` | yes | Original publication date |
| `updatedDate` | no | Date of a substantial revision |
| `tags` | no | Topics displayed on the article and listing card |
| `draft` | no | Use `true` while writing; defaults to `false` if omitted |
| `cover` | no | Local image imported and optimized by Astro |
| `coverAlt` | conditionally | Required whenever `cover` is present |

## Add images inside the article

Store article-specific images beside `index.md` and use relative paths:

```markdown
![SPI signals captured during the failing transaction](./logic-analyzer.png)
```

Guidelines:

- write useful alternative text describing the relevant information;
- avoid embedding confidential boards, schematics, customer data, credentials, serial numbers, or proprietary source code;
- prefer local images over externally hosted URLs;
- use descriptive file names;
- compress unusually large photographs before committing them;
- verify that logos and photographs are licensed for publication.

Astro processes local images during the static build. A cover image is shown in the blog card and at the top of the article.

## Preview locally

Run:

```text
npm install
npm run dev
```

Open `http://localhost:4321`.

Drafts do not receive public routes. To review the real article page locally, temporarily set `draft: false`, review it, and return it to `true` before committing if it is not ready.

Before publishing, run:

```text
npm run validate
```

This validates front matter, TypeScript, formatting, lint, tests, and the production build.

## Publish

1. review the article for accuracy, confidentiality, licensing, and accessibility;
2. set `draft: false`;
3. run `npm run validate`;
4. commit the post and its images;
5. push to a non-production branch for a Cloudflare preview;
6. review the preview URL;
7. merge into the production branch.

The first published article automatically makes **Writing** visible in the site navigation and home page. It is also added to `/blog/`, `/rss.xml`, and the sitemap.

## Correct or unpublish a post

For a correction, edit the article and set `updatedDate` to the revision date.

To unpublish without deleting history:

1. set `draft: true`;
2. commit and deploy;
3. consider adding a redirect if the old URL has already been shared or indexed.

Deleting a published folder removes the generated page on the next deployment and normally produces a 404 at the old URL.

## Current example

`src/content/blog/first-technical-note/index.md` is a private draft that demonstrates front matter, a cover, and a C code block. Replace or remove it when the first real article is prepared.
