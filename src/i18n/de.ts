import { deLexicon } from "./deLexicon"

const de = {
    title: "FogCast",
    subtitle: "in Konstanz",

    insert: "Mein Name ist {{name}}",

    navigation: {
        models: "Vorhersagerückblick",
        station: "Wetterstation",
        data: "Historische Daten",
        lexikon: "Lexikon",
        phenomena: "Phänomene",
        home: "Startseite",
        analysis: "Leaderboard",
        main: "Generell",
        info: "Infos",
        sailor: "Segler-Wetter"
    },

    data: {
        temperature: "Temperatur",
        humidity: "Luftfeuchtigkeit",
        fog: "Nebel",
        forecast: "Vorhersage",
        time: "Zeit",
        waterTemp: "Wassertemperatur",
        waterLevel: "Wasserstand",
        windspeed: "Windgeschwindigkeit",
        cloud: "Bewölkung",
        cloudCoverLow: "Wolken niedrig",
        cloudCoverHigh: "Wolken hoch",
        cloudCoverMid: "Wolken mittelhoch",
        visibility: "Sichtweite",
        rain: "Niederschlag",
        weatherCode: "Wettercode",
        isDay: "ist Tag",
        windSpeed10m: "Windgeschwindigkeit",
        windGusts10m: "Windböen",
        windDirection10m: "Windrichtung",
        pressureMSL: "Luftdruck (NN)",
        cape: "CAPE (Konvektive Energie)",
        lastUpdated: "letztes Update"
    },

    startingPage: {
        title: "Wetter in Konstanz",
        forecast: "Vorhersage",
        currentWeather: "Aktuelles Wetter",
        next2Days: "Nächste 2 Tage",
        next14Days: "Nächste 14 Tage",
        standard: "Standard",
        advanced: "Modelle",
        sailor: "Segler"
    },

    sailorPage: {
        currentConditions: "Aktuelle Bedingungen auf See",
        windSpeedAndGustsTitle: "Windgeschwindigkeit und Böen",
        windDirectionTitle: "Windrichtung",
        capeAndRainTitle: "Gewittergefahr (CAPE) und Regen"
    },

    direction: {
        N: "Norden",
        NE: "Nordost",
        E: "Osten",
        SE: "Südost",
        S: "Süden",
        SW: "Südwest",
        W: "Westen",
        NW: "Nordwest"
    },

    dataPage: {
        title: "Historische Daten",
        introduction: "Wie hat sich das Wetter in den letzten Jahren geändert? Welche Entwicklungen der Temperatur gibt es innerhalb eines Jahres? Wie schwankt die Temperatur innerhalb einer Woche? Diese und viele weitere Fragen können auf dieser Seite durch eine viele dargestellte Graphen geklärt werden! Die dargestellten Daten sind gemessene Werte, die vom DWD, OpenMeteo und PegelOnline abgerufen wurden.",
        tempLastYear: "Temperatur im letzten Jahr",
        tempYears: "Temperatur über die Jahre",
        tempLastWeek: "Temperatur der letzten Woche",
        fogMonth: "Nebeltage pro Monat",
        fogYear: "Nebeltage pro Jahr ",
        waterLevelLastMonth: "Wasserstand im letzten Monat",

        tempTab: "Temperatur",
        fogTab: "Nebel",
        waterLevelTab: "Wasserstand"
    },

    phenomena: {
        title: "Wetterphänomene",
        introduction: "Der Bodensee ist ein einzigartiger Klimaregulator, der durch seine Größe und Lage verschiedene Wetterphänomene hervorruft. Der Schwäbische Meereffekt beeinflusst das lokale Klima, indem er Temperaturunterschiede ausgleicht und Wetterveränderungen begünstigt. Besonders im Herbst und Winter sind dichte Nebel häufig, die durch die Feuchtigkeit des Sees entstehen und die Sicht stark einschränken können. Zudem kann der Wasserstand des Sees durch Hochwasser infolge von starken Regenfällen oder Schneeschmelze erheblich schwanken. In den folgenden Abschnitten werden diese und weitere Wetterphänomene näher beschrieben.",
        explanation: "Erklärung",
        referenceBodensee: "Bezug auf den Bodensee",
        dataAnalysis: "Datenanalyse",
        sources: "Quellen"
    },

    lexicon: deLexicon,

    models: {
        title: "Vorhersagerückblick",
        selectValues: "Wähle ein Modell und das Datum aus (oben rechts).",
        introduction: "Analysiere und vergleiche die Vorhersagen von verschiedenen Modellen! \nHier können verschiedene Modelle ausgewählt werden und der [vorhergesagte Zeitpunkt](/lexikon#predictedTime). Infolgedessen werden die [historischen Vorhersagen](/lexikon#timeOfPrediction) für alle ausgewählten Modelle über die Zeit angezeigt.",
        forecastTemp: 'Temperaturvorhersage für {{date}}',
        forecastHumidity: 'Luftfeuchtigkeit für {{date}}',
    },

    weatherStation: {
        title: "Wetterstation",
        noDataAvailable: "Keine aktuellen Daten vorhanden",
        graph: "Messwerte der Station",
        introduction: "FogCast hat eine eigene und selbstgebaute Wetterstation am Steg der HTWG.",
        details: "Details",
        description: `Das Wetter in Konstanz spielt für viele Menschen in der Region eine zentrale Rolle. Für Studierende ist es beispielsweise wichtig zu wissen, wie das Wetter wird. Segler wiederum sind auf präzise Wetterdaten angewiesen, um sichere und planbare Törns auf dem Bodensee durchführen zu können. Auch Touristen profitieren von genauen Informationen, um ihren Aufenthalt besser gestalten zu können.

Um detailliertere und ortsnahe Wetterdaten zur Verfügung zu stellen, wurde am Steg der Hochschule Konstanz Technik, Wirtschaft und Gestaltung (HTWG) eine eigene Wetterstation installiert. Das Ziel besteht darin, über standardisierte Wetterberichte hinaus direkte Messungen bereitzustellen, die die spezifischen Gegebenheiten am Seeufer abbilden.`,
        technicalDetailsHeader: "Technische Details",

        technicalDetailsText: `
![Picture](/assets/weatherstation/Wetterstation_aufbau.jpeg "Foto von Samantha Isted")

Die Wetterstation ist so konzipiert, dass sie in regelmäßigen Abständen von 10 Sekunden präzise Umweltdaten erfasst und übermittelt. Erfasst werden:

- **Lufttemperatur**: Gibt Aufschluss über die aktuelle Temperatur am Messort.
- **Luftfeuchtigkeit**: Ermöglicht Rückschlüsse auf das Klimaempfinden und mögliche Niederschlagsbildung.
- **Wassertemperatur des Rheins**: Gemessen in ca. 80 cm Tiefe, liefert wichtige Daten zur thermischen Entwicklung des Flusses.


![Picture](/assets/weatherstation/wetterstation_codeausgabe.jpeg "Foto von Samantha Isted")
Für die technische Umsetzung wurden folgende Komponenten verbaut:

- **Raspberry Pi 5**: Ein leistungsfähiger Mikrocomputer, der als zentrale Steuereinheit dient. An ihn sind sämtliche Sensoren angeschlossen. Mittels eines in Python geschriebenen Programms werden die Messwerte automatisiert erfasst, verarbeitet und zur weiteren Nutzung bereitgestellt.
- **DS18B20**: Ein digitaler Temperatursensor, der zur Bestimmung der Wassertemperatur eingesetzt wird. Die Messung in 80 cm Tiefe gewährleistet stabile und repräsentative Temperaturwerte.
- **FS304-SHTXX**: Kombisensor zur gleichzeitigen Erfassung von Lufttemperatur und Luftfeuchtigkeit. Der Sensor liefert kalibrierte, zuverlässige Daten in Echtzeit.
- **Wetterschutzgehäuse**: Alle Komponenten sind in einem wetterfesten Gehäuse untergebracht, das vor Regen, Sonneneinstrahlung und mechanischen Einwirkungen schützt. Zusätzlich beherbergt es Sicherungselemente zum Schutz der Elektronik.
`
    },

    impressum: {
        title: "Impressum",
        aboutTitle: "Über das Projekt",
        description: "Wettervorhersagen machen nicht nur Spaß, sondern sind auch entscheidend für die Vorhersage und Planung der Produktion von erneuerbaren Energien wie Wind- und Solarenergie. Eine präzisere Vorhersage kann dabei helfen, die Stabilität und Effizienz der Energieerzeugung durch eine bessere Anpassung an lokale Wetterbedingungen zu steigern.",
        about: "Fogcast ist ein Projekt, das im Rahmen des Teamprojekts 2024/25 im Master Informatik (MSI) an der HTWG Konstanz entwickelt wird. Dieses befasst sich mit der Analyse, Auswertung und Darstellung von Wetterdaten für Konstanz und den Bodenseebereich, mit dem Ziel Wetterphänomene (wie zum Beispiel Nebel) besser zu verstehen und die Vorhersagen zu verbessern. Hierfür sollen Techniken, wie Machine Learning angewandt, eine eigene Wetterstation zur Erfassung von Ergebnissen aufgebaut und eine Plattform, für den öffentlichen Zugang entwickelt werden.",
        developerTeam: "Das Entwicklungsteam besteht aus 8 Entwicklern und wir geleitet von Professor Dr. Oliver Dürr. Die 8 Entwickler sind alles Master-Studenten mit einem Informatikbezug: Lukas Benner, Jonas Elsper, Lukas Epple, Maren Franke, Samantha Isted, Marta Mate, Simon Rauch und Elijah Stauss.",
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
        pegelOnline: "Teile der Daten, unter anderem über die Pegelstände, stammen von Pegelonline",
        lubw: "Grundlage: Daten aus dem Umweltinformationssystem (UIS) der LUBW Landesanstalt für Umwelt Baden-Württemberg",
        userAgreement: "Nutzungsvereinbarung",
        dataFrom: "Daten von",
        and: "und",
        legalInfoText: `
## Rechtliche Hinweise

Frei verfügbare Geodaten des DWD und von Open Meteo dürfen unter den Bedingungen der Creative Commons BY 4.0 (CC BY 4.0), Geodaten von Pegelonline unter den Bedingungen der Lizenz DL-DE->Zero-2.0 unter Nennung der Quelle verwendet werden.
`
    },

    infos : {
        'temperature': 'Daten vom [DWD](/impressum#dwdSource)',
        'temperatureStation': 'Data',
        'temperatureBoth': 'Daten von der [Wetterstation](/weatherstation) in Konstanz und vom [DWD](/impressum#dwdSource)',
        'humidity': 'Data',
        'humidityStation': 'Data',
        'humidityBoth': 'Data',
        'waterLevel': 'Data',
        'waterTemp': 'Data',
        'windSpeed': 'Data'
    },

    cookies: {
        text: `Wir verwenden nur technisch notwendige Cookies. Sie sind für die Funktionalität der Seite notwendig, verbessern die Benutzerfreundlichkeit und helfen beim Speichern von Konfigurationen wie Sprache und Farbmodus.
Weitere Informationen zum Datenschutz finden Sie in unserem [Impressum](\impressum).`,
        accept: "Verstanden",
    },

    other: {
        underConstruction: "Diese Seite befindet sich im Aufbau...",
    }
}

export default de
