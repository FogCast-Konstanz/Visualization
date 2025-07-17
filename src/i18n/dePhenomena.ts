export type phenomenaType = { title: string, description: string, content: { title: string, text: string }[], sources: string, id: string }

const fog: phenomenaType = {
    id: 'fog',
    title: 'Nebel',
    description: "Nebel entsteht durch Kondensation bei Sättigung der Luft, gefördert durch Abkühlung, Feuchtigkeit oder Luftmischung. Hauptarten sind Advektions-, Strahlungs-, Verdunstungs-, orographischer und Mischungsnebel. Die Bodenseeregion begünstigt durch ihre Wasserfläche, Berge und Windsysteme Nebelbildung, besonders im Herbst und Winter. Nebel löst sich durch Sonneneinstrahlung oder Wind auf.",
    content: [
        {
            title: 'Erklärung',
            text: `
Nebel entsteht, wenn Wassertröpfchen oder Eiskristalle in den unteren atmosphärischen Schichten die Sichtweite auf unter 1 Kilometer reduzieren. Je nach Sichtweite unterscheidet man zwischen leichtem (500-1000 m), mäßigem (200-500 m) und starkem Nebel (< 200 m (Vgl. Bott 2023, S. 450),

![Picture](/assets/phenomena/2025-02-17_SAMANTHA_ISTED_1.jpg "Foto von Samantha Isted")
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
`
        }, {
            title: 'Bezug auf den Bodensee',
            text: `
![Picture](/assets/phenomena/me_SAMANTHA_ISTED_1-2.jpg "Foto von Samantha Isted")

Der Bodensee fördert die Nebelbildung durch:
* Große Wasserfläche: Der See sorgt für eine konstante Feuchtigkeitszufuhr in die Luft, was besonders im Herbst und Winter die Nebelbildung begünstigt.
* Geografische Lage: Die umliegenden Berge schaffen ideale Bedingungen für Strahlungs- und Mischungsnebel, da sie kalte Luftmassen einschließen können.
* Lokale Windsysteme: Diese tragen zur Verteilung von Feuchtigkeit und Temperaturschwankungen bei, was die Bildung von Advektions- und Verdunstungsnebel unterstützt.

## Zeitliche Variationen

Die Bodenseeregion weist eine erhöhte Nebelhäufigkeit im Herbst und Winter auf, wenn die Temperaturdifferenzen zwischen Wasser und Land am größten sind. Diese Unterschiede fördern insbesondere die Bildung von Advektionsnebel und Strahlungsnebel. (Vgl. Bott 2023, S. 450)

## Auflösung des Nebels

Nebel löst sich meist durch:
* Solare Einstrahlung: Die Sonneneinstrahlung erwärmt den Boden, was zu einer Verdunstung der Wassertröpfchen führt.
* Turbulente Durchmischung: Insbesondere durch Wind kann der Nebel von unten her aufgelöst werden. (Vgl. Bott 2023, S. 451-452)
* Die Bodenseeregion bietet durch ihre spezifische Topografie und klimatischen Bedingungen ideale Voraussetzungen für die Bildung verschiedener Nebelarten. Der Bodensee selbst spielt eine zentrale Rolle, indem er als Feuchtigkeitsquelle und Temperaturregulator dient.
`
        }, {
            title: 'Datenanalyse',
            text: `
## Historische Entwicklung
In den letzten Jahrzehnten hat sich die zeitliche Entwicklung des Nebels in der Bodenseeregion deutlich verändert. Die jährlichen Nebelstunden sind seit den 1980er-Jahren von 400-600 Stunden auf unter 400 und teilweise sogar unter 200 Stunden gesunken. Gleichzeitig sind die Nebeltage in den letzten zehn Jahren um etwa 10 % zurückgegangen.
Diese Veränderungen lassen sich auf mehrere Faktoren zurückführen. Der Klimawandel hat die Durchschnittstemperaturen um etwa 2 Grad erhöht, wodurch die wärmere Luft mehr Wasserdampf aufnehmen kann, ohne dass dieser als Nebel kondensiert. Gleichzeitig hat die Reduktion der Luftverschmutzung die Zahl der Kondensationskerne verringert, was die Nebelbildung erschwert. Hinzu kommt, dass stärkere Winde bei Tiefdruckwetterlagen den Nebel häufiger vertreiben und dessen Dauer verkürzen. (Vgl. Kumbier 2023)

Um weitere Informationen über die historische Entwicklung des Nebels herauszufinden, können Sie hier schauen: [Nebel](/data?tab=fog)
`
        }
    ],
    sources: `
* Bott, A. (2023a). Mesoskalige meteorologische Prozesse. In A. Bott, Synoptische Meteorologie (S. 431-456). Springer Berlin Heidelberg. https://doi.org/10.1007/978-3-662-67217-4_12
* Kumbier, A. (2023, Januar 22). Trübe Suppe? Die Nebeltage am Bodensee werden weniger. https://www.schwaebische.de/regional/bodensee/friedrichshafen/truebe-suppe-die-nebeltage-am-bodensee-werden-weniger-1324973
`
};

const windsysteme: phenomenaType = {
    id: 'windsysteme',
    title: 'Windsysteme',
    description: 'Die wichtigsten Windsysteme am Bodensee sind der Föhn, die Bise, der Talwind, der Bergwind und die Land-Seewind-Zirkulation. Der Föhn ist ein warmer, trockener Fallwind über den Alpen, der für plötzliche Temperaturanstiege und klare Sicht sorgt, während die Bise ein kalter Nordostwind ist, der vor allem im Winter mit hohen Windgeschwindigkeiten auf den Bodensee einwirkt. Tal- und Bergwinde entstehen durch die tageszeitlichen Temperaturunterschiede zwischen Gebirge und Flachland, und die Land-Seewind-Zirkulation wechselt tagsüber zwischen Seebrise und Landbrise.',
    content: [
        {
            title: "Windsysteme am Bodensee",
            text: `
![Picture](/assets/phenomena/2021-07-18_SAMANTHA_ISTED_1.jpg "Foto von Samantha Isted")


## Föhn

Der Föhn ist ein warmer, trockener Fallwind, der vom Süden über die Alpen kommt. Er kann plötzlich auftreten und führt oft zu klarem Himmel und hohen Temperaturen.

Föhn entsteht, wenn Luft aus dem Süden gegen die Alpen gedrückt wird. Die Luft steigt an den Bergen auf (Luvseite) und kühlt sich ab, es bilden sich dichte Wolken und Niederschlag. Sobald die Luft über den Alpenhauptkamm strömt und in das Absinkgebiet gelangt (Leeseite), löst sich die Wolkendecke rasch auf. Die absinkende Luft ist nach dem Wasserverlust an der Luvseite meist sehr trocken und kann einen sprunghaften Temperaturanstieg von 10 K oder mehr bewirken, was zu einem tiefblauen Himmel und einer [ungewöhnlichen Fernsicht](/phenomena/bergsicht) führt (Vgl. Deutscher Wetterdienst, k.D. a).

\n

## Bise

Die Bise ist ein kalter, trockener Wind aus dem Nordosten. Sie tritt besonders im Winter auf und bringt oft kalte, klare Wetterbedingungen.

Für die Entstehung von Bise ist eine spezielle Druckkonstellation erforderlich: Ein Hochdruckgebiet über Nordeuropa verbindet sich mit einem Tiefdruckgebiet über dem Mittelmeer. Diese Konstellation bewirkt, dass die Luft aus nordöstlicher Richtung über die Schweiz strömt. Vor allem im Genferseegebiet, wo der Abstand zwischen Alpen und Jura immer kleiner wird, wird diese Luft durch den Engpass geleitet, was in den unteren Schichten zu extrem hohen Windgeschwindigkeiten von teilweise über 50 Knoten führt. 

![Picture](/assets/phenomena/2021-05-22_SAMANTHA_ISTED_1.jpg "Foto von Samantha Isted")
Auch der Bodensee wird von der Bise beeinflusst.  Während die kontinentale Luft im Sommer relativ trocken ist und für schönes Wetter sorgt, weist sie in der kalten Jahreszeit einen deutlich höheren Feuchtigkeitsgehalt auf. Häufig bildet sich dann eine horizontale Schicht, in der warme, trockene Luft über kühlerer, feuchter Luft liegt, was zur Bildung von [Nebel](/phenomena/fog) führt, aus dem gelegentlich leichter Regen oder Schnee fällt. Diese Schicht behindert auch den vertikalen Luftaustausch, so dass sich Schadstoffe in Bodennähe anreichern (Vgl. Meteo Schweiz, 2015).

## Talwind und Bergwind

Talwind entsteht, wenn sich die Luft im Gebirge bei Sonneneinstrahlung stärker erwärmt als im Flachland, dadurch aufsteigt und der Luftdruck sinkt. Zum Ausgleich strömt kühlere Luft durch die Täler in die Berge. Dieses Phänomen beginnt etwa 2-3 Stunden nach Sonnenaufgang und endet kurz nach Sonnenuntergang (Vgl. Deutscher Wetterdienst, k.D. d). 

Abends hingegen entsteht der Bergwind, wenn die Bergluft stärker abkühlt als im Flachland. Die schwere Kaltluft strömt dann von den Hängen ins Tal. Der Bergwind beginnt etwa 2-3 Stunden nach Sonnenuntergang und dauert bis kurz nach Sonnenaufgang (Vgl. Deutscher Wetterdienst, k.D. b).



## Land-Seewind-Zirkulation

Die Land-Seewind-Zirkulation ist ein täglich wiederkehrendes Windsystem, das vor allem an den Küsten, aber auch an großen Binnenseen wie dem Bodensee auftritt. Tagsüber erwärmt sich das Land stärker als das Wasser, sodass kühlere, feuchte Luft vom Meer zum Land strömt (Seewind). Am späten Nachmittag kehrt sich das Gefälle um, da das Land schneller abkühlt und die Luft vom Land zum Wasser strömt (Landwind) (Vgl. Deutscher Wetterdienst, k.D. c).`
        }
    ],
    sources: `
*   Deutscher Wetterdienst. (kein Datum a). _Alpen-Süd-Föhn_. Abgerufen am 17. Februar 2025 von [https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?nn=103346&lv2=100072&lv3=100180](https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?nn=103346&lv2=100072&lv3=100180)
    
*   Deutscher Wetterdienst. (kein Datum b). Bergwind. Von [https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv2=100310&lv3=100420](https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv2=100310&lv3=100420)
    
*   Deutscher Wetterdienst. (kein Datum c). Land-Seewind-Zirkulation. Von [https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv2=101518&lv3=101564](https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv2=101518&lv3=101564)
    
*   Deutscher Wetterdienst. (kein Datum d). Talwind. Von [https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv2=102672&lv3=102730](https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv2=102672&lv3=102730)
    
*   Meteo Schweiz. (2015). Typische Wetterlagen im Alpenraum. Von [https://www.meteoschweiz.admin.ch/service-und-publikationen/publikationen/verschiedenes/2015/typische-wetterlagen-im-alpenraum.html](https://www.meteoschweiz.admin.ch/service-und-publikationen/publikationen/verschiedenes/2015/typische-wetterlagen-im-alpenraum.html)`
};

const hochwasser: phenomenaType = {
    id: 'hochwasser',
    title: 'Wasserstand und Hochwasser',
    description: `Der Wasserstand in Konstanz variiert saisonal durchschnittlich zwischen ca. 285 und 410 cm - im Winter sinkt er unter 240 cm, im Frühjahr und Sommer steigt er durch Schneeschmelze an. Hochwasser liegt ab 4,80 m, wobei 1 cm Zuwachs etwa 5,36 Mio m³ Wasser entspricht; Pfingsten 1999 wurde mit 5,65 m ein Tagesrekord erreicht, der nur 1817 mit 6,23 m übertroffen wurde.`,
    content: [{
        title: 'Hochwasser und Schwankungen am Bodensee',
        text: `
![Picture](/assets/phenomena/Pegel_Konstanz_1817-1935.png "Vgl. Bodenseee.net, 2025")
![Picture](/assets/phenomena/Wasserstand_Konstanz.png "Vgl. Landesanstalt für Umwelt Baden-Württemberg, 2025")
    
## Jährliche Schwankungen
Der mittlere Wasserstand das Jahr über schwankte über die Jahre 1981-2024 zwischen ca. 285 bis 410 cm. Im Winter ist der Wasserstand des Bodensees in der Regel niedriger, da weniger Niederschlag und Schneeschmelze vorhanden sind. Dabei kann der Wasserpegel unter 240 cm sinken. Im Frühjahr und Sommer steigt der Wasserstand aufgrund der Schneeschmelze aus den Alpen und vermehrten Regenfällen. Ab Juli bis zum nächsten Februar ist der Wasserpegel rückläufig.

## Hochwasserstände

Wenn am Pegel Konstanz ein Wasserstand von mehr als 4,80 m erreicht wird, spricht man am Bodensee von Hochwasser. Die Oberfläche des Sees beträgt 536 km². So entspricht 1 cm Zuwachs des Wasserpegels einem Zuwachs von 5,36 Millionen Kubikmeter Wasser. An Pfingsten 1999 erreichte der Pegel in Konstanz innerhalb eines Tages einen Anstieg von 47 cm und erreichte 5,65 m - ein Rekord, der nur 1817 mit 6,36 m übertroffen wurde (Vgl. Anger, 2016).`
    }, {
        title: 'Daten',
        text: `
Um weitere Informationen über die historische Entwicklung des Wasserstands herauszufinden, können Sie hier schauen: [Hochwasserentwicklung](/data?tab=waterLevel)   `
    }
    ],
    sources: `
*   Anger, J. (2016). _Hochwasser am Bodensee_. Von [https://www.dwd.de/DE/wetter/thema\_des\_tages/2016/6/24.html](https://www.dwd.de/DE/wetter/thema_des_tages/2016/6/24.html)
    
*   Bodenseee.net. (2025). _Pegel Konstanz Entwicklung_. Von Wasserstand Bodensee Historie: [https://www.bodenseee.net/pegel/](https://www.bodenseee.net/pegel/)
    
*   Landesanstalt für Umwelt Baden-Württemberg. (2025). Pegel Konstanz/Bodensee. Von [https://www.hvz.baden-wuerttemberg.de/pegel.html?id=00007&m=W](https://www.hvz.baden-wuerttemberg.de/pegel.html?id=00007&m=W)`
};

const bergsicht: phenomenaType = {
    id: 'bergsicht',
    title: 'Bergsicht',
    description: 'Eine Sichtweite von mehr als 50 km wird als außergewöhnliche Fernsicht bezeichnet. Sie ist eine häufige Begleiterscheinung des [Föhns](/phenomena/windsysteme), eines warmen, trockenen Fallwinds, der von Süden nach Norden über die Alpen weht. Wenn Föhn auftritt, bringt er oft eine deutliche Wetterbesserung und klare Sichtverhältnisse mit sich, sodass die Alpen vom Bodensee aus sichtbar werden.',
    content: [
        {
            title: "Bergsicht am Bodensee",
            text: `![Picture](/assets/phenomena/2021-03-30_SAMANTHA_ISTED_1.jpg "Foto von Samantha Isted")    
Ungewöhnliche Fernsicht ist eine sehr klare Sicht, die häufig nach Kaltfronten oder bei Föhn auftritt, wenn die trockene, absinkende Luft die sonst sichtbehindernden Schwebeteilchen reduziert. Ungewöhnliche Fernsicht wird ab einer Sichtweite von mehr als 50 km vermerkt, an hoch gelegenen Stationen erst ab 150 km bzw. 200 km (Vgl. Deutscher Wetterdienst, k.D.b).
[Föhn](/phenomena/windsysteme) entsteht, wenn Luft aus dem Süden gegen die Alpen gedrückt wird. Die Luft steigt an den Bergen auf (Luvseite) und kühlt sich ab, es bilden sich dichte Wolken und Niederschlag. Sobald die Luft über den Alpenhauptkamm strömt und in das Absinkgebiet gelangt (Leeseite), löst sich die Wolkendecke rasch auf. Die absinkende Luft ist nach dem Wasserverlust an der Luvseite meist sehr trocken und kann einen sprunghaften Temperaturanstieg von 10 K oder mehr bewirken, was zu einem tiefblauen Himmel und einer ungewöhnlichen Fernsicht führt (Vgl. Deutscher Wetterdienst, k.D.a).`,
        },
    ],
    sources: `
*   Deutscher Wetterdienst. (kein Datum a). _Alpen-Süd-Föhn_. Abgerufen am 17. Februar 2025 von [https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?nn=103346&lv2=100072&lv3=100180](https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?nn=103346&lv2=100072&lv3=100180) 
    
*   Deutscher Wetterdienst. (kein Datum b). _Ungewöhnliche Fernsicht_. Abgerufen am 17. Februar 2025 von [https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv2=102828&lv3=102854](https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv2=102828&lv3=102854)`
};


const wolkenbildung: phenomenaType = {
    id: 'wolkenbildung',
    title: 'Wolkenbildung',
    description: 'Wolken bestehen aus Wassertröpfchen oder Eiskristallen und werden in zehn Haupttypen mit lateinischen Namen eingeteilt. Einige im Bodenseeraum vorkommende Sonderformen wie Mammatuswolken oder Kelvin-Helmholtz-Wellen entstehen unter besonderen Bedingungen wie Gewitter oder Windscherung.',
    content: [
        {
            title: "Wolkenbildung",
            text: `
Eine Wolke ist eine Ansammlung winziger Wassertröpfchen oder Eiskristalle, die in der Luft schweben und meist nicht den Boden berühren. Manchmal können auch größere Tropfen oder andere Teilchen wie Staub oder Rauch enthalten sein (Vgl. World Meteorological Organization, 2017a).

Wolken treten in vielen Formen auf und lassen sich - ähnlich wie Pflanzen oder Tiere - in eine begrenzte Anzahl typischer Formen mit lateinischen Namen für Gattungen einteilen. Übergangsformen sind instabil und werden selten klassifiziert. Darüber hinaus gibt es Spezialwolken und seltene Wolken in der hohen Atmosphäre (Vgl. World Meteorological Organization, 2017b).

### Wolkengattungen 

![Wolkenarten](/assets/phenomena/clouds/Cloud_Types.png "Bild: Valentin de Bruyn 2021, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)") 

Die Klassifikation der Wolken umfasst zehn Hauptgruppen, die Gattungen genannt werden. Jede beobachtete Wolke gehört genau einer Gattung an (Vgl. World Meteorological Organization, 2017c). Diese sind

* Stratus (St) - niedrige Schichtwolke
* Stratocumulus (Sc) - Schicht-Haufenwolke
* Cumulus (Cu) - Haufenwolke
* Nimbostratus (Ns) - Regen-Schichtwolke
* Altostratus (As) - mittelhohe Schichtwolke
* Altocumulus (Ac) - grobe Schäfchenwolke
* Cirrus (Ci) - hohe Federwolke
* Cirrocumulus (Cc) - hohe Schäfchenwolke
* Cirrostratus (Cs) - hohe Schleierwolke
* Cumulonimbus (Cb) - Schauer- u. Gewitterwolke

(Vgl. Deutscher Wetterdienst, k. D. a).
`
        }, {
            title: "Wolken über dem Bodensee",
            text: `
            
![center](/assets/phenomena/clouds/Stratus.png "Stratus - Foto: Simon A. Eugster, 2005, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)") 
![not center](/assets/phenomena/clouds/Stratocumulus.png "Stratocumulus - Foto: Simon A. Eugster, 2004, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)") 
## Stratus - niedrige Wolkenschicht
            
Stratus ist eine graue Wolkenschicht mit einer gleichmäßigen Basis, aus der Nieselregen, Schnee oder Schneeregen fallen kann. Wenn die Sonne (oder der Mond) durch den Hochnebel sichtbar ist, sind die Konturen des Hochnebels deutlich zu erkennen (Vgl. World Meteorological Organization, 2017c).


## Stratocumulus - Schicht-Haufenwolke

Diese Wolken erscheinen als graue oder weißliche Flecken oder Schichten am Himmel. Sie bestehen aus runden oder länglichen Teilen wie Schollen, Ballen oder Walzen, die oft zusammenhängen. Die Wolken haben meist dunkle Bereiche und keine faserige Struktur. Viele der kleinen Wolkenteile sind regelmäßig angeordnet und etwas größer als 5 Grad am Himmel (Vgl. Deutscher Wetterdienst, k. D. b).



## Cumulus
![center](/assets/phenomena/clouds/Cumulus.jpg "Cumulus - Foto: Samantha Isted") 

Gelöste, meist dichte und scharf begrenzte Wolken, die sich vertikal in Form von aufsteigenden Hügeln, Kuppeln oder Türmen entwickeln, deren aufgewölbter oberer Teil oft an einen Blumenkohl erinnert. Die von der Sonne bestrahlten Teile dieser Wolken sind meist weiß, ihre Basis ist relativ dunkel und fast horizontal. Manchmal sind die Cumuluswolken zerklüftet (Vgl. World Meteorological Organization, 2017e).
![not center](/assets/phenomena/clouds/Cumulonimbus.jpg "Cumulonimbus - Foto: Samantha Isted") 




## Cumulonimbus - Schauer- und Gewitterwolke

Schwere, dichte Wolke mit beträchtlicher vertikaler Ausdehnung in Form eines Berges oder riesiger Türme. Zumindest ein Teil der Oberseite ist gewöhnlich glatt, faserig oder gestreift und fast immer abgeflacht; dieser Teil erstreckt sich oft in Form eines Ambosses oder einer großen Wolke (Vgl. World Meteorological Organization, 2017e). Cumulonimbuswolken entstehen in feuchtlabiler, aufsteigender Luft und können bis zur Tropopause (ca. 12 km Höhe) reichen. Sie bestehen aus Wassertröpfchen und Eiskristallen, sind mächtig ausgedehnt und bringen oft starke Niederschläge, Gewitter, Hagel und Sturmböen (Vgl. Deutscher Wetterdienst, k. D. c).

![center](/assets/phenomena/clouds/Mammatuswolken.jpg "Mammatuswolken - Foto: Samantha Isted") 

## Mammatuswolken 

Mammatuswolken entstehen meist in Gewitterwolken, aber auch in anderen Wolkentypen. Ihre Entstehung ist noch nicht vollständig geklärt, aber es gibt verschiedene Theorien. 
Turbulenzen, Verdunstung und Abkühlung führen zum Absinken kalter Luft, die zu Aufwölbungen führt. Strahlungsprozesse und Temperaturunterschiede im Amboss können ebenfalls zu Instabilitäten führen. Da Mammatuswolken auch in Zirruswolken auftreten, ist es wahrscheinlich, dass je nach Wolkentyp mehrere verschiedene Prozesse beteiligt sind (Vgl. Fruntke, 2018). Mammatuswolken können bei Cirrus, Cirrocumulus, Altocumulus, Altostratus, Stratocumulus und Cumulonimbus entstehen (Vgl. World Meteorological Organization, 2017g).


![not center](/assets/phenomena/clouds/Kelvin-Helmholtz-Wellen.png "Kelvin-Helmholtz-Wellen - Foto: GRAHAMUK, 2006, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)") 

## Kelvin-Helmholtz-Wellen

Kelvin-Helmholtz-Wellen sind relativ kurzlebige Wellenbildungen, meist an der Wolkenoberseite, in Form von Schleifen oder brechenden Wellen. Kelvin-Helmholtz-Wellen entstehen, wenn unterschiedlich warme Luftschichten durch Windscherung in Bewegung geraten und sich als Zeichen beginnender Durchmischung zu brechenden Wellen ausbilden. Sie sind selten, aber meistens über Gebirgen oder bei speziellen Wetterlagen wie Föhn zu beobachten. Sie treten vor allem bei Cirrus, Altocumulus, Stratocumulus, Stratus und gelegentlich bei Cumulus auf (Vgl. Hinz, 2022; World Meteorological Organization, 2017h)


![center](/assets/phenomena/clouds/Altocumulus_Lenticularis.png "Altocumulus Lenticularis - Foto: Karlheinz Essl, 2015, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)") 


## Altocumulus Lenticularis (Föhnwolke)

Dieser Altocumulus-Typ, auch “Föhnfisch” genannt, tritt bei Föhn auf der Leeseite des Gebirges parallel zum Gebirgskamm in Form von linsenförmigen Flecken auf. Die vertikale Ausdehnung beträgt in der Regel nicht mehr als 200 m (Vgl. World Meteorological Organization, 2017i; Deutscher Wetterdienst, k. D. d).
            `

        }
    ], sources: `
    
* Deutscher Wetterdienst. (kein Datum c). Cumulonimbus. Von https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?nn=103346&lv2=100510&lv3=100572
* Deutscher Wetterdienst. (kein Datum d). Föhnfische. Von https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv2=100784&lv3=100880
* Deutscher Wetterdienst. (kein Datum b). Stratocumulus. Von https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?nn=103346&lv2=102248&lv3=102630
* Deutscher Wetterdienst. (kein Datum a). Wolkengattungen. Von https://www.dwd.de/DE/service/lexikon/begriffe/W/Wolkengattungen_pdf.pdf?__blob=publicationFile&v=5
* Fruntke, J. (2018). Rätselhafte "Mammatus". Von https://www.dwd.de/DE/wetter/thema_des_tages/2018/9/1.html 
* Hinz, C. (2022). Kelvin-Helmholtz-Wellen – Wie entstehen die Wellen am Himmel? Von https://www.dmg-ev.de/2022/04/20/kelvin-helmholtz-wellen-wie-entstehen-die-wellen-am-himmel/
* World Meteorological Organization. (2017i). Altocumulus lenticularis. Von https://cloudatlas.wmo.int/en/altocumulus-lenticularis.html
* World Meteorological Organization. (2017f). Cumulonimbus (Cb) (Weilbach 1880). Von Definition of Cumulonimbus: https://cloudatlas.wmo.int/en/cumulonimbus-cb.html
* World Meteorological Organization. (2017e). Cumulus (Cu) (Howard 1803). Von Definition of Cumulus: https://cloudatlas.wmo.int/en/cumulus-cu.html
* World Meteorological Organization. (2017h). Fluctus. Von https://cloudatlas.wmo.int/en/clouds-supplementary-features-fluctus.html
* World Meteorological Organization. (2017a). Introduction and principles of cloud classification. Von Definition of a cloud: https://cloudatlas.wmo.int/en/introduction-and-principles-of-cloud-classification.html
* World Meteorological Organization. (2017c). Genera. Von https://cloudatlas.wmo.int/en/principles-of-cloud-classification-genera.html 
* World Meteorological Organization. (2017g). Mamma. Von https://cloudatlas.wmo.int/en/clouds-supplementary-features-mamma.html 
* World Meteorological Organization. (2017b). Principles of cloud classification. Von https://cloudatlas.wmo.int/en/principles-of-cloud-classification.html
* World Meteorological Organization. (2017d). Stratus (St) (Howard 1803; Hildebrandsson 1887; Abercromby 1887). Von Definition of Stratus: https://cloudatlas.wmo.int/en/clouds-genera-stratus.html
  `
}

const extremwetter: phenomenaType = {
    id: 'extremwetter',
    title: 'Extremwetter',
    description: 'Am Bodensee treten verschiedene Extremwetterereignisse auf, die mit Starkniederschlägen, Schneestürmen, Hoch- und Niedrigwasser, Stürmen sowie außergewöhnlichen Hitze- oder Kälteperioden verbunden sind. Diese Ereignisse haben teils gravierende Auswirkungen auf Natur, Infrastruktur und Bevölkerung.',
    content: [
        {
            title: "Hochwasser- und Niedrigwasser",
            text: `
**Jahrhunderthochwasser 1999**  
Im Jahr 1999 ereignete sich am Bodensee ein außergewöhnliches [Hochwasser](/phenomena/hochwasser), das nicht nur durch seine Intensität, sondern vor allem auch durch sein sehr frühes Auftreten Aufmerksamkeit erregte. 
Der Höchststand des Bodenseehochwassers 1999 betrug 564 cm am Pegel Konstanz. Damit war es das vierthöchste [Hochwasser](/phenomena/hochwasser) seit Beginn der Messungen im Jahr 1816. Der bisher höchste registrierte Pegelstand wurde im Jahr 1817 mit 623 cm erreicht, gefolgt von 576 cm im Jahr 1890 und 568 cm im Jahr 1821 (vgl. Ostendorp & Jöhnk, 2003, S. 4).
Das [Hochwasser](/phenomena/hochwasser) am Bodensee im Jahr 1999 lässt sich im Wesentlichen durch zwei klimatische Faktoren erklären: Zum einen traten im Mai und Anfang Juni im voralpinen und zentralalpinen Raum, dem Haupteinzugsgebiet des Bodensees, intensive Starkniederschläge auf. Zum anderen waren die Temperaturen im Mai deutlich überdurchschnittlich, was zu einer frühen und intensiven Schneeschmelze in den Alpen führte. Das Zusammenwirken dieser beiden Faktoren (Starkniederschläge und zusätzlicher Wasserzufluss durch die Schneeschmelze) führte zu einem außergewöhnlich schnellen und massiven Wasserzufluss in den See (vgl. Ostendorp & Jöhnk, 2003, S. 3).

**Jahrhundertniedrigwasser 2003**  
Im Jahr 2003 erlebte der Bodensee ein außergewöhnliches Niedrigwasser, das sowohl in seinem Ausmaß als auch in seiner Seltenheit bemerkenswert ist. Bereits im Juni 2003 zeichnete sich ein außergewöhnlich niedriger [Wasserstand](/phenomena/hochwasser) ab. Ende August erreichte der Pegel ein extrem niedriges Niveau, wie es statistisch nur etwa alle 700 Jahre zu erwarten ist. Ursache für den außergewöhnlich niedrigen Wasserstand war die anhaltende Trockenheit und das Ausbleiben von Niederschlägen im Einzugsgebiet des Bodensees. Im Gegensatz zum Hochwasser 1999, das durch Starkniederschläge und Schneeschmelze verursacht wurde, ist das Niedrigwasser 2003 also auf eine lang anhaltende Trockenperiode zurückzuführen (vgl. Ostendorp & Jöhnk, 2003, S. 7-8).`
        }, {
            title: "Stürme",
            text: `**Orkan „Lothar“ (Dezember 1999)**  
Der Orkan „Lothar“ fegte über Nordfrankreich, Süddeutschland und die Schweiz hinweg und traf auch die Bodenseeregion mit Windgeschwindigkeiten über 150 km/h. Zahlreiche Bäume wurden entwurzelt, Dächer beschädigt und der Bahnverkehr unterbrochen (vgl. Kaiko, 2021)

**Starker Schneesturm (8. Februar 2013)**  
Eine Fallstudie zu einem Schneesturm am 8. Februar 2013 zeigt, dass der Bodensee selbst zur Bildung intensiver Schneebänder beiträgt. Der See verstärkte durch wärmere Luftmassen über dem Wasser die atmosphärische Instabilität, was zu lokal extremem Schneefall von 36 mm in nur 5 Stunden führte (Vgl. Umek & Gohm, 2016, S. 4687).
**Sturm „Burglind“ (Januar 2018)**  
Der Sturm „Burglind“ verursachte massive Schäden an Infrastruktur und führte zu Stromausfällen in Teilen der Bodenseeregion (vgl. Scherrer et al., 2018).
`
        }, {
            title: "Extreme Temperaturen",
            text: `
**Seegfrörne 1962/63**  
Im Winter 1962/63 erlebte Deutschland extreme Kälte mit einer Durchschnittstemperatur von -5,5 °C, wobei der Bodensee vollständig zufror und zur größten natürlichen Eisfläche des Landes wurde. Die sogenannte Seegfrörne setzte früh im November ein, erreichte im Januar ihren Höhepunkt mit Temperaturen unter -20 °C und endete erst im März durch Föhnwetter. Die Eisbildung verlief stufenweise vom flachen Gnadensee bis zum tiefen Obersee, wobei Eisdicken bis zu einem Meter gemessen wurden (vgl. Deutscher Wetterdienst, 2013).

**Hitze und Dürre 2003**  
Der Sommer 2003 war der bislang heißeste in Deutschland und brachte extreme Temperaturen über 40 Grad, besonders in Süddeutschland. Die Hitze führte zu schwerwiegenden gesundheitlichen Folgen, mehreren Tausend Todesfällen und massiven Problemen durch anhaltende Trockenheit – Flüsse trockneten aus, Ernten verdorrten, und die Binnenschifffahrt kam vielerorts zum Erliegen. Ursache war eine stabile Omega-Wetterlage mit langanhaltendem Hochdruckeinfluss über Mitteleuropa (vgl. WetterOnline, 2013).`
        }
    ],
    sources: `
*   Deutscher Wetterdienst. (2013). _1962/1963 erlebte Deutschland den kältesten Winter seit 1881_. https://www.dwd.de/DE/presse/pressemitteilungen/DE/2013/20130125_Bodensee.pdf?__blob=publicationFile&v=4

*   Kaiko. (2021, Februar 7). _Orkan Lothar – Schweizer Sturmarchiv_. https://sturmarchiv.ch/index.php?title=19991226_03_Orkan_Lothar

*   Ostendorp, Wolfgang & Joehnk, Klaus. (2003). _Jahrhunderthochwasser 1999 – Jahrhundertniedrigwasser 2003: Seespiegeltrends und Extremwasserstände am Bodensee_. Natur und Mensch, 6, 6-11. https://doi.org/10.13140/2.1.1500.7680

*   Scherrer, S. et al. (2018). _Der Wintersturm Burglind/Eleanor in der Schweiz—MeteoSwiss_. https://www.meteoswiss.admin.ch/services-and-publications/publications/reports-and-bulletins/2018/der-wintersturm-burglind-eleanor-in-der-schweiz.html

*   Umek, L., & Gohm, A. (2016). _Lake and Orographic Effects on a Snowstorm at Lake Constance_. Monthly Weather Review, 144, 4687–4707. https://doi.org/10.1175/MWR-D-16-0032.1

*   WetterOnline. (2013, August 9). _Vor zehn Jahren 40 Grad heiß—Rückblick: Hitzesommer 2003_. https://www.wetteronline.de/extremwetter/vor-zehn-jahren-40-grad-heiss-rueckblick-hitzesommer-2003-2013-08-09-ex
`
};


export const dePhenomena = {
    phenomena: [
        fog,
        windsysteme,
        hochwasser,
        bergsicht,
        wolkenbildung,
        extremwetter
    ]
}
