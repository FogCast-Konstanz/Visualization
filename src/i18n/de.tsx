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

    data: {
        temperature: "Temperatur °C",
        humidity: "Luftfeuchtigkeit % ",
        forecast: "Vorhersage",
        time: "Zeit",
        waterTemp: "Wassertemperatur",
        waterLevel: "Wasserstand cm",
        windspeed: "Windgeschwindigkeit",
    },

    startingPage: {
        title: "Wetter in Konstanz",
        forecast: "Vorhersage",
        
        currentWeather: "Aktuelles Wetter",
        next2Days: "Nächste 2 Tage",
        next14Days: "Nächste 14 Tage"
    },

    dataPage: {
        title: "Daten Darstellung",
        introduction: "Wie hat sich das Wetter in den letzten Jahren geändert? Welche Entwicklungen der Temperatur gibt es innerhalb eines Jahres? Wie schwankt die Temperatur innerhalb einer Woche? Diese und viele weitere Fragen können auf dieser Seite durch eine viele dargestellte Graphen geklärt werden!",
        tempLastYear: "Temperatur im letzten Jahr",
        tempLastWeek: "Temperatur der letzten Woche",
        fogMonth: "Nebeltage pro Monat",
        fogYear: "Nebeltage pro Jahr ",
        waterLevelLastMonth: "Wasserstand im letzten Monat",

        tempTab: "Temperatur",
        fogTab: "Nebel",
        waterLevel: "Wasserstand"
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
        introduction: "Analysiere und vergleiche die Vorhersagen von verschiedenen Modellen! \nHier können verschiedene Modelle ausgewählt werden und der [vorhergesagte Zeitpunkt](/lexikon#predictedTime). Infolgedessen werden die [historischen Vorhersagen](/lexikon#timeOfPrediction) für alle ausgewählten Modelle über die Zeit angezeigt.",
        forecastTemp: 'Temperaturvorhersage für {{date}}',
        forecastHumidity: 'Luftfeuchtigkeit für {{date}}',
    },

    weatherStation: {
        title: "Wetterstation",
        introduction: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        details: "Details",
        description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,`
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
        pegelOnline: "Teile der Daten, unter anderem über die Pegelstände, stammen von Pegelonline",
        dataFrom: "Daten von",
        and: "und",
        legalInfoText: `
## Rechtliche Hinweise

Die Inhalte dieser Website sind urheberrechtlich geschützt.

Alle auf der FogCast-Website veröffentlichten Inhalte sind urheberrechtlich geschützt und dürfen nur mit Zustimmung der HTWG Konstanz verwendet, verbreitet oder öffentlich wiedergegeben werden.

Frei verfügbare Geodaten des DWD und von Open Meteo dürfen unter den Bedingungen der Creative Commons BY 4.0 (CC BY 4.0), Geodaten von Pegelonline unter den Bedingungen der Lizenz DL-DE->Zero-2.0 unter Nennung der Quelle verwendet werden.
`
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