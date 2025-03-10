import { deLexicon } from "./deLexicon"

const de = {
    title: "FogCast",
    subtitle: "in Konstanz",

    insert: "Mein Name ist {{name}}",

    navigation: {
        models: "Vorhersagen",
        station: "Station",
        data: "Daten",
        lexikon: "Lexikon",
        phenomena: "Phänomene",
        home: "Startseite",
        analysis: "Analyse"
    },

    startingPage: {
        title: "Wetter in Konstanz",
        temperature: "Temperatur",
        humidity: "Luftfeuchtigkeit",
        waterTemp: "Wassertemperatur",
        waterLevel: "Wasserstand",
        windspeed: "Windgeschwindigkeit",
        forcastGraph: "Vorhersagen"
    },

    phenomena : {
        title: "Wetterphänomene",
        introduction: "Der Bodensee ist ein einzigartiger Klimaregulator, der durch seine Größe und Lage verschiedene Wetterphänomene hervorruft. Der Schwäbische Meereffekt beeinflusst das lokale Klima, indem er Temperaturunterschiede ausgleicht und Wetterveränderungen begünstigt. Besonders im Herbst und Winter sind dichte Nebel häufig, die durch die Feuchtigkeit des Sees entstehen und die Sicht stark einschränken können. Zudem kann der Wasserstand des Sees durch Hochwasser infolge von starken Regenfällen oder Schneeschmelze erheblich schwanken. In den folgenden Abschnitten werden diese und weitere Wetterphänomene näher beschrieben.",
        explanation: "Erklärung",
        referenceBodensee: "Bezug auf den Bodensee",
        dataAnalysis: "Datenanalyse",
        sources: "Quellen"
    },

    lexicon: deLexicon,

    models: {
        title: "Vorhersagen",
        selectValues: "Wähle ein Modell und das Datum aus (oben rechts).",
        introduction: "Analysiere und vergleiche die Vorhersagen von verschiedenen Modellen! \nHier können verschiedene Modelle ausgewählt werden und der [vorhergesagte Zeitpunkt](/lexikon#predictedTime). Infolgedessen werden die [historischen Vorhersagen](/lexikon#timeOfPrediction) für alle ausgewählten Modelle über die Zeit angezeigt."
    },

    impressum: {
        title: "Impressum",
        aboutTitle: "Über das Projekt",
        description: "Wettervorhersagen machen nicht nur Spaß, sondern sind auch entscheidend für die Vorhersage und Planung der Produktion von erneuerbaren Energien wie Wind- und Solarenergie. Eine präzisere Vorhersage kann dabei helfen, die Stabilität und Effizienz der Energieerzeugung durch eine bessere Anpassung an lokale Wetterbedingungen zu steigern.",
        about: "Fogcast ist ein Projekt, das im Rahmen des Teamprojekts 2024/25 im Master Informatik (MSI) an der HTWG Konstanz entwickelt wird. Dieses befasst sich mit der Analyse, Auswertung und Darstellung von Wetterdaten für Konstanz und den Bodenseebereich, mit dem Ziel Wetterphänomene (wie zum Beispiel Nebel) besser zu verstehen und die Vorhersagen zu verbessern. Hierfür sollen Techniken, wie Machine Learning angewandt, eine eigene Wetterstation zur Erfassung von Ergebnissen aufgebaut und eine Plattform, für den öffentlichen Zugang entwickelt werden.",
        developerTeam: "Das Entwicklungsteam besteht aus 8 Entwicklern und wir geleitet von Professor Dr. Oliver Dürr. Die 8 Entwickler sind alles Master-Studenten mit einem Informatikbezug: Lukas Benner, Jonas Elsper, Lukas Epple, Maren Franke, Samantha Isted, Marta Mate, Simon Rauch und Elija Stauss.",
        contact: "Kontakt",
        university: "Hochschule",
        website: "Webseite",
        email: "E-Mail",
        legalInfo: "Rechtliche Hinweise",
        htwg: "Impressum HTWG",
        dataProtection: "Datenschutzerklärung HTWG",
        gitHub: "Code auf GitHub",
        sourcesLicences: "Quellen und Lizenzen",
        licence: "Lizenz",
        furtherLicences: "Weitere Informationen zur Lizenz",
        dwdData: "Die Echtzeitdaten und aktuellen Vorhersagen basieren auf Daten des DWD. Auch für die Anaylsen stellten die Daten des DWD die Grundlage dar.",
        openMeteoData: "Die auf der Webseite dargestellten Daten basiseren größtenteils auf Openmeteo.",
        dataFrom: "Daten von",
        and: "und"
    },

    cookies: {
        text: "Diese Website verwendet Cookies. Sie sind für die Funktionalität der Seite notwendig, verbessern die Benutzerfreundlichkeit und helfen beim Speichern von Konfigurationen wie Sprache und Farbmodus.",
        accept: "Akzeptieren"
    },

    other: {
        underConstruction: "Diese Seite befindet sich im Aufbau...",
    }
}

export default de