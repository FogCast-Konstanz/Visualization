export const deLexicon = {
    title: "Lexikon",
    introduction: "Lorem ipsum",
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
        text: `
Wettermodelle sind komplexe Systeme, die versuchen, die zukünftige Entwicklung der Atmosphäre vorherzusagen. Um die Qualität dieser Vorhersagen zu beurteilen, können numerische Benchmarks eingesetzt werden. Diese Benchmarks vergleichen die Vorhersagen der Modelle mit tatsächlichen Beobachtungen und erstellen eine Rangliste der Modelle basierend auf ihrer Genauigkeit. 

### Was sind numerische Benchmarks?

Numerische Benchmarks sind quantitative Bewertungen, die die Leistung von Wettermodellen anhand von realen Beobachtungsdaten messen. Sie liefern eine objektive Grundlage, um verschiedene Modelle zu vergleichen und festzustellen, welches Modell in bestimmten Situationen oder über einen bestimmten Zeitraum die besten Vorhersagen liefert.

### Methodik im Hintergrund 

Die grundlegende Idee hinter numerischen Benchmarks ist einfach: 

1. Vorhersagen sammeln: Die Vorhersagen verschiedener Wettermodelle für einen bestimmten Zeitpunkt und Ort werden erfasst.
2. Beobachtungen erfassen: Reale Wetterbeobachtungen (z. B. Temperatur, Windgeschwindigkeit) für denselben Zeitpunkt und Ort werden aus zuverlässigen Quellen wie Wetterstationen oder Satelliten gewonnen.
3. Vergleich und Bewertung: Die Vorhersagen der Modelle werden mit den tatsächlichen Beobachtungen verglichen. Anhand von statistischen Metriken wie dem mittleren quadratischen Fehler (MSE) oder dem negativen Log-Likelihood (NLL) wird bewertet, wie gut die Vorhersagen mit den Beobachtungen übereinstimmen.
4. Rangliste erstellen: Die Modelle werden basierend auf ihren Bewertungsergebnissen in eine Rangliste eingeordnet. Das Modell mit dem niedrigsten MSE oder dem höchsten NLL gilt als das genaueste. Dabei können die Werte in unterschiedliche Zeitspannen eingeordnet werden, um Aussagen mit höherem Informationsgehalt treffen zu können: (möglicherweise performen manche Modelle für langfristige Prognosen besser, sind für kurzfristige jedoch weniger gut)

- Kurzfristprognosen (bis 24 Stunden)
- Mittelfristprognosen (24-72 Stunden)
- Langfristprognosen (über 72 Stunden)

### Erweiterung der Benchmarks

In der einfachsten Version können Benchmarks anhand von einer Hand voll Variablen für verschiedene Zeitspannen mit einer Metrik berechnet und abgespeichert werden. Um die Benchmarks präziser und aussagekräftiger zu machen können 1 mehr Variablen verwendet werden, welche ggf. unterschiedlich gewichtet sind. Zudem können die Forecasts in den unterschiedlichen Zeitspannen entsprechend ihrer Entfernung vom vorhergesagten Zeitpunkt gewichtet werden. Es können noch viele weitere Maßnahmen ergriffen werden, um die Bewertung der Vorhersagen sp präzise und aussagekräftig wie möglich zu machen.

### Ergebnisinterpretation

Die praktische Anwendung des Benchmark-Systems erfolgt über Skriptabläufe, die einen automatisierten Tagesabgleich der Modelleistungen ermöglichen. Diese können über die Weboberfläche eingesehen werden. Außerdem können die Benchmark Scores verwendet werden, um beispielsweise bei der Modellfusionierung die Aussagen einzelner Modelle auf Basis ihres durchschnittlichen historischen Benchmark Scores zu gewichten.`
    },
    metaForecasting: {
        title: 'Meta Forecasting',
        text: `
Neben der Möglichkeit konkrete Wettervorhersagen zu machen, also konkrete Werte für Wetter-Features vorherzusagen, gibt es auch die Möglichkeit Vorhersagen zu Meta-Informationen zu machen. Beispiele für solche Meta-Forecasts sind Vorhersagen über die Konfidenz einer Vorhersage.

### Wie kann die Konfidenz vorhergesagt werden?

Die Konfidenz beschreibt, wie sicher sich ein Modell bei der Vorhersage ist. Mit der Hilfe von neuronalen Netzen können aus vergangenen Vorhersagen und den dazugehörigen Observationen Muster gelernt werden, wie sicher sich Modelle in der Vergangenheit bei der Vorhersage unter bestimmten Voraussetzungen sind. Damit kann möglicherweise auch festgestellt werden, welche von diesen Voraussetzungen ausschlaggebend für die Konfidenz von Wettervorhersagen sind.

### Methodik im Hintergrund von Konfidenzvorhersagen

Historische Vorhersagen sammeln: Um Modelle trainieren zu können müssen Vorhersagen gesammelt werden, um diese dann später mit den entsprechenden Observationen vergleichen zu können.

Beobachtungen erfassen: Für den Abgleich der historischen Vorhersagedaten mit den tatsächlichen Werte müssen auch diese erfasst werden.

Schätzen von Mittelwerten und Standardabweichungen: Auf Basis der historischen Vorhersagen und den Observationen wird versucht, die Vorhersage eines Mittelwerts und einer Standardabweichung zu lernen. Das Training wird in unserem Fall mittels der Maximum-Likelihood-Methode durchgeführt, bei welcher die Parameter des Modells so angepasst werden, dass die Wahrscheinlichkeit der beobachteten Daten unter der geschätzten Normalverteilung maximal werden.

### Möglichkeit der Erweiterung der Meta-Forecasts

Meta-Forecasts bieten vielfältige Erweiterungsmöglichkeiten, um die Qualität und Nützlichkeit von Wettervorhersagen zu verbessern. Eine naheliegende Erweiterung ist die Integration von Meta-Forecasts für Model-Fusion, bei der mehrere Modelle kombiniert werden, um die Vorhersagegenauigkeit und -stabilität zu erhöhen. Zudem können Abhängigkeiten von Features berücksichtigt und in die Vorhersagen einbezogen werden. Darüber hinaus können die Auswirkungen von Inputs auf die Outputs der Meta-Forecasts analysiert werden, um besser zu verstehen, welche Faktoren die Konfidenz der Vorhersagen beeinflussen.

### Ergebnisinterpretation

Die Interpretation der Ergebnisse von Meta-Forecasts erfordert ein tiefes Verständnis der zugrunde liegenden Modelle und Daten. Konfidenzwerte sollten nicht isoliert betrachtet werden, sondern im Kontext der historischen Leistung des Modells und der spezifischen Wetterbedingungen. Ein hoher Konfidenzwert bedeutet, dass das Modell basierend auf vergangenen Daten zuversichtlich ist, dass die Vorhersage genau ist, während ein niedriger Wert auf Unsicherheit hinweist. Es ist wichtig, Fehlerquellen zu identifizieren und zu berücksichtigen, wie z.B. unvollständige oder fehlerhafte Daten, Modellannahmen oder externe Einflüsse. Zudem sollten Trends und Muster in den Konfidenzwerten über die Zeit analysiert werden, um systematische Fehler oder Verbesserungspotenziale zu erkennen. Letztlich sollten die Ergebnisse der Meta-Forecasts immer in Kombination mit anderen Wetterdaten und -modellen betrachtet werden, um eine umfassende und zuverlässige Wettervorhersage zu gewährleisten.`
    }
}