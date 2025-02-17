
export type penonemaPage = {title: string, description: string, explanation: string, referenceBodensee: string, dataAnalysis: string, sources: string, id: string}
export const fog: penonemaPage = {
id: 'fog',
title: 'Nebel',
description: 'Nebel entsteht, wenn Wassertröpfchen oder Eiskristalle in den unteren atmosphärischen Schichten die Sichtweite auf unter 1 Kilometer reduzieren. Je nach Sichtweite unterscheidet man zwischen leichtem (500-1000 m), mäßigem (200-500 m) und starkem Nebel (< 200 m (Vgl. Bott 2023, S. 450)',
explanation: `
![Picture](/assets/phenomena/fog.jpg)

## Physikalische Entstehungsprozesse

Die Grundvoraussetzung für die Nebelbildung ist das Erreichen des Sättigungszustands der Luft. Dies kann geschehen durch:
* Abkühlung auf den Taupunkt: Häufig in den Nächten, wenn die Erdoberfläche durch Infrarotstrahlung auskühlt.
* Zufuhr von Feuchtigkeit: Zum Beispiel durch Verdunstung von Wasser aus dem Bodensee.
* Mischung unterschiedlicher Luftmassen: Ein typisches Beispiel ist die Interaktion von warmer Luft über dem Bodensee mit kühler Luft aus den umliegenden Bergen. (Vgl. Bott 2023, S. 450)

## Die Hauptarten von Nebel umfassen:
1. **Advektionsnebel**: Tritt auf, wenn feuchtwarme Luft über einen kalten Untergrund strömt, wodurch die unteren Luftschichten abkühlen und sich Nebel bildet. Diese Art von Nebel ist häufig in Küstenregionen und an großen Seen wie dem Bodensee zu beobachten.
2. **Strahlungsnebel**: Bildet sich bei klaren, windschwachen Nächten durch starke Abkühlung der Erdoberfläche. Dieser Nebel ist besonders in Tälern und geschützten Regionen verbreitet, wie es in der Bodenseeregion häufig der Fall ist.
3. **Orographischer** Nebel: Entsteht, wenn aufsteigende Luft an Gebirgen abkühlt und kondensiert. Lokale Windsysteme begünstigen die Bildung, können sie aber auch schnell wieder auflösen.
4. **Verdunstungsnebel**: Entsteht, wenn kalte Luft über warme Wasserflächen strömt, was besonders in der kalten Jahreszeit am Bodensee vorkommt.
5. **Mischungsnebel**: Bildet sich durch die Mischung zweier untersättigter Luftmassen, die zusammen gesättigt werden. (Vgl. Bott 2023, S. 450 - 451)
`,
referenceBodensee: `
Der Bodensee fördert die Nebelbildung durch:
* Große Wasserfläche: Der See sorgt für eine konstante Feuchtigkeitszufuhr in die Luft, was besonders im Herbst und Winter die Nebelbildung begünstigt.
* Geografische Lage: Die umliegenden Berge schaffen ideale Bedingungen für Strahlungs- und Mischungsnebel, da sie kalte Luftmassen einschließen können.
* Lokale Windsysteme: Diese tragen zur Verteilung von Feuchtigkeit und Temperaturschwankungen bei, was die Bildung von Advektions- und Verdunstungsnebel unterstützt.

### Zeitliche Variationen
Die Bodenseeregion weist eine erhöhte Nebelhäufigkeit im Herbst und Winter auf, wenn die Temperaturdifferenzen zwischen Wasser und Land am größten sind. Diese Unterschiede fördern insbesondere die Bildung von Advektionsnebel und Strahlungsnebel. (Vgl. Bott 2023, S. 450)
Auflösung des Nebels

Nebel löst sich meist durch:
* Solare Einstrahlung: Die Sonneneinstrahlung erwärmt den Boden, was zu einer Verdunstung der Wassertröpfchen führt.
* Turbulente Durchmischung: Insbesondere durch Wind kann der Nebel von unten her aufgelöst werden. (Vgl. Bott 2023, S. 451-452)
* Die Bodenseeregion bietet durch ihre spezifische Topografie und klimatischen Bedingungen ideale Voraussetzungen für die Bildung verschiedener Nebelarten. Der Bodensee selbst spielt eine zentrale Rolle, indem er als Feuchtigkeitsquelle und Temperaturregulator dient.
`,
dataAnalysis: `
## Historische Entwicklung
In den letzten Jahrzehnten hat sich die zeitliche Entwicklung des Nebels in der Bodenseeregion deutlich verändert. Die jährlichen Nebelstunden sind seit den 1980er-Jahren von 400-600 Stunden auf unter 400 und teilweise sogar unter 200 Stunden gesunken. Gleichzeitig sind die Nebeltage in den letzten zehn Jahren um etwa 10 % zurückgegangen.
Diese Veränderungen lassen sich auf mehrere Faktoren zurückführen. Der Klimawandel hat die Durchschnittstemperaturen um etwa 2 Grad erhöht, wodurch die wärmere Luft mehr Wasserdampf aufnehmen kann, ohne dass dieser als Nebel kondensiert. Gleichzeitig hat die Reduktion der Luftverschmutzung die Zahl der Kondensationskerne verringert, was die Nebelbildung erschwert. Hinzu kommt, dass stärkere Winde bei Tiefdruckwetterlagen den Nebel häufiger vertreiben und dessen Dauer verkürzen. (Vgl. Kumbier 2023)
`,
sources: `
* Bott, A. (2023a). Mesoskalige meteorologische Prozesse. In A. Bott, Synoptische Meteorologie (S. 431-456). Springer Berlin Heidelberg. https://doi.org/10.1007/978-3-662-67217-4_12
* Kumbier, A. (2023, Januar 22). Trübe Suppe? Die Nebeltage am Bodensee werden weniger. https://www.schwaebische.de/regional/bodensee/friedrichshafen/truebe-suppe-die-nebeltage-am-bodensee-werden-weniger-1324973
`
};

export const schwäbisches_meer_effekt: penonemaPage = {
    id: 'schwäbisches-meer',
    title: 'Schwäbisches Meer Effekt',
    description: 'Der Schwäbische Meereffekt beschreibt den klimatischen Einfluss des Bodensees, der durch seine Wärmespeicherung, Feuchtigkeitsregulierung und Windmuster ein mildes und ausgeglichenes Klima in der Region schafft. Besonders im Winter verhindert der See starke Temperaturabfälle und begünstigt ein stabileres Wetter.',
    explanation: `t.b.d.`,
    referenceBodensee: `t.b.d.`,
    dataAnalysis: `t.b.d.`,
    sources: `t.b.d.`
};

export const windsysteme: penonemaPage = {
    id: 'windsysteme',
    title: 'Windsysteme',
    description: 'Die Windsysteme am Bodensee umfassen verschiedene Strömungen, die das Wetter beeinflussen. Während Föhn und Bise extreme Temperaturen bringen, sorgen thermische Winde für den täglichen Wechsel zwischen See- und Landwind, und gelegentliche Stürme können starke Böen verursachen.',
    explanation: `t.b.d.`,
    referenceBodensee: `t.b.d.`,
    dataAnalysis: `t.b.d.`,
    sources: `t.b.d.`
};

export const hochwasser: penonemaPage = {
    id: 'hochwasser',
    title: 'Wasserstand und Hochwasser',
    description: 'Der Wasserstand des Bodensees schwankt saisonal und wird von Niederschlägen, Schneeschmelze und Zuflüssen beeinflusst. Starkregen oder anhaltende Schneeschmelze können Hochwasser verursachen, das Uferbereiche überflutet und Schäden anrichten.',
    explanation: `t.b.d.`,
    referenceBodensee: ``,
    dataAnalysis: ``,
    sources: ``
};

export const bergsicht: penonemaPage = {
    id: 'bergsicht',
    title: 'Bergsicht',
    description: 'Der Föhn verbessert die Sicht am Bodensee, indem er trockene Luftmassen heranführt und Wolken auflöst, was eine außergewöhnliche Fernsicht ermöglicht. Gleichzeitig sorgt er für steigende Temperaturen und hohen Luftdruck, wodurch die Berge in klarer Pracht erscheinen.',
    explanation: `t.b.d`,
    referenceBodensee: ``,
    dataAnalysis: ``,
    sources: ``
};

export const phenomena = [
    fog,
    schwäbisches_meer_effekt,
    windsysteme,
    hochwasser,
    bergsicht
]