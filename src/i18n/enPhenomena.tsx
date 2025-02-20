export type phenomenaType = { title: string, description: string, content: { title: string, text: string }[], sources: string, id: string }

const fog: phenomenaType = {
    id: 'fog',
    title: 'Fog',
    description: '...',
    content: [],
    sources: `...`
};

const schwäbisches_meer_effekt: phenomenaType = {
    id: 'schwäbisches-meer',
    title: 'Schwäbisches Meer Effekt',
    description: '...',
    content: [

    ],
    sources: ``
};

const windsysteme: phenomenaType = {
    id: 'windsysteme',
    title: 'Wind systems',
    description: '...',
    content: [
        {
            title: "",
            text: ``
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
    description: '...',
    content: [
    ],
    sources: `
*   Anger, J. (2016). _Hochwasser am Bodensee_. Von [https://www.dwd.de/DE/wetter/thema\_des\_tages/2016/6/24.html](https://www.dwd.de/DE/wetter/thema_des_tages/2016/6/24.html)
    
*   Bodenseee.net. (2025). _Pegel Konstanz Entwicklung_. Von Wasserstand Bodensee Historie: [https://www.bodenseee.net/pegel/](https://www.bodenseee.net/pegel/)
    
*   Landesanstalt für Umwelt Baden-Württemberg. (2025). Pegel Konstanz/Bodensee. Von [https://www.hvz.baden-wuerttemberg.de/pegel.html?id=00007&m=W](https://www.hvz.baden-wuerttemberg.de/pegel.html?id=00007&m=W)`
};

const bergsicht: phenomenaType = {
    id: 'bergsicht',
    title: 'Mountain View',
    description: '...',
    content: [],
    sources: `
*   Deutscher Wetterdienst. (kein Datum a). _Alpen-Süd-Föhn_. Abgerufen am 17. Februar 2025 von [https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?nn=103346&lv2=100072&lv3=100180](https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?nn=103346&lv2=100072&lv3=100180) 
    
*   Deutscher Wetterdienst. (kein Datum b). _Ungewöhnliche Fernsicht_. Abgerufen am 17. Februar 2025 von [https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv2=102828&lv3=102854](https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv2=102828&lv3=102854)`
};

export const enPhenomena = {
    phenomena: [
        fog,
        schwäbisches_meer_effekt,
        windsysteme,
        hochwasser,
        bergsicht
    ]
}
