// Nice Documentation: https://dev.to/franklin030601/building-a-multi-language-app-with-react-js-2och

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "./de";
import { dePhenomena } from "./dePhenomena";
import en from "./en";
import { enPhenomena } from "./enPhenomena";

i18n.use(initReactI18next).init({
    lng: localStorage.getItem('lang') == 'en' ? "en" : "de",
    fallbackLng: localStorage.getItem('lang') == 'en' ? "en" : "de",
    interpolation: {
        escapeValue: false,
    },
    ns: ["translation", "phenomena"], // Load multiple namespaces
    defaultNS: "translation",
    resources: {
        en: { 
            translation: en,
            phenomena: enPhenomena
        },
        de: { 
            translation: de,
            phenomena: dePhenomena
        }
    },
});

export default i18n;
