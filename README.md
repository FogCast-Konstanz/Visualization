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

TODO: Ausführen, was besonders ist hierbei

### Chakra

TODO: Chakra - Was ist das?

Mithilfe von Chakra erfolgt eine Konfiguration des Stylings. 

In der Datei `./theme.tsx` erfolgt die Konfiguration der Farben in Form des "Light-Dark-Modus" und der individuellen Farbgebung.
In der Datei `./src/components/style.tsx` werden die Grundlegenden Farben konfiguriert, welche abhängig vom aktuellen Modus geändert werden. Zudem werden hier die Grundlegenden Layout-Configurationen vorgenommen.

Das Styling erfolgt zu 90% inline bei den jeweiligen Komponenten selbst. Hierfür werden die Funktionen aus der Styling-Datei verwendet.

Die einzige Besonderheit ist die `./index.scss`. In dieser werden die Markdown-Text-Elemente (Automatisches Rendern von Markdown) in das richtige Styling gebracht.

### i18n

TODO: i18n

Um Bilingualität zu ermöglichen, wird i18n verwendet.

Im Ordner `./i18n/` sind die verschiedenen Übersetzungen definiert. In den Dateien `./en.ts` und `./de.ts` sind die meisten Konfigurationen vorgenommen. In den Dateien `enPhenomena.ts` bzw. `dePhenomena.ts` sind die Texte für die Phänomene definiert, welche im Markdown-Format geschrieben sind. Dasselbe wurde für die Lexikon-Einträge gemacht.

### Plotly

TODO: Plotly

Für die Darstellung der Graphen wird plotly verwendet.

Die Grundlage für alle Graphen wird in dem Ordner `./src/components/plotly` definiert. Hier ist einerseits der "Default-Graph" definiert, der nahezu allen Graphen als Grundlage dient und konfiguriert werden kann.
Zudem ist in dem Ordner das "ChartFormat" definiert, in welchem Funktionen für die Transformation der Daten gespeichert sind.




