export function formatGermanDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        hour12: false,
    }).replace(",", "");
};

export function formatYear(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleString("de-DE", {
        year: "numeric"
    }).replace(",", "");
};

export function parseGermanDateToDatetime(formattedDate: string) {
    const [datePart, timePart] = formattedDate.split(" ");
    const [day, month, year] = datePart.split(".").map(Number);
    const [hour] = timePart.split(":").map(Number);

    const fullYear = year < 50 ? 2000 + year : 1900 + year; // Adjust for 2-digit years

    return new Date(fullYear, month - 1, day, hour);
}

export function formatActualDatetime(dateTime?: Date, dateStr?: string) {
    const date = dateStr ? new Date(dateStr) : dateTime ? dateTime : new Date()

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day} 00:00:00`;
};

export const API_BASE_URL = "http://141.37.122.39:8080";
export const API_SERVER_BASE_URL = "http://141.37.122.39:8000";