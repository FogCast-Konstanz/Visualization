export type phenomenaType = { title: string, description: string, content: { title: string, text: string }[], sources: string, id: string }

const fog: phenomenaType = {
    id: 'fog',
    title: 'Fog',
    description: 'Fog is formed by condensation when the air is saturated, facilitated by cooling, humidity or mixing of air. The main types are advection, radiation, evaporation, orographic and mixed fog. The Lake Constance region favours the formation of fog due to its water surface, mountains and wind systems, especially in autumn and winter. Fog is dispersed by solar radiation or wind.',
    content: [
        {
            title: "Erklärung",
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

export const enPhenomena = {
    phenomena: [
        fog,
        windsysteme,
        hochwasser,
        bergsicht
    ]
}
