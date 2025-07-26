export const deLexicon = {
    predictedTime: {
        title: 'Vorhergesagter Zeitpunkt',
        text: 'Zeitpunkt auf den sich die Vorhersage bezieht,sprich an dem der vorhergesagte Wert auftreten soll. Beispielsweise: Am 24.02.2025 um 12:00 Uhr soll es 12°C geben. In diesem Fall ist "24.12.2025 um 12 Uhr" der vorhergesagte Zeitpunkt.',
        tags: ['prediction']
    },
    timeOfPrediction: {
        title: 'Zeitpunkt der Vorhersage',
        text: 'Zeitpunkt an dem die Vorhersage "veröffentlicht/erstellt" wurde. Beispielsweise wird am 12.02.2025 eine Vorhersage für den 24.02.2025 erstellt. "12.02.2025" ist der Zeitpunkt der Vorhersage und "24.05.2025" der [vorhergesagte Zeitpunkt](#predictedTime).',
        tags: ['prediction']
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

Die praktische Anwendung des Benchmark-Systems erfolgt über Skriptabläufe, die einen automatisierten Tagesabgleich der Modelleistungen ermöglichen. Diese können über die Weboberfläche eingesehen werden. Außerdem können die Benchmark Scores verwendet werden, um beispielsweise bei der Modellfusionierung die Aussagen einzelner Modelle auf Basis ihres durchschnittlichen historischen Benchmark Scores zu gewichten.`,
        tags: ['prediction', 'benchmarking']
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

Die Interpretation der Ergebnisse von Meta-Forecasts erfordert ein tiefes Verständnis der zugrunde liegenden Modelle und Daten. Konfidenzwerte sollten nicht isoliert betrachtet werden, sondern im Kontext der historischen Leistung des Modells und der spezifischen Wetterbedingungen. Ein hoher Konfidenzwert bedeutet, dass das Modell basierend auf vergangenen Daten zuversichtlich ist, dass die Vorhersage genau ist, während ein niedriger Wert auf Unsicherheit hinweist. Es ist wichtig, Fehlerquellen zu identifizieren und zu berücksichtigen, wie z.B. unvollständige oder fehlerhafte Daten, Modellannahmen oder externe Einflüsse. Zudem sollten Trends und Muster in den Konfidenzwerten über die Zeit analysiert werden, um systematische Fehler oder Verbesserungspotenziale zu erkennen. Letztlich sollten die Ergebnisse der Meta-Forecasts immer in Kombination mit anderen Wetterdaten und -modellen betrachtet werden, um eine umfassende und zuverlässige Wettervorhersage zu gewährleisten.`,
        tags: ['prediction', 'forecasting']
    },
    fogDays: {
        title: 'Nebeltag',
        text: 'Ein Nebeltag liegt laut dem Deutschen Wetterdienst vor, wenn die horizontale Sichtweite an einem Tag in einem Bereich von mindestens 90 Grad zeitweise unter 1 Kilometer sinkt.\n\nhttps://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv3=101878&lv2=101812',
        tags: ['weather']
    },
    ACCESS_G: {
        title: 'ACCESS-G',
        text: '[ACCESS-G](http://www.bom.gov.au/nwp/doc/access/NWPData.shtml) vom australischen Bureau of Meteorology (BOM). Bietet eine Auflösung von 15 km mit einer Vorhersagedauer von 10 Tagen und Aktualisierungen alle 6 Stunden.',
        tags: ['weather model']
    },

    ARPEGE_AROME: {
        title: 'ARPEGE & AROME',
        text: '[ARPEGE](https://www.umr-cnrm.fr/spip.php?article121&lang=en) & [AROME](https://www.umr-cnrm.fr/spip.php?article120&lang=fr) von Météo-France aus Frankreich. Bieten eine Auflösung von 11-25 km, 4-tägige Vorhersagen und Aktualisierungen alle 6-12 Stunden.',
        tags: ['weather model']
    },

    GEM: {
        title: 'GEM',
        text: '[GEM](https://docs.unidata.ucar.edu/ldm/current/basics/feedtypes/gem.html) vom Canadian Weather Service aus Kanada. Bietet eine Auflösung von 15 km mit 10-tägigen Vorhersagen und Aktualisierungen alle 12 Stunden.',
        tags: ['weather model']
    },

    GFS_HRRR: {
        title: 'GFS & HRRR',
        text: '[GFS & HRRR](https://www.nco.ncep.noaa.gov/pmb/products/gfs/) von NOAA aus den Vereinigten Staaten. Bieten eine Auflösung von 3-25 km mit 16-tägigen Vorhersagen und Aktualisierungen alle 3 Stunden.',
        tags: ['weather model']
    },

    GFS_GRAPES: {
        title: 'GFS GRAPES',
        text: '[GFS GRAPES](https://www.cma.gov.cn/en/forecast/highlight/202311/t20231117_5892086.html) von der chinesischen Wetterbehörde (CMA). Bietet eine Auflösung von 15 km mit 10-tägigen Vorhersagen und Aktualisierungen alle 6 Stunden.',
        tags: ['weather model']
    },

    GSM: {
        title: ' GSM',
        text: '[GSM](https://www.jma.go.jp/jma/en/NMHS/table/spec_GSM.pdf) von der japanischen Wetteragentur (JMA). Bietet eine Auflösung von 55 km, 11-tägige Vorhersagen und Aktualisierungen alle 6 Stunden.',
        tags: ['weather model']
    },

    HARMONIE_DMI: {
        title: 'HARMONIE (DMI)',
        text: '[HARMONIE (DMI)](https://opendatadocs.dmi.govcloud.dk/Data/Forecast_Data_Weather_Model_HARMONIE_DINI_IG) vom dänischen Wetterdienst (DMI). Bietet eine Auflösung von 2 km, 2,5-tägige Vorhersagen und Aktualisierungen alle 3 Stunden.',
        tags: ['weather model']
    },

    HARMONIE_KNMI: {
        title: 'HARMONIE (KNMI)',
        text: '[HARMONIE (KNMI)](https://dataplatform.knmi.nl/dataset/harmonie-arome-cy43-p3-1-0) vom niederländischen Wetterdienst (KNMI). Bietet eine Auflösung von 2 km mit 2,5-tägigen Vorhersagen und stündlichen Aktualisierungen.',
        tags: ['weather model']
    },

    ICON_D2: {
        title: 'ICON D2',
        text: '[ICON D2](https://open-meteo.com/en/docs/dwd-api) vom Deutschen Wetterdienst (DWD). Deckt Mitteleuropa mit ~2 km Auflösung ab, liefert 2-tägige Vorhersagen und wird alle 3 Stunden aktualisiert.',
        tags: ['weather model']
    },

    ICON_Europe: {
        title: 'ICON Europe',
        text: '[ICON Europe](https://open-meteo.com/en/docs/dwd-api) vom Deutschen Wetterdienst (DWD). Deckt Europa mit ~7 km Auflösung ab, bietet 5-tägige Vorhersagen und Aktualisierungen alle 3 Stunden.',
        tags: ['weather model']
    },

    ICON_Global: {
        title: 'ICON Global',
        text: '[ICON Global](https://open-meteo.com/en/docs/dwd-api) vom Deutschen Wetterdienst (DWD). Weltweite Abdeckung mit ~11 km Auflösung, 7,5-tägigen Vorhersagen und Aktualisierungen alle 6 Stunden.',
        tags: ['weather model']
    },

    IFS_AIFS: {
        title: 'IFS & AIFS',
        text: '[IFS & AIFS](https://www.ecmwf.int/en/forecasts/datasets/open-data) vom Europäischen Zentrum für mittelfristige Wettervorhersage (ECMWF). Bietet 25-28 km Auflösung mit 15-tägiger Vorhersagedauer und Aktualisierungen alle 6 Stunden.',
        tags: ['weather model']
    },

    UKMO: {
        title: 'UKMO',
        text: '[UKMO](https://open-meteo.com/en/docs/ukmo-api) vom britischen Wetterdienst UK Met Office. Bietet eine Auflösung von 10 km, 7-tägige Vorhersagen und Aktualisierungen alle 6 Stunden.',
        tags: ['weather model']
    },

    capeIndex: {
        title: 'CAPE-Gewitterindex',
        text: 'Der CAPE-Wert (Convective Available Potential Energy) beschreibt laut dem Deutschen Wetterdienst die in der Atmosphäre verfügbare Energie für konvektive Prozesse. Je höher die Temperaturdifferenz zwischen einem aufsteigenden Luftpaket und der Umgebungsluft sowie der Feuchtegehalt in Bodennähe, desto größer ist der CAPE-Wert - und damit das Potenzial für Gewitter. Werte über 2000 J/kg gelten als Hinweis auf mögliche Unwetter.\n\nhttps://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv3=100534&lv2=100510',
        tags: ['weather']
    },

    weatherStationKonstanz: {
        title: 'DWD Wetterstation Konstanz',
        text: 'Die Wetterstation Konstanz des Deutschen Wetterdienstes (DWD) befindet sich am Silvanerweg 6, 78464 Konstanz, Baden-Württemberg, Deutschland. Sie liegt auf etwa 444 Metern über dem Meeresspiegel und erfasst verschiedene meteorologische Messwerte:\n\n- Lufttemperatur\n- Luftfeuchtigkeit\n- Luftdruck\n- Windgeschwindigkeit und -richtung\n- Niederschlagsmenge\n- Sonnenscheindauer\n- Taupunkt\n- Sichtweite\n- Wetterzustand (z. B. bewölkt, Regen)\n\n**Messverfahren:**\nTemperatur: Messung in 2 m Höhe über natürlichem Untergrund mittels Thermometer in einem belüfteten Wetterschutzgehäuse.\nLuftfeuchtigkeit: Gemessen mit einem Hygrometer in 2 m Höhe. Die relative Feuchte wird aus Temperatur und Taupunkt berechnet.\nTaupunkt: Gibt die Temperatur an, bei der die Luft mit Wasserdampf gesättigt ist.\n\nDie Messwerte werden in kurzen Intervallen erfasst und online veröffentlicht.\n\nhttps://offenedaten-konstanz.de/dataset/historische-wetterdaten/resource/fc407b6f-8d68-48f5-9d68-e66cf84c06f3#{}',
        tags: ['weather', 'station']
    },

    dwdDescription: {
        title: 'Deutscher Wetterdienst (DWD)',
        text: 'Der Deutsche Wetterdienst (DWD) ist die nationale meteorologische Behörde Deutschlands und dem Bundesministerium für Digitales und Verkehr unterstellt. Er sorgt für die meteorologische Grundversorgung in Bereichen wie Verkehr, Katastrophenschutz, Energie, Landwirtschaft und öffentlicher Sicherheit. Grundlage seiner Arbeit ist das Gesetz über den Deutschen Wetterdienst.\n\nDer DWD betreibt eines der weltweit dichtesten meteorologischen Beobachtungsnetze zu Land, zu Wasser, in der Luft und aus dem All. Dieses Netz umfasst über 2.000 Bodenstationen, Wettersatelliten, Radaranlagen, Windprofiler, automatische Bojen, Messschiffe, Wetterballone und Flugzeugdaten. Die gesammelten Daten fließen in moderne Vorhersagemodelle ein, die mit Hilfe von Hochleistungsrechnern verarbeitet werden.\n\nZu den Kernaufgaben gehören: die Wetter- und Unwettervorhersage, die Ausgabe amtlicher Warnungen, die Überwachung von Klimaänderungen, die Messung der atmosphärischen Radioaktivität sowie die Unterstützung der Luft- und Seefahrt. Für Flughäfen betreibt der DWD eigene Flugwetterwarten mit präzisen Messsystemen für Wind, Sichtweite und Blitzaktivität.\n\nIm Bereich der Klimaforschung analysiert der DWD langfristige Wetterdaten, betreibt Klimareferenzstationen und beobachtet den Zustand urbaner und ländlicher Räume. Er stellt seine Daten in weiten Teilen als Open Data zur Verfügung. Auch die phänologische Beobachtung von Pflanzen und deren Reaktion auf Klimaveränderungen gehört zu seinem Aufgabenbereich.\n\nInternational ist der DWD stark vernetzt: Er vertritt Deutschland in Organisationen wie der Weltorganisation für Meteorologie (WMO), EUMETSAT und dem Europäischen Zentrum für mittelfristige Wettervorhersage (EZMW/ECMWF). Zudem ist er an internationalen Forschungsprogrammen beteiligt und koordiniert Teile des globalen Wetterbeobachtungssystems.\n\nhttps://www.bmv.de/DE/Themen/Digitales/Angewandte-Raumfahrt-und-Meteorologie/Deutscher-Wetterdienst/deutscher-wetterdienst.html\n\nhttps://www.dwd.de/SharedDocs/broschueren/DE/presse/messnetz_pdf.pdf;jsessionid=B2D25F579C8A3AED13BC9CC400C8618D.live11044?__blob=publicationFile&v=7',
        tags: ['data', 'institution']
    },

    meteoblueDescription: {
        title: 'meteoblue',
        text: 'meteoblue ist ein Schweizer Wetterdienst, der weltweit präzise Wetterprognosen anbietet. Durch die intelligente Verknüpfung von über 25 Wettermodellen mit aktuellen Mess- und Beobachtungsdaten wird eine außergewöhnlich hohe Vorhersagegenauigkeit erzielt - mit zeitlichen Auflösungen von 15 Minuten bis zu mehreren Tagen im Voraus.\n\nDie Wetterdaten stammen aus verschiedenen Quellen, darunter internationale Wetterdienste, Satellitenbeobachtungen, eigene Modellläufe und Reanalysen wie NEMSGLOBAL oder ERA5. Diese vielfältigen Informationen werden mithilfe moderner Datenassimilation und Nachbearbeitungstechniken wie statistischer Korrektur, Nowcasting, maschinellem Lernen und Modellvergleich laufend verbessert. Zusätzlich fließen geografische Informationen wie Topografie, Bodentypen, Landnutzung und Bevölkerungsverteilung in die Analyse ein.\n\nEin weiteres Alleinstellungsmerkmal von meteoblue ist die grafische Aufbereitung von Wetterdaten. Die animierte Windkarte, eingeführt im Jahr 2006, gilt als Meilenstein in der Wettervisualisierung. Heute bietet meteoblue mehr frei zugängliche Wetterkarten als jeder andere Anbieter, einschließlich globaler Satelliten-Overlays.\n\nNeben Wettervorhersagen stellt meteoblue auch umfassende Klimadienste bereit, etwa zur Analyse von Klimarisiken, langfristigen Entwicklungen und Zukunftsszenarien auf Basis historischer Daten. Über die leistungsfähige Wetter-API kann auf eine der größten Wetterdatenbanken weltweit zugegriffen werden. Diese lässt sich einfach in Webseiten, Systeme oder Anwendungen integrieren und bietet Daten in zahlreichen Formaten inklusive fertiger Visualisierungen.\n\nhttps://content.meteoblue.com/de',
        tags: ['data', 'institution']
    },


    pegelonlineDescription: {
        title: 'PEGELONLINE',
        text: 'PEGELONLINE ist ein kostenfreier Online-Dienst der Wasserstraßen- und Schifffahrtsverwaltung des Bundes (WSV), der aktuelle hydrologische Rohdaten wie Wasserstände, Abflüsse und weitere Umweltparameter von über 660 Pegeln an Bundeswasserstraßen bereitstellt. Die Plattform liefert Messwerte nahezu in Echtzeit: Küstenpegel werden minütlich, Binnenpegel in 15-Minuten-Intervallen aktualisiert. Alle veröffentlichten Daten sind ungeprüfte Rohwerte, die direkt von den zuständigen Messstationen stammen und maximal 30 Tage rückwirkend verfügbar sind.\n\nPEGELONLINE erhält seine Daten ausschließlich von den Pegeln an Bundeswasserstraßen. Werte aus Landesmessnetzen sind nicht enthalten. Die Daten werden durch die zuständigen Wasserstraßen- und Schifffahrtsämter (WSÄ) geliefert und über das ITZBund technisch betrieben. Zusätzlich zu den Rohdaten stehen vielfältige Webservices wie REST-APIs, Web Map Services und XML-Schnittstellen zur Verfügung, mit denen sich die Daten direkt in eigene Anwendungen integrieren lassen. \n\nDer Dienst wird von verschiedenen Nutzergruppen verwendet: von der Schifffahrt über den Katastrophenschutz bis hin zu Forschung, Medien und Privatpersonen. Besonders bei Hochwasserlagen ist PEGELONLINE eine zentrale Informationsquelle, mit Zugriffszahlen von bis zu 1.000 Anfragen pro Sekunde.\n\nWeitere Informationen:\nhttps://www.pegelonline.wsv.de/gast/start\nhttps://www.itzbund.de/DE/itloesungen/fachverfahren/pegelonline/pegelonline.html',
        tags: ['data', 'institution']
    },

    lubwDescription: {
        title: 'Landesanstalt für Umwelt Baden-Württemberg (LUBW)',
        text: 'Die LUBW ist eine öffentliche Einrichtung mit Sitz in Karlsruhe, die dem Ministerium für Umwelt, Klima und Energiewirtschaft Baden-Württemberg untersteht. Sie unterstützt die Landesregierung sowie Behörden mit fachlicher Expertise in Bereichen wie Umwelt-, Natur- und Strahlenschutz, technischem Arbeitsschutz sowie Anlagen- und Produktsicherheit.\n\nDie LUBW erhebt landesweit Umweltmessdaten und analysiert Luft, Wasser und Boden. Diese Informationen werden aufbereitet und der Öffentlichkeit zur Verfügung gestellt, unter anderem über den interaktiven Kartendienst UDO (Umwelt-Daten und -Karten Online). UDO bietet freien Zugang zu digitalen Umweltkarten und Daten, die aus eigenen Messprogrammen und dem Informationsverbund anderer Umweltbehörden stammen.\n\nDie LUBW erfüllt mit diesem Dienst die Anforderungen des Umweltverwaltungsgesetzes von Baden-Württemberg (UVwG).\n\nhttps://um.baden-wuerttemberg.de/de/ministerium/aufgaben-organisation/nachgeordnete-dienststellen/landesanstalt-fuer-umwelt-baden-wuerttemberg/\n\nhttps://udo.lubw.baden-wuerttemberg.de/public/',
        tags: ['institution', 'data']
    },

    cloudCover: {
        title: 'Bewölkung',
        text: 'Die Bewölkung beschreibt den Anteil des Himmels, der mit Wolken bedeckt ist, angegeben in Prozent von 0 % (wolkenlos) bis 100 % (komplett bedeckt). In den Vorhersagen wird die Bewölkung entweder als Gesamtbedeckung oder aufgeschlüsselt nach Höhenstufen angegeben: tiefe Wolken (0-2 km), mittelhohe Wolken (2-7 km) und hohe Wolken (5-13 km), entsprechend den Definitionen der WMO.\n\nDie angegebenen Werte beziehen sich auf Mittelwerte über bestimmte Zeitabschnitte hinweg. Auch wenn z. B. alle drei Schichten jeweils 50 % Bedeckung zeigen, kann der Himmel in Summe nahezu vollständig bedeckt erscheinen. Bewölkungsdaten sind wichtig für viele Anwendungen, u. a. in der Luftfahrt, Astronomie, Solarenergie und für allgemeine Wetterplanung.\n\nDer tatsächliche Einfluss der Bewölkung hängt nicht nur vom Prozentwert ab, sondern auch von Wolkentyp, Dichte und Höhe. So kann eine 50 % Bedeckung mit tiefen Wolken deutlich mehr Sonnenstrahlung blockieren als 100 % hohe Cirruswolken. Tagsüber wirken Wolken kühlend, nachts hingegen isolierend, da sie Wärmestrahlung zurückhalten. Eine präzise Wolkenvorhersage ist deshalb entscheidend für Temperatur- und Niederschlagsprognosen.\n\nDie Messung erfolgt über Satelliten, Bodensensoren und visuelle Beobachtungen - etwa mit METAR-Codes, die eine 8-stufige Skala verwenden. Die genaue Erkennung von Wolkenschichten ist besonders bei lokalen Phänomenen wie Nebel oder flachen Stratuswolken technisch anspruchsvoll.\n\nMehr Informationen:\nhttps://content.meteoblue.com/de/forschung-bildung/spezifikationen/wettervariablen/wolken',
        tags: ['weather']
    },

    devpoint: {
        title: '2 m Taupunkttemperatur',
        text: 'Die 2 m Taupunkttemperatur ist die Temperatur, auf die die Luft in 2 Metern Höhe über dem Erdboden abkühlen müsste, damit Sättigung eintritt (relative Luftfeuchte von 100 %). Sie ist ein direktes Maß für den Feuchtegehalt der Luft und dient zusammen mit Temperatur und Druck zur Berechnung der relativen Luftfeuchtigkeit.\n\nDer Wert wird modellseitig durch Interpolation zwischen der Erdoberfläche und dem untersten Modellniveau bestimmt, unter Berücksichtigung der aktuellen atmosphärischen Bedingungen. Die Einheit ist Kelvin (K), zur Umrechnung in Grad Celsius zieht man 273,15 ab.\n\nDie Taupunkttemperatur wird in der Wettervorhersage genutzt, um z. B. das Wohlfühlklima, die Nebelneigung oder das Gewitterrisiko einzuschätzen.\n\nMehr Informationen:\nhttps://codes.ecmwf.int/grib/param-db/168',
        tags: ['weather', 'humidity']
    },

    evapotranspiration: {
        title: 'Evapotranspiration',
        text: 'Die Evapotranspiration beschreibt die gesamte Wassermenge, die aus Böden und Pflanzen in die Atmosphäre gelangt, durch Verdunstung (Evaporation) von Oberflächen und durch die Abgabe von Wasser über Pflanzen (Transpiration). Sie ist ein zentraler Bestandteil des Wasserkreislaufs und zeigt, wie viel Feuchtigkeit aus der Landoberfläche verloren geht.\n\nBesonders in der Landwirtschaft ist dieser Wert entscheidend, um den Wasserbedarf von Pflanzen besser einschätzen und die Bewässerung gezielter planen zu können, vor allem in trockenen Regionen. Da Evapotranspiration Energie benötigt, kühlt sie die Umgebung. Dieser Effekt ist vergleichbar mit der Verdunstung von Wasser auf der Haut an einem heißen Tag. Solche Temperaturunterschiede können mit Infrarotsensoren per Satellit erfasst werden.\n\nIn Deutschland definiert der Deutsche Wetterdienst die Evapotranspiration als die gesamte Verdunstung von natürlich bewachsenen Bodenflächen. Sie wird mit speziellen Messgeräten, sogenannten Lysimetern, erfasst.\n\nQuellen:\nNASA: https://www.nasa.gov/missions/landsat/evapotranspiration-watching-over-water-use/\nDWD: https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv3=100776&lv2=100652',
        tags: ['weather']
    },

    freezingLevel: {
        title: 'Nullgradgrenze',
        text: 'Die Nullgradgrenze bezeichnet die Höhe in der Atmosphäre, bei der die Temperatur genau 0 °C (32 °F bzw. 273,15 K) beträgt - also der Punkt, an dem Wasser gefriert. Sie trennt typischerweise Regen in tieferen Lagen von Schnee in höheren Lagen und ist besonders relevant für Bergwetter, Wintersport und die Luftfahrt.\n\nDie Höhe der Nullgradgrenze ist nicht überall gleich: In kalten Regionen oder im Winter kann sie nahe der Erdoberfläche oder sogar darunter liegen, während sie in warmen oder trockenen Regionen mehrere Kilometer über dem Boden erreichen kann. Sie verändert sich auch im Tagesverlauf durch Wettereinflüsse wie Luftfeuchtigkeit, Luftdruck oder Frontensysteme.\n\nIn Wettergrafiken wird die Nullgradgrenze oft als Linie dargestellt, die zwischen Regen- und Schneezonen unterscheidet. Besonders in Skigebieten oder bei der Flugplanung hilft diese Information, Wetterlagen besser zu beurteilen.\n\nQuellen:\n- Windy.app: https://windy.app/blog/what-is-freezing-level-chart.html\n- meteoblue: https://content.meteoblue.com/en/research-education/specifications/weather-variables/temperatures',
        tags: ['weather']
    },

    humidity: {
        title: 'Luftfeuchtigkeit',
        text: 'Luftfeuchtigkeit beschreibt den Anteil an Wasserdampf in der Atmosphäre. Man unterscheidet zwischen absoluter Feuchtigkeit (Gramm pro Kubikmeter Luft), spezifischer Feuchtigkeit (Gramm pro Kilogramm Luft) und der relativen Feuchtigkeit, also dem Prozentsatz an Wasserdampf, den die Luft im Vergleich zu ihrem maximal möglichen Gehalt bei gegebener Temperatur enthält.\n\nDaten zur Luftfeuchtigkeit sind entscheidend, um Wetterprozesse und ökologische Zusammenhänge besser zu verstehen. Sie helfen z. B. bei der Vorhersage von Gewittern, der Einschätzung von Boden- und Waldfeuchte, der Bewertung der Luftqualität sowie bei der Berechnung von Eisbildung.\n\nQuelle: NASA Earthdata - https://www.earthdata.nasa.gov/topics/atmosphere/humidity',
        tags: ['humidity', 'weather']
    },

    soilMoisture: {
        title: 'Bodenfeuchte',
        text: 'Bodenfeuchte bezeichnet den Wassergehalt im nicht gesättigten Teil des Bodens. Sie ist ein zentraler Parameter in Meteorologie, Hydrologie und Landwirtschaft, da sie den Austausch von Energie und Wasser zwischen Boden und Atmosphäre beeinflusst.\n\nGemessen wird Bodenfeuchte durch Sensoren im Boden, Gravimetrie, Lysimeter oder Fernerkundung via Satellit (z. B. SMAP, SMOS). Diese Daten helfen bei der Vorhersage von Dürren, in der Bewässerungsplanung und zur Verbesserung von Klima- und Wettermodellen.\n\nQuelle: Climate Data Guide - https://climatedataguide.ucar.edu/climate-data/soil-moisture-data-sets-overview-comparison-tables',
        tags: ['weather']
    },

    sunshineDuration: {
        title: 'Sunshine Duration',
        text: 'Sunshine duration refers to the total time during which direct solar radiation at the Earth’s surface exceeds 120 W/m², typically under clear skies after sunrise or before sunset. This parameter helps assess climate, agricultural productivity, and solar energy potential.\n\nIt is commonly measured using a Campbell-Stokes sunshine recorder, which focuses sunlight through a glass sphere onto a special blue card. As the sun moves, it burns a trace into the card. The total length of these burn marks, measured with a plastic scale, indicates the sunshine duration. Different card types are used depending on the season.\n\nThe device is typically mounted at a fixed height and aligned according to geographic latitude to ensure accurate solar tracking.\n\nSource: Ahmad et al. (2017). Experimental Agrometeorology: A Practical Manual. https://doi.org/10.1007/978-3-319-69185-5_6',
        tags: ['weather']
    },

    vpd: {
        title: 'Dampfdruckdefizit (VPD)',
        text: 'Das Dampfdruckdefizit (Vapor Pressure Deficit, VPD) beschreibt die Differenz zwischen dem tatsächlichen Wasserdampfdruck in der Luft und dem maximal möglichen (Sättigungsdampfdruck) bei gegebener Temperatur. Mit steigender Temperatur nimmt die Fähigkeit der Luft zu, Wasserdampf aufzunehmen, und damit auch der Sättigungsdampfdruck. Ein hoher VPD-Wert bedeutet, dass die Luft relativ trocken ist und mehr Wasser aus Boden und Pflanzen aufnehmen kann.\n\nVPD ist ein wichtiger Indikator für atmosphärische Trockenheit und steht in direktem Zusammenhang mit der Verdunstungsrate und dem Wasserstress von Pflanzen. Ein hoher VPD zwingt Pflanzen dazu, mehr Wasser über die Wurzeln aufzunehmen, was zu Austrocknung oder Schäden führen kann.\n\nQuelle: Climate Signals - https://www.climatesignals.org/resources/explainer-what-vapor-pressure-deficit-vpd',
        tags: ['humidity', 'weather']
    },

    wetBulbTemperature: {
        title: 'Feuchtkugeltemperatur (Twb)',
        text: 'Die Feuchtkugeltemperatur ist die niedrigste Temperatur, die durch Verdunstungskühlung bei konstantem Druck erreicht werden kann. Sie wird gemessen, indem ein Thermometer mit einem feuchten Mullstreifen umwickelt und einem Luftstrom ausgesetzt wird. Durch die Verdunstung des Wassers entsteht eine Abkühlung, wodurch die angezeigte Temperatur niedriger ist als die Trocken­kugeltemperatur.\n\nDie Verdunstungsrate - und damit die Abkühlung - hängt von der Luftfeuchtigkeit ab: Je trockener die Luft, desto mehr Wasser verdunstet und desto niedriger fällt die Feuchtkugeltemperatur aus. Sie liegt immer zwischen der Trocken­kugeltemperatur und dem Taupunkt.\n\nDie Feuchtkugeltemperatur zeigt das Kühlungspotenzial der Luft an und ist ein wichtiger Parameter bei der Bewertung von Hitzebelastung, in der Klimatechnik sowie in der Wettervorhersage. In psychrometrischen Diagrammen verlaufen Linien konstanter Feuchtkugeltemperatur diagonal und ermöglichen Rückschlüsse auf den thermodynamischen Zustand feuchter Luft.\n\nQuelle: The Engineering Toolbox - https://www.engineeringtoolbox.com/dry-wet-bulb-dew-point-air-d_682.html',
        tags: ['weather', 'humidity']
    },

    windGusts: {
        title: 'Windböen',
        text: 'Windböen sind kurzfristige, starke Anstiege der Windgeschwindigkeit, die deutlich über dem Mittelwert liegen. Laut Weltorganisation für Meteorologie (WMO) handelt es sich um eine Böe, wenn ein signifikanter Sprung in der Windgeschwindigkeit auftritt. In den USA definiert der Wetterdienst (NWS) eine Böe ab etwa 30 km/h mit einem Unterschied von mindestens 17 km/h zwischen Maximum und Minimum innerhalb von weniger als 20 Sekunden.\n\nGemessen werden Windböen mit Anemometern - entweder klassisch mit drehenden Bechern oder präzise mit Ultraschallsensoren. Ursachen sind Turbulenzen durch Gelände oder Gebäude, Windscherungen bei Gewittern, thermische Aktivität an sonnigen Tagen, sowie Wetterfronten oder starke Wetterlagen wie Stürme und Hurrikane. Auch Gebirgszüge können Böen verstärken.\n\nWindböen sind nicht nur lästig, sondern stellen auch ein Risiko dar,  insbesondere für Schifffahrt und Outdoor-Aktivitäten. Deshalb ist es wichtig, Windwarnungen zu beachten und sich vorab über die Wetterlage zu informieren.\n\nQuelle: GeoScience Blog - https://geoscience.blog/defining-wind-gusts-understanding-sudden-spikes-in-wind-speed/',
        tags: ['weather']
    },

    weatherCodeWW: {
        title: 'Wettercode (WW)',
        text: 'Der "WW"-Code aus der WMO-Codetabelle 4677 beschreibt aktuelle oder kürzlich beobachtete Wetterbedingungen an bemannten Wetterstationen. Die zweistelligen Codes reichen von 00 bis 99 und decken eine Vielzahl meteorologischer Phänomene ab - darunter Nebel, Regen, Schnee, Gewitter, Sandstürme und mehr. Sie ermöglichen eine standardisierte und präzise Beschreibung von Wetterereignissen weltweit.\n\nBeispiele:\n- Codes 00-19 kennzeichnen kein Niederschlag, ggf. mit Nebel, Staub oder Blitzen.\n- 20-29 stehen für kürzlich aufgetretene, aber aktuell nicht mehr aktive Wetterereignisse.\n- 30-39 beschreiben Sand- oder Staubstürme sowie verwehten Schnee.\n- 40-49 erfassen Nebel oder Eisnebel mit Informationen zur Sicht.\n- 50-99 beschreiben aktiven Niederschlag, einschließlich Schauer, Eisregen und Gewitter.\n\nDas WW-Codesystem ist besonders relevant für die Luftfahrt, die meteorologische Überwachung und den internationalen Wetteraustausch.\n\nQuelle: WMO Code Table 4677 https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM',
        tags: ['weather']
},

}