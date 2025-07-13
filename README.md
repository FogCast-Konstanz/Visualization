# Visualization

Dieses Git-Repository enthält das Frontend der FogCast-Anwendung. Dies dient zur Visualisierung der Daten aus der Datensammlung (aktuellen Wetterdaten, Vorhersagen, historische Wetterdaten), aus dem Forecasting (Verarbeitung der Wetterdaten) und von der Wetterstation (aktuelle Messwerte). Zusätzlich werden Informationen über besondere Wetterphänomene am Bodensee bereitgestellt.

## Implementierung

Realisiert wurde das Projekt mithilfe von React + TypeScript + Vite. Zudem wurde das Styling mithilfe von Chakra realisiert.

### Entwicklungsumgebung Setup
- Installieren der Abhängigkeiten: ```npm i``` 
- Server starten: ```npm run dev```

### Start with Docker

`docker build --tag frontend .`
`docker run -d --name frontend -p 80:80 frontend --restart`


## Frameworks

### React + Typescript + Vite

Das Projekt basiert auf React für komponentenbasiertes UI-Rendering, kombiniert mit TypeScript für statische Typisierung und verbesserte Entwicklungszuverlässigkeit. Vite dient als moderner Build-Tooling-Stack und ersetzt ältere Tools wie Webpack durch extrem schnelle Module-Bundles und Hot Module Replacement (HMR). Die Kombination erlaubt schnelle Entwicklung, typensichere Codebasis und modulare Architektur mit hoher Skalierbarkeit.

### Chakra

Chakra UI ist ein komponentenbasiertes UI-Framework, das auf Design-System-Prinzipien basiert. Es bietet vorgefertigte, zugängliche UI-Komponenten mit umfassender Theme-Unterstützung. Styling erfolgt deklarativ über Props statt über CSS-Klassen oder externe Stylesheets, was die Entwicklung beschleunigt und das Design konsistent hält.

Mithilfe von Chakra erfolgt eine Konfiguration des Stylings. 

In der Datei `./theme.tsx` erfolgt die Konfiguration der Farben in Form des "Light-Dark-Modus" und der individuellen Farbgebung.
In der Datei `./src/components/style.tsx` werden die grundlegenden Farben konfiguriert, welche abhängig vom aktuellen Modus geändert werden. Zudem werden hier die grundlegenden Layout-Configurationen vorgenommen.

Das Styling erfolgt zu 90% inline bei den jeweiligen Komponenten selbst. Hierfür werden die Funktionen aus der Styling-Datei verwendet.

Die einzige Besonderheit ist die `./index.scss`. In dieser werden die Markdown-Text-Elemente (automatisches Rendern von Markdown) in das richtige Styling gebracht.

### i18n

Für die Internationalisierung wird das i18next-Framework eingesetzt. Es ermöglicht sprachabhängige Übersetzungen und dynamischen Sprachwechsel zur Laufzeit.

Im Ordner `./i18n/` sind die verschiedenen Übersetzungen definiert. In den Dateien `./en.ts` und `./de.ts` sind die meisten Konfigurationen vorgenommen. In den Dateien `enPhenomena.ts` bzw. `dePhenomena.ts` sind die Texte für die Phänomene definiert, welche im Markdown-Format geschrieben sind. Dasselbe wurde für die Lexikon-Einträge gemacht.

Die Integration erfolgt direkt in React-Komponenten, sodass Textelemente automatisiert anhand der gewählten Sprache dargestellt werden. Das System unterstützt Platzhalter, verschachtelte Schlüssel und kontextabhängige Formatierungen.

### Plotly

Plotly.js ist eine interaktive Charting-Bibliothek, die SVG- und WebGL-Rendering unterstützt. Im Projekt wird sie für die Visualisierung komplexer wissenschaftlicher Daten eingesetzt, insbesondere für dynamische, zoombare und konfigurierbare Graphen.

Die Grundlage für alle Graphen wird in dem Ordner `./src/components/plotly` definiert. Hier ist einerseits der "Default-Graph" definiert, der nahezu allen Graphen als Grundlage dient und konfiguriert werden kann.
Zudem ist in dem Ordner das "ChartFormat" definiert, in welchem Funktionen für die Transformation der Daten gespeichert sind.

Die Komponenten sind so strukturiert, dass sie wiederverwendbar und datengetrieben sind. Interaktivität (Hover, Zoom, Dynamik) wird über Plotly direkt gesteuert, wodurch zusätzliche Bibliotheken für Graphen überflüssig sind.

## Ausblick

Es gibt einige Stellen, an denen noch Verbesserungen vorgenommen werden können.
Hier ist eine (unvollständige) Liste, von Optimierungsideen:

- [ ] Optimierungen im Styling und Design (bspw. Mobile-Mode, Farbschema, ...)
- [ ] Optimierung mehrere Features
    - [ ] Startseite: Bidirektionales Scrolling auf der Startseite: Beim Scrolling im Graphen, soll die Leiste ebenfalls scrollen
    - [ ] Startseite: Darstellung des Synchronisierten Scrollings als Balken (Anstelle von zwei senkrechten Strichen)
    - [ ] Startseite: Optimierung des größten Diagramms - Emojis entzerren, Regenbalken größer darstellen, Ploty Icons deaktivieren
    - [ ] Datenseite: Durchschnitts-Graphen (mehrere Zeitleisten) - Bei Click auf ein Jahr, dieses hervorheben
- [ ] Weitere Features implementieren:
    - [ ] Wussten Sie schon, dass? Feature - Tipp-Popup
- [ ] Einbindung weiterer Daten + Informationen
    - [ ] Wassertemperatur
    - [ ] Hübschere Wasserstandgraphen, ggf. Orientierung an: https://www.bodenseee.net/pegel/