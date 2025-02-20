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

    lexicon: {
        title: "Lexikon",
        miau: {
            title: "miau",
            text: "miau"
        },
        predictedTime: {
            title: 'Vorhergesagter Zeitpunkt',
            text: 'Zeitpunkt auf den sich die Vorhersage bezieht,sprich an dem der vorhergesagte Wert auftreten soll. Beispielsweise: Am 24.02.2025 um 12:00 Uhr soll es 12°C geben. In diesem Fall ist "24.12.2025 um 12 Uhr" der vorhergesagte Zeitpunkt.'
        },
        timeOfPrediction: {
            title: 'Zeitpunkt der Vorhersage',
            text: 'Zeitpunkt an dem die Vorhersage "veröffentlicht/erstellt" wurde. Beispielsweise wird am 12.02.2025 eine Vorhersage für den 24.02.2025 erstellt. "12.02.2025" ist der Zeitpunkt der Vorhersage und "24.05.2025" der [vorhergesagte Zeitpunkt](#predictedTime).'
        }, 
        benchmarkingIdea: {
            title: 'Numerische Benchmarks für Wettermodelle',
            text: `Wettermodelle sind komplexe Systeme, die versuchen, die zukünftige Entwicklung der Atmosphäre vorherzusagen. Um die Qualität dieser Vorhersagen zu beurteilen, können numerische Benchmarks eingesetzt werden. Diese Benchmarks vergleichen die Vorhersagen der Modelle mit tatsächlichen Beobachtungen und erstellen eine Rangliste der Modelle basierend auf ihrer Genauigkeit. \n### Was sind numerische Benchmarks?\nNumerische Benchmarks sind quantitative Bewertungen, die die Leistung von Wettermodellen anhand von realen Beobachtungsdaten messen. Sie liefern eine objektive Grundlage, um verschiedene Modelle zu vergleichen und festzustellen, welches Modell in bestimmten Situationen oder über einen bestimmten Zeitraum die besten Vorhersagen liefert.\n### Methodik im Hintergrund \nDie grundlegende Idee hinter numerischen Benchmarks ist einfach: \n1. Vorhersagen sammeln: Die Vorhersagen verschiedener Wettermodelle für einen bestimmten Zeitpunkt und Ort werden erfasst.\n2. Beobachtungen erfassen: Reale Wetterbeobachtungen (z. B. Temperatur, Windgeschwindigkeit) für denselben Zeitpunkt und Ort werden aus zuverlässigen Quellen wie Wetterstationen oder Satelliten gewonnen.\n3. Vergleich und Bewertung: Die Vorhersagen der Modelle werden mit den tatsächlichen Beobachtungen verglichen. Anhand von statistischen Metriken wie dem mittleren quadratischen Fehler (MSE) oder dem negativen Log-Likelihood (NLL) wird bewertet, wie gut die Vorhersagen mit den Beobachtungen übereinstimmen.\n4. Rangliste erstellen: Die Modelle werden basierend auf ihren Bewertungsergebnissen in eine Rangliste eingeordnet. Das Modell mit dem niedrigsten MSE oder dem höchsten NLL gilt als das genaueste. Dabei können die Werte in unterschiedliche Zeitspannen eingeordnet werden, um Aussagen mit höherem Informationsgehalt treffen zu können: (möglicherweise performen manche Modelle für langfristige Prognosen besser sind, sind für kurzfristige jedoch weniger gut)\n- Kurzfristprognosen (bis 24 Stunden)\n- Mittelfristprognosen (24-72 Stunden)\n- Langfristprognosen (über 72 Stunden)\n### Erweiterung der Benchmarks\nIn der einfachsten Version können Benchmarks anhand von einer Hand voll Variablen für verschiedene Zeitspannen mit einer Metrik berechnet und abgespeichert werden. Um die Benchmarks präziser und aussagekräftiger zu machen können 1 mehr Variablen verwendet werden, welche ggf. unterschiedlich gewichtet sind. Zudem können die Forecasts in den unterschiedlichen Zeitspannen entsprechend ihrer entfernung vom vorhergesagten Zeitpunkt gewichtet werden. Es können noch viele weitere Maßnahmen ergriffen werden, um die Bewertung der Vorhersagen zu präzise und aussagekräftig wie möglich zu machen.\n### Ergebnisinterpretation\nDie praktische Anwendung des Benchmark-Systems erfolgt über Skriptabläufe, die einen automatisierten Tagesabgleich der Modelleistungen ermöglichen. Diese können über die Weboberfläche eingesehen werden. Außerdem können die Benchmark Scores verwendet werden, um beispielsweise bei der Modellfusionierung die Aussagen einzelner Modelle auf Basis ihres durchschnittlichen historischen Benchmark Scores zu gewichten.`
        }

    },

    models: {
        title: "Vorhersagen",
        selectValues: "Wähle ein Modell und das Datum aus (oben rechts).",
        introduction: "Auf dieser Seite können historische Vorhersagen eingesehen werden. Dabei kann der vorhergesagte Zeitpunkt ausgewählt werden und im Graphen werden dabei, für verschiedene Modelle, die Vorhersagen zu verschiedenen historischen Zeitpunkten angezeigt."
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