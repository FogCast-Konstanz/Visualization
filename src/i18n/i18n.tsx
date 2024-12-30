// Nice Documentation: https://dev.to/franklin030601/building-a-multi-language-app-with-react-js-2och

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "./de";
import en from "./en";

i18n.use(initReactI18next).init({
    lng: "de",
    fallbackLng: "de",
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: { translation: en },
        de: { translation: de }
    },
});

export default i18n;
