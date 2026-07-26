import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { site } from "../config/site";
import { contentUrl, sortNewest } from "../lib/content";

export async function GET() {
    const posts = sortNewest(
        (await getCollection("blog")).filter((entry) => !entry.data.draft),
    );

    return rss({
        title: `${site.name} — Writing`,
        description: `Technical articles and engineering notes by ${site.name}.`,
        site: site.url,
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.date,
            link: contentUrl("blog", post.id),
            categories: post.data.tags,
        })),
    });
}
