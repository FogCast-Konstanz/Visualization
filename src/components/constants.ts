export const LANGUAGES = [
    { label: "Deutsch", code: "de" },
    { label: "English", code: "en" },
];

export const BACKEND_API_URL = (import.meta.env.VITE_BACKEND_BASE_URL ?? "http://localhost:80") + "/api";
export const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL ?? "http://localhost:80";

console.log(BACKEND_URL);