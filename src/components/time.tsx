export function toUtcIsoString(date?: Date | string | number): string {
    if (!date) {
        date = new Date()
    }
    if (typeof date === "string" || typeof date === "number") {
        date = new Date(date);
    }
    // return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

    return new Date(date.getTime()).toISOString();
    // return new Date(date).toISOString();
}


export function toUtcPlotlyIsoString(date?: Date | string | number): string {
    if (!date) {
        date = new Date()
    }
    if (typeof date === "string" || typeof date === "number") {
        date = new Date(date);
    }
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

    // return new Date(date).toISOString();
}
