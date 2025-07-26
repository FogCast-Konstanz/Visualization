export type phenomenaType = { title: string, description: string, content: { title: string, text: string }[], sources: string, id: string }

const fog: phenomenaType = {
    id: 'fog',
    title: 'Fog',
    description: 'Fog is formed by condensation when the air is saturated, facilitated by cooling, humidity or mixing of air. The main types are advection, radiation, evaporation, orographic and mixed fog. The Lake Constance region favours the formation of fog due to its water surface, mountains and wind systems, especially in autumn and winter. Fog is dispersed by solar radiation or wind.',
    content: [
        {
            title: "Explanation",
            text: `
Fog occurs when water droplets or ice crystals in the lower atmospheric layers reduce visibility to less than 1 kilometre. Depending on visibility, a distinction is made between light (500-1000 m), moderate (200-500 m) and heavy fog (< 200 m) (cf. Bott 2023, p. 450).

![Picture](/assets/phenomena/2025-02-17_SAMANTHA_ISTED_1.jpg "Photo from Samantha Isted")

## Physical formation processes

The basic requirement for fog to form is for the air to reach a state of saturation. This can be achieved by:
* Cooling to the dew point: Often at night when the earth's surface cools due to infrared radiation.
* Addition of moisture: For example, by evaporation of water from the ground.
* Mixing of different air masses: A typical example is the interaction of warm air over Lake Constance with cool air from the surrounding mountains (cf. Bott 2023, p. 450).

## The main types of fog are:
1. **Advection fog**: Occurs when warm, moist air flows over a cold surface, cooling the lower layers of air and causing fog to form. This type of fog is often observed in coastal regions and over large lakes such as Lake Constance.
2. **Radiation fog**: Forms on clear, windless nights due to the strong cooling of the earth's surface. This fog is particularly common in valleys and sheltered regions, as is often the case around Lake Constance.
3. **Orographic fog**: Formed when rising air cools and condenses on mountains. Local wind systems favour its formation, but can also dissipate it quickly.
4. **Evaporation fog**: Formed when cold air flows over warm water surfaces, especially around Lake Constance during the cold season.
5. **Mixed fog**: Forms when two undersaturated air masses mix and become saturated (cf. Bott 2023, p. 450 - 451).
`
        }, {
            title: 'Reference to Lake Constance',
            text: `
![Picture](/assets/phenomena/me_SAMANTHA_ISTED_1-2.jpg "Foto von Samantha Isted")


Lake Constance favours the formation of fog:
* Large water surface: The lake ensures a constant supply of moisture in the air, which favours the formation of fog, especially in autumn and winter.
* Geographical position: The surrounding mountains create ideal conditions for radiation and mixed fog by trapping cold air masses.
* Local wind systems: These contribute to the distribution of humidity and temperature variations, which favour the formation of advection and evaporation fog.

## Temporal variations 
The Lake Constance region has an increased frequency of fog in autumn and winter, when the temperature differences between water and land are greatest. These differences are particularly conducive to the formation of advection and radiation fog (cf. Bott 2023, p. 450).  

## Fog dissipation 

Fog usually dissipates as a result of:
* Solar radiation: Solar radiation warms the ground, causing the water droplets to evaporate.
* Turbulent mixing: Fog can be dispersed from below, especially by wind (cf. Bott 2023, p. 451-452). 
* Due to its specific topography and climatic conditions, the Lake Constance region offers ideal conditions for the formation of different types of fog. Lake Constance itself plays a central role as a source of humidity and a temperature regulator.
`
        }, {
            title: 'Data Analysis',
            text: `
## Historical development 
The temporal development of fog in the Lake Constance region has changed significantly in recent decades. Since the 1980s, the annual fog hours have decreased from 400-600 hours to less than 400 and in some cases even less than 200 hours. At the same time, the number of fog days has decreased by about 10% over the last decade. 
These changes are due to several factors. Climate change has increased average temperatures by about 2 degrees, which means that warmer air can hold more water vapour without condensing into fog. At the same time, the reduction in air pollution has reduced the number of condensation nuclei, making it more difficult for fog to form. In addition, stronger winds in low-pressure systems disperse fog more frequently and shorten its duration (see Kumbier 2023).

To get further information about the fog development over the last few years, see here: [Fog](/data?tab=fog)
`
        }
    ],
    sources: `
* Bott, A. (2023a). Mesoskalige meteorologische Prozesse. In A. Bott, Synoptische Meteorologie (S. 431-456). Springer Berlin Heidelberg. https://doi.org/10.1007/978-3-662-67217-4_12
* Kumbier, A. (2023, Januar 22). Trübe Suppe? Die Nebeltage am Bodensee werden weniger. https://www.schwaebische.de/regional/bodensee/friedrichshafen/truebe-suppe-die-nebeltage-am-bodensee-werden-weniger-1324973
`
};

// const schwäbisches_meer_effekt: phenomenaType = {
//     id: 'schwäbisches-meer',
//     title: 'Schwäbisches Meer Effekt',
//     description: '...',
//     content: [

//     ],
//     sources: ``
// };

const windsysteme: phenomenaType = {
    id: 'windsysteme',
    title: 'Wind systems',
    description: 'The main wind systems at Lake Constance are the foehn, the bise, the valley wind, the mountain wind and the land-sea wind circulation. The foehn is a warm, dry downslope wind over the Alps that causes sudden temperature rises and clear visibility, while the bise is a cold north-easterly wind that affects Lake Constance with high wind speeds, especially in winter. Valley and mountain winds are caused by daily temperature differences between mountains and lowlands, and the land-sea wind circulation alternates between sea and land breezes during the day.',
    content: [
        {
            title: "Windsystems at Lake Constanze",
            text: `
![Picture](/assets/phenomena/2021-07-18_SAMANTHA_ISTED_1.jpg "Foto von Samantha Isted")

## Foehn:

The foehn is a warm, dry downslope wind that blows over the Alps from the south. It can be sudden and often brings clear skies and high temperatures.

The foehn occurs when air from the south is pushed towards the Alps. The air rises on the mountains (windward side) and cools down, forming dense clouds and precipitation. Once the air flows over the main Alpine ridge and enters the sinking area (leeward side), the cloud cover quickly dissipates. The descending air is usually very dry after the loss of water on the windward side and can cause a sudden rise in temperature of 10 K or more, resulting in deep blue skies and [unusual visibility](/phenomena/bergsicht) (cf. Deutscher Wetterdienst, n.d. a).

 \n 

## Bise:

Bise is a cold, dry wind that blows from the north-east. It occurs mainly in winter and often brings cold, clear weather conditions.

A special pressure pattern is required for bise to develop: an area of high pressure over northern Europe combines with an area of low pressure over the Mediterranean. This combination causes the air to flow over Switzerland from the north-east. Particularly in the Lake Geneva region, where the distance between the Alps and the Jura mountains is decreasing, this air is channelled through the bottleneck, resulting in extremely high wind speeds, sometimes exceeding 50 knots, in the lower layers.

![Picture](/assets/phenomena/2021-05-22_SAMANTHA_ISTED_1.jpg "Foto von Samantha Isted")
Lake Constance is also influenced by the Bise.  While the continental air is relatively dry in the summer and provides fine weather, it has a much higher moisture content in the cold season. This often results in a horizontal layer of warm, dry air above cooler, moist air, leading to the formation of [fog](/phenomena/fog) from which light rain or snow occasionally falls. This layer also hinders the vertical exchange of air, causing pollutants to accumulate near the ground (see Meteo Schweiz, 2015).

\n

## Valley and mountain winds

Valley winds occur when the air in the mountains is warmed by the sun more than in the lowlands, causing it to rise and the air pressure to drop. To compensate, cooler air flows through the valleys into the mountains. This phenomenon begins about 2-3 hours after sunrise and ends shortly after sunset (see Deutscher Wetterdienst, n.d. d).

In the evening, on the other hand, the mountain wind occurs when the mountain air cools down more than in the lowlands. The heavy cold air then flows from the slopes into the valley. The mountain wind starts about 2-3 hours after sunset and lasts until shortly after sunrise (see Deutscher Wetterdiens, n.d. b).

\n

## Land-sea wind circulation 

The land-sea wind circulation is a daily recurring wind system that occurs mainly on the coasts, but also on large inland lakes such as Lake Constance. During the day, the land warms up more than the water, causing cooler, more humid air to flow from the sea to the land (sea breeze). In the late afternoon, the gradient is reversed as the land cools faster and the air flows from the land to the water (land wind) (cf. Deutscher Wetterdienst, n.d. c).

            
            `
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
    title: 'Water level and floods',
    description: `Lake Constance's water level varies seasonally between about 285 and 410 cm, falling below 240 cm in winter and rising in spring and summer due to snowmelt. The maximum water level is 4.80 m, with an increase of 1 cm corresponding to about 5.36 million m³ of water; the daily record of 5.65 m was reached at Whitsun 1999, which was only surpassed in 1817 (6.23 m).`,
    content: [{
        title: "",
        text: `
![Picture](/assets/phenomena/Pegel_Konstanz_1817-1935.png "Vgl. Bodenseee.net, 2025")
![Picture](/assets/phenomena/Wasserstand_Konstanz.png "Vgl. Landesanstalt für Umwelt Baden-Württemberg, 2025")

## Annual fluctuation

The average annual water level fluctuates between about 285 and 410 cm between 1981 and 2024. In winter, the water level of Lake Constance is generally lower, as there is less precipitation and snowmelt. The water level can fall below 240 cm. In spring and summer, the water level rises due to snowmelt from the Alps and increased rainfall. From July to the following February, the water level falls.

## Flood levels

When the water level reaches more than 4.80 metres at the Konstanz gauge, Lake Constance is considered to be at flood level. The surface area of the lake is 536 km². A rise of 1 centimetre corresponds to an increase of 5.36 million cubic metres of water. At Whitsun 1999, the water level in Lake Constance rose by 47 cm in one day, reaching 5.65 metres - a record that was only surpassed in 1817 with 6.36 metres (see Anger, 2016).
`
    }, {
        title: 'Data',
        text: `
To get further information about the historic water level, see here: [Water Level](/data?tab=waterLevel)`}
    ],
    sources: `
*   Anger, J. (2016). _Hochwasser am Bodensee_. Von [https://www.dwd.de/DE/wetter/thema\_des\_tages/2016/6/24.html](https://www.dwd.de/DE/wetter/thema_des_tages/2016/6/24.html)
    
*   Bodenseee.net. (2025). _Pegel Konstanz Entwicklung_. Von Wasserstand Bodensee Historie: [https://www.bodenseee.net/pegel/](https://www.bodenseee.net/pegel/)
    
*   Landesanstalt für Umwelt Baden-Württemberg. (2025). Pegel Konstanz/Bodensee. Von [https://www.hvz.baden-wuerttemberg.de/pegel.html?id=00007&m=W](https://www.hvz.baden-wuerttemberg.de/pegel.html?id=00007&m=W)`
};

const bergsicht: phenomenaType = {
    id: 'bergsicht',
    title: 'Mountain View',
    description: 'A visibility of more than 50 kilometres is called exceptional visibility. It is a common side effect of the [Foehn](/phenomena/windsysteme), a warm, dry downslope wind that blows from south to north across the Alps. When the foehn occurs, it often brings a significant improvement in the weather and clear visibility, making the Alps visible from Lake Constance.',
    content: [{
        title: 'Lake Constanze Mountain View',
        text: `![Picture](/assets/phenomena/2021-03-30_SAMANTHA_ISTED_1.jpg "Foto von Samantha Isted")

Unusual visibility is a very clear view that often occurs after cold fronts or during foehn winds, when the dry, descending air reduces the suspended particles that would otherwise obstruct visibility. Unusual visibility is recorded from a visibility of more than 50 km, at high altitude stations only from 150 km or 200 km (cf. Deutscher Wetterdienst, n.d. b). 

[Foehn](/phenomena/windsysteme) occurs when air from the south is pressed against the Alps. The air rises on the mountains (windward side) and cools down, forming dense clouds and precipitation. Once the air flows over the main Alpine ridge and enters the sinking area (leeward side), the cloud cover quickly dissipates. After the loss of water on the windward side, the descending air is usually very dry and can cause a sudden rise in temperature of 10 K or more, resulting in deep blue skies and unusual visibility (see Deutscher Wetterdienst, n.d. a).`
    }],
    sources: `
*   Deutscher Wetterdienst. (kein Datum a). _Alpen-Süd-Föhn_. Abgerufen am 17. Februar 2025 von [https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?nn=103346&lv2=100072&lv3=100180](https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?nn=103346&lv2=100072&lv3=100180) 
    
*   Deutscher Wetterdienst. (kein Datum b). _Ungewöhnliche Fernsicht_. Abgerufen am 17. Februar 2025 von [https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv2=102828&lv3=102854](https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv2=102828&lv3=102854)`
};


const wolkenbildung: phenomenaType = {
    id: 'wolkenbildung',
    title: 'Cloud Formations',
    description: 'Clouds are made up of water droplets or ice crystals and are divided into ten main types with Latin names. Some special forms, such as Mammatus clouds or Kelvin-Helmholtz waves, occur in the Lake Constance region under special conditions such as thunderstorms or wind shear.',
    content: [
        {
            title: "Formation of Clouds",
            text: `
A cloud is a collection of tiny water droplets or ice crystals floating in the air, usually not contacting the ground. It can sometimes contain larger droplets or other particles such as dust or smoke (see World Meteorological Organisation, 2017a).
Clouds come in many forms and, like plants or animals, can be classified into a limited number of typical forms with Latin names for genera. Transitional forms are unstable and are rarely classified. There are also Special clouds and Upper atmospheric clouds (see World Meteorological Organisation, 2017b).

### Wolkengattungen 

![Wolkenarten](/assets/phenomena/clouds/Cloud_Types.png "Picture: Valentin de Bruyn 2021, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)") 

The classification of clouds consists of ten main groups called genera. Each observed cloud belongs to exactly one genus (see World Meteorological Organisation, 2017c). These are

* Stratus (St) 
* Stratocumulus (Sc)
* Cumulus (Cu)  
* Nimbostratus (Ns)
* Altostratus (As) 
* Altocumulus (Ac) 
* Cirrus (Ci) 
* Cirrocumulus (Cc)
* Cirrostratus (Cs) 
* Cumulonimbus (Cb)


(Vgl. Deutscher Wetterdienst, k. D. a).
`
        }, {
            title: "Clouds over Lake Constance",
            text: `
            
![center](/assets/phenomena/clouds/Stratus.png "Stratus - Photo: Simon A. Eugster, 2005, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)") 
![not center](/assets/phenomena/clouds/Stratocumulus.png "Stratocumulus - Photo: Simon A. Eugster, 2004, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)") 
## Stratus
            
Stratus is a grey layer of cloud with a uniform base from which drizzle, snow or sleet can fall. When the Sun (or Moon) is visible through it, the contours of the Stratus are clearly visible (see World Meteorological Organization, 2017c).

## Stratocumulus

These clouds appear as grey or whitish patches or layers in the sky. They are made up of round or elongated pieces such as clods, balls or rolls, often joined together. The clouds usually have dark areas and no fibrous structure. Many of the small cloud particles are regularly arranged and slightly larger than 5 degrees in the sky (see Deutscher Wetterdienst, n. d. b).


## Cumulus

Dissolved, usually dense and sharply defined clouds that develop vertically in the form of rising hills, domes or towers, often with a cauliflower-like bulging top. The parts of these clouds illuminated by the Sun are usually white, while their base is relatively dark and almost horizontal. Sometimes the Cumulus clouds are ragged (see World Meteorological Organisation, 2017e).
![center](/assets/phenomena/clouds/Cumulus.jpg "Cumulus - Photo: Samantha Isted") 
![not center](/assets/phenomena/clouds/Cumulonimbus.jpg "Cumulonimbus - Photo: Samantha Isted") 



## Cumulonimbus

A massive, thick cloud formation reaching impressive vertical heights, resembling a towering mountain or colossal structures. Its upper surface is often sleek, fibrous, or marked with streaks, typically appearing flattened. This section frequently spreads out like an anvil or a vast expanse of cloud (see World Meteorological Organisation, 2017e). Cumulonimbus clouds form in moist, unstable, rising air and can reach up to the tropopause (about 12 km high). They are made up of water droplets and ice crystals, are very large and often bring heavy precipitation, thunderstorms, hail and squalls (see Deutscher Wetterdienst, n. d. c).




## Mammatus clouds 
![center](/assets/phenomena/clouds/Mammatuswolken.jpg "Mammatuswolken - Photo: Samantha Isted") 

Mammatus clouds usually form in thunderclouds, but they can also form in other types of clouds. Their formation is not fully understood, but there are several theories. Turbulence, evaporation and cooling cause cold air to sink, resulting in bulges. Radiation processes and temperature differences in the anvil can also cause instability. As Mammatus clouds also occur in Cirrus clouds, it is likely that several different processes are involved, depending on the cloud type (see Fruntke, 2018). Mammatus clouds can form in Cirrus, Cirrocumulus, Altocumulus, Altostratus, Stratocumulus and Cumulonimbus (see World Meteorological Organisation, 2017g).

![not center](/assets/phenomena/clouds/Kelvin-Helmholtz-Wellen.png "Kelvin-Helmholtz-Wellen - Photo: GRAHAMUK, 2006, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)") 



## Kelvin-Helmholtz-Waves

Kelvin-Helmholtz waves are relatively short-lived wave formations, usually at the top of clouds, in the form of loops or breaking waves. Kelvin-Helmholtz waves occur when layers of air at different temperatures are set in motion by wind shear and form breaking waves as a sign of incipient mixing. They are rare, but can usually be seen over mountains or in special weather conditions such as Foehn. They occur mainly with Cirrus, Altocumulus, Stratocumulus, Stratus and occasionally Cumulus (cf. Hinz, 2022; World Meteorological Organisation, 2017h).

![center](/assets/phenomena/clouds/Altocumulus_Lenticularis.png "Altocumulus Lenticularis - Photo: Karlheinz Essl, 2015, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)") 


## Altocumulus Lenticularis

This type of altocumulus, also known as 'Foehn fish', occurs as lenticular patches on the lee side of mountains parallel to the ridge during foehn winds. The vertical extent does not usually exceed 200 m (cf. World Meteorological Organisation, 2017i; Deutscher Wetterdienst, n.d. d).
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
    title: 'Extreme weather',
    description: 'Various extreme weather events occur at Lake Constance, which are associated with heavy precipitation, snowstorms, high and low water, storms and exceptional periods of heat or cold. These events sometimes have a serious impact on nature, infrastructure and the population.',
    content: [
        {
            title: "Flood and low water",
            text: `
**Centennial Flood 1999**  
In 1999, Lake Constance experienced an extraordinaryd [flood](/phenomena/hochwasser), not only because of its intensity, but also because of its very early onset. 
The maximum level of the 1999 Lake Constance [flood](/phenomena/hochwasser) was 564 cm at the Constance gauge. This was the fourth highest [flood](/phenomena/hochwasser) since measurements began in 1816. The previous highest recorded level was 623 cm in 1817, followed by 576 cm in 1890 and 568 cm in 1821 (cf. Ostendorp & Jöhnk, 2003, p. 4).

The [flooding](/phenomena/hochwasser) of Lake Constance in 1999 can be explained by two main climatic factors: Firstly, in May and early June, intense heavy precipitation occurred in the pre-alpine and central alpine region, the main catchment area of Lake Constance. Secondly, temperatures in May were well above average, leading to early and intensive snowmelt in the Alps. The combination of these two factors (heavy precipitation and additional water inflow due to melting snow) led to an exceptionally rapid and massive inflow of water into the lake (cf. Ostendorp & Jöhnk, 2003, p. 3).

**Lowest water level of the century in 2003**  
In 2003, Lake Constance experienced an exceptionally [low water level](/phenomena/hochwasser), which was remarkable both in its extent and in its rarity. An exceptionally [low water level](/phenomena/hochwasser) was already evident in June 2003. By the end of August, the water level had reached an extremely low level, which statistically occurs only every 700 years or so. The reason for the exceptionally low water levels was the continuing drought and lack of rainfall in the Lake Constance catchment area. In contrast to the flood of 1999, which was caused by heavy precipitation and snowmelt, the low water level in 2003 was due to a prolonged dry period (cf. Ostendorp & Jöhnk, 2003, pp. 7-8).
`
        }, {
            title: "Storms",
            text: `**Winter storm „Lothar“ (December 1999)**  
Hurricane "Lothar" swept across northern France, southern Germany, and Switzerland, hitting the Lake Constance region with wind speeds exceeding 150 km/h. Numerous trees were uprooted, roofs damaged, and rail services disrupted (cf. Kaiko, 2021).

**Heavy Snowstorm (8. February 2013)**  
A case study of a snowstorm on 8 February 2013 shows that Lake Constance itself contributes to the formation of intense snow bands. The lake increased atmospheric instability due to warmer air masses over the water, leading to locally extreme snowfall of 36 mm in just 5 hours (cf. Umek & Gohm, 2016, p. 4687).

**Storm „Burglind“ (January 2018)**  
Storm "Burglind" caused severe damage to infrastructure and led to power outages in parts of the Lake Constance region (cf. Scherrer et al., 2018).`
        }, {
            title: "Extreme Temperatures",
            text: `
**Lake Constance Freeze, Winter 1962/63**  
In the winter of 1962/63, Germany experienced extreme cold with an average temperature of -5.5 °C, during which Lake Constance completely froze over, forming the country’s largest natural ice surface. The so-called "Seegfrörne" began early in November, peaked in January with temperatures below -20 °C, and lasted until March due to warm Föhn winds. The ice formed progressively, starting from the shallow Gnadensee to the deep Obersee, with ice thicknesses reaching up to one meter (cf. Deutscher Wetterdienst, 2013).

**Heat and Drought, Summer 2003**  
The summer of 2003 was the hottest ever recorded in Germany, with extreme temperatures above 40°C, especially in southern regions. The heat caused serious health issues, thousands of deaths, and widespread problems due to prolonged drought—rivers dried up, crops failed, and inland shipping came to a standstill in many areas. The cause was a persistent "Omega" weather pattern with a dominant high-pressure system over central Europe (cf. WetterOnline, 2013).`        }
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


export const enPhenomena = {
    phenomena: [
        fog,
        windsysteme,
        hochwasser,
        bergsicht,
        wolkenbildung,
        extremwetter
    ]
}
