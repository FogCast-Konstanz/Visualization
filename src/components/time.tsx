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


export function formatActualDatetime(dateTime?: Date, dateStr?: string): string {
    const d = new Date(dateStr ?? dateTime ?? Date.now());
    if (isNaN(d.getTime())) throw new Error('Invalid date');
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')} 00:00:00`;
}

export function formatStationDatetime(date: Date = new Date()): string {
    return date.toISOString().slice(0, 19) + 'Z';
}