export function contentSlug(id: string): string {
    return id.replace(/\/index$/, "");
}

export function contentUrl(
    collection: "blog" | "projects",
    id: string,
): string {
    return `/${collection}/${contentSlug(id)}/`;
}

export function formatDate(date: Date, locale = "en-GB"): string {
    return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    }).format(date);
}

export function formatMonthYear(date: Date, locale = "en-GB"): string {
    return new Intl.DateTimeFormat(locale, {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    }).format(date);
}

export function formatDateRange(
    dateStart: Date,
    dateEnd: Date | "Present",
    locale = "en-GB",
): string {
    const start = formatMonthYear(dateStart, locale);
    const end =
        dateEnd === "Present" ? "Present" : formatMonthYear(dateEnd, locale);

    return `${start} – ${end}`;
}

export function sortNewest<T extends { data: { date: Date } }>(
    entries: T[],
): T[] {
    return [...entries].sort(
        (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
    );
}

export function sortWorkNewest<
    T extends { data: { dateStart: Date; dateEnd: Date | "Present" } },
>(entries: T[]): T[] {
    return [...entries].sort((a, b) => {
        const aIsCurrent = a.data.dateEnd === "Present";
        const bIsCurrent = b.data.dateEnd === "Present";

        if (aIsCurrent !== bIsCurrent) {
            return aIsCurrent ? -1 : 1;
        }

        return b.data.dateStart.valueOf() - a.data.dateStart.valueOf();
    });
}
