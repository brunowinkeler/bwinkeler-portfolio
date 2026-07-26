import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/blog",
    }),
    schema: ({ image }) =>
        z
            .object({
                title: z.string().trim().min(1),
                description: z.string().trim().min(1),
                date: z.coerce.date(),
                updatedDate: z.coerce.date().optional(),
                tags: z.array(z.string().trim().min(1)).default([]),
                draft: z.boolean().default(false),
                cover: image().optional(),
                coverAlt: z.string().trim().min(1).optional(),
            })
            .refine((entry) => !entry.cover || entry.coverAlt, {
                message: "coverAlt is required when cover is set",
                path: ["coverAlt"],
            }),
});

const projects = defineCollection({
    loader: glob({
        pattern: "**/*.{md,mdx}",
        base: "./src/content/projects",
    }),
    schema: ({ image }) =>
        z
            .object({
                title: z.string().trim().min(1),
                description: z.string().trim().min(1),
                date: z.coerce.date(),
                tags: z.array(z.string().trim().min(1)).default([]),
                featured: z.boolean().default(false),
                draft: z.boolean().default(false),
                repositoryUrl: z.url().optional(),
                demoUrl: z.url().optional(),
                cover: image().optional(),
                coverAlt: z.string().trim().min(1).optional(),
            })
            .refine((entry) => !entry.cover || entry.coverAlt, {
                message: "coverAlt is required when cover is set",
                path: ["coverAlt"],
            }),
});

const work = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/work",
    }),
    schema: z.object({
        company: z.string().trim().min(1),
        role: z.string().trim().min(1),
        employmentType: z.string().trim().min(1).optional(),
        location: z.string().trim().min(1).optional(),
        dateStart: z.coerce.date(),
        dateEnd: z.union([z.coerce.date(), z.literal("Present")]),
        summary: z.string().trim().min(1).optional(),
        technologies: z.array(z.string().trim().min(1)).default([]),
        highlights: z.array(z.string().trim().min(1)).default([]),
        companyUrl: z.url().optional(),
        draft: z.boolean().default(false),
    }),
});

export const collections = { blog, projects, work };
