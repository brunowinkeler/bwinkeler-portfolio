import { describe, expect, it } from "vitest";

import {
    contentSlug,
    contentUrl,
    formatDate,
    formatDateRange,
    formatMonthYear,
    sortNewest,
    sortWorkNewest,
} from "../src/lib/content";

describe("content utilities", () => {
    it("removes an index suffix from collection entry IDs", () => {
        expect(contentSlug("building-a-device/index")).toBe(
            "building-a-device",
        );
        expect(contentSlug("standalone-entry")).toBe("standalone-entry");
    });

    it("builds canonical content URLs", () => {
        expect(contentUrl("blog", "first-post/index")).toBe(
            "/blog/first-post/",
        );
        expect(contentUrl("projects", "firmware-tool")).toBe(
            "/projects/firmware-tool/",
        );
    });

    it("formats dates in UTC", () => {
        const date = new Date("2026-07-27T23:30:00-03:00");

        expect(formatDate(date)).toBe("28 Jul 2026");
        expect(formatMonthYear(date)).toBe("Jul 2026");
        expect(formatDateRange(new Date("2025-09-01"), "Present")).toBe(
            "Sept 2025 – Present",
        );
        expect(
            formatDateRange(new Date("2023-08-01"), new Date("2025-05-01")),
        ).toBe("Aug 2023 – May 2025");
    });

    it("sorts dated entries from newest to oldest without mutating input", () => {
        const entries = [
            { data: { date: new Date("2024-01-01") }, title: "Older" },
            { data: { date: new Date("2026-01-01") }, title: "Newer" },
        ];

        expect(sortNewest(entries).map((entry) => entry.title)).toEqual([
            "Newer",
            "Older",
        ]);
        expect(entries[0].title).toBe("Older");
    });

    it("sorts work entries by start date without mutating input", () => {
        const entries = [
            {
                data: {
                    dateStart: new Date("2020-05-01"),
                    dateEnd: new Date("2022-12-01"),
                },
                company: "Older",
            },
            {
                data: {
                    dateStart: new Date("2023-08-01"),
                    dateEnd: new Date("2025-05-01"),
                },
                company: "Recent past",
            },
            {
                data: {
                    dateStart: new Date("2023-06-01"),
                    dateEnd: "Present" as const,
                },
                company: "Current",
            },
        ];

        expect(sortWorkNewest(entries).map((entry) => entry.company)).toEqual([
            "Current",
            "Recent past",
            "Older",
        ]);
        expect(entries[0].company).toBe("Older");
    });
});
