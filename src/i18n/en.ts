import { enLexicon } from "./enLexicon"

const en = {
    title: "FogCast",
    subtitle: "in Konstanz",

    insert: "My name is {{name}}",

    navigation: {
        models: "Forecast review",
        station: "Weather Station",
        data: "Historic Data",
        lexikon: "Lexicon",
        phenomena: "Phenomena",
        home: "Homepage",
        analysis: "Leaderboard",
        main: "General",
        info: "Info",
        sailor: "Sailor's Weather"
    },

    data: {
        temperature: "Temperature",
        humidity: "Humidity",
        fog: "Fog",
        forecast: "Forecast",
        time: "Time",
        waterTemp: "Water Temperature",
        waterLevel: "Water Level",
        windspeed: "Wind Speed",
        cloud: "Cloud Cover",
        cloudCoverLow: "Low Cloud Cover",
        cloudCoverHigh: "High Cloud Cover",
        cloudCoverMid: "Mid Cloud Cover",
        visibility: "Visibility",
        rain: "Rain",
        weatherCode: "Weather Code",
        isDay: "Is Day",
        windSpeed10m: "Wind Speed",
        windGusts10m: "Wind Gusts",
        windGusts: "Wind Gusts",
        windDirection10m: "Wind Direction",
        windDirection: "Wind Direction",
        pressureMSL: "Pressure (MSL)",
        cape: "CAPE (Convective Energy)",
        lastUpdated: "last Update"
    },

    sources: {
        forecast: "Forecasts",
        waterLevel: "Water levels",
        currentWeather: "Current weather",
        actualWeather: "Observed weather",
        weatherStation: "Weather station",
        historicWeather: "Historical forecasts",
        temperature: "Temperature",
        fog: "Fog"
    },

    startingPage: {
        title: "Weather in Konstanz",
        forecast: "Forecast",
        currentWeather: "Current Weather",
        next2Days: "Next 2 Days",
        next14Days: "Next 14 Days",
        standard: "Standard",
        advanced: "Models",
        sailor: "Sailor"
    },

    leaderBoard: {
        longTerm: "longTerm",
        midTerm: "midTerm",
        shortTerm: "shortTerm",
        title: "Benchmarking Leaderboard",
        text: "We assess the accuracy of various weather models across three different forecast horizons: 1 day (shortTerm), 3 days (midTerm), and up to a maximum of 7 days (longTerm). Only models capable of forecasting at least as far ahead as the respective horizon are considered, and comparisons are limited to that period. Errors are calculated hourly over the entire timeframe using two metrics: MAE (Mean Absolute Error) is used for cloud cover and humidity forecasts, while RMSE (Root Mean Squared Error) is used for all other parameters. This provides a transparent comparison of the models across different time spans and measurement variables. More information can be found in the glossary under [Meta Forecasting](/lexikon#metaForecasting) and [Benchmarking](/lexikon#benchmarkingIdea)."
    },

    sailorPage: {
        currentConditions: "Current Offshore Conditions",
        windSpeedAndGustsTitle: "Wind Speed and Gusts Forecast",
        windDirectionTitle: "Wind Direction Forecast",
        capeAndRainTitle: "Thunderstorm Risk (CAPE) and Rain"
    },

    direction: {
        N: "North",
        NE: "Northeast",
        E: "East",
        SE: "Southeast",
        S: "South",
        SW: "Southwest",
        W: "West",
        NW: "Northwest"
    },

    dataPage: {
        title: "Historic Data",
        introduction: "How has the weather changed in recent years? What temperature trends are there within a year? How does the temperature fluctuate within a week? These and many other questions can be answered on this page with the help of many graphs! The displayed data are measured data received from DWD, OpenMeteo and PegelOnline.",
        tempLastYear: "Temperature in the last year",
        tempYears: "average Temperature over the years",
        tempLastWeek: "apparent Temperature of the last week",
        fogMonth: "Fog days per month",
        fogYear: "Fog days per year",
        waterLevelLastMonth: "Water level in the last month",

        tempTab: "Temperature",
        fogTab: "Fog",
        waterLevelTab: "Water level"
    },

    phenomena: {
        title: "Weather phenomena",
        introduction: "Lake Constance is a unique climate regulator that, due to its size and location, causes various weather phenomena. The Swabian Sea Effect influences the local climate by balancing temperature differences and promoting weather changes. Especially in autumn and winter, dense fog is common, formed by the lake's moisture and often significantly reducing visibility. Additionally, the lake's water level can fluctuate considerably due to flooding caused by heavy rainfall or snowmelt. The following sections will provide a closer look at these and other weather phenomena.",
        explanation: "Explanation",
        referenceBodensee: "Reference to Bodensee",
        dataAnalysis: "Data Analysis",
        sources: "Sources"
    },

    lexiconPage: {
        title: "Lexicon",
        introduction: "This collection contains essential explanations and notes regarding weather, forecasts, and related information. The content is structured to allow targeted searches for specific entries or filtering by tags.",
    },

    lexicon: enLexicon,

    models: {
        title: "Forecast Review",
        selectValues: "Select date and model. (top right)",
        introduction: "Analyze and compare the predictions of different models! Here, you can select different models and the [predicted time](/lexikon#predictedTime). Consequently, the [historical predictions](/lexikon#timeOfPrediction) for all selected models are displayed over time.",
        forecastTemp: 'Temperature forecast for {{date}}',
        forecastHumidity: 'Humidity forecast for {{date}}'
    },

    weatherStation: {
        title: "Weather station",
        introduction: "FogCast has its own self-built weather station at the HTWG jetty.",
        noDataAvailable: "No current data available",
        graph: "Measurements from the station",
        details: "Details",
        description: `Whether it’s an early lecture, a spontaneous sailing trip, or an excursion to the shore—the weather on Lake Constance influences many everyday decisions. Especially in Konstanz, where lake and city are closely connected, precise weather observation plays a central role.

To provide reliable, location-specific weather data, the Konstanz University of Applied Sciences (HTWG) operates its own weather station directly on the campus pier. It continuously measures air temperature, humidity, and water temperature—right where the weather truly happens: at the water. The data is available to everyone—whether you're planning to swim in the Rhine, deciding if you need a rain jacket, or conducting research.
Our weather station provides current readings that accurately reflect the conditions along the Rhine in Konstanz.

Below are the station’s measured values: air temperature (temperature), humidity (humidity), and water temperature (water_temperature).`,
        technicalDetailsHeader: "Technical Details",
        technicalDetailsText: `
![Picture](/assets/weatherstation/Wetterstation_aufbau.jpeg "Setup - Photo by Samantha Isted")  
Our weather station measures humidity, air temperature, and water temperature every 10 seconds, forming an average value each minute to provide a minute-by-minute update.

The following are recorded:  
* **Air Temperature** - provides current temperature values at the location and serves as the basis for many weather assessments.  
* **Humidity** - important for assessing climate perception and the formation of fog or precipitation.  
* **Water Temperature of the Rhine** - measured at about 20 cm depth directly at the jetty. The values provide insight into the thermal development of the river and are equally interesting for research and leisure.



### What’s inside: Hardware overview  
To reliably capture these data, the station uses robust, proven technology:  
![Picture](/assets/weatherstation/Sensoren.jpeg "Sensors - Photo by Samantha Isted")

* **Raspberry Pi 5**  
The core of the system: a compact microcomputer to which all sensors are connected. Self-developed Python programs control the data collection, process the data, and make it available automatically.

* **DS18B20 Water Temperature Sensor**  
A digital temperature sensor used to determine the water temperature. Measurement at 20 cm depth ensures stable and representative temperature values.

* **FS304-SHTXX Combo Sensor**  
This highly precise sensor simultaneously measures air temperature and humidity - fast, reliable, and calibrated.

* **Weather Protection Housing**  
All components are housed in a weatherproof enclosure. It protects against rain, sunlight, and mechanical impacts. Integrated fuses provide additional protection for the sensitive electronics.
`
    },

    impressum: {
        title: "Impressum",
        aboutTitle: "About the project",
        description: "Weather forecasting is not only fun, but also crucial for predicting and planning the production of renewable energy such as wind and solar power. More accurate forecasting can help increase the stability and efficiency of energy production by better adapting to local weather conditions.",
        about: "Fogcast is a project that is being developed as part of the 2024/25 team project in the Master of Computer Science (MSI) at the HTWG Konstanz. It deals with the analysis, evaluation and presentation of weather data for Constance and the Lake Constance area, with the aim of better understanding weather phenomena (such as fog) and improving forecasts. To this end, techniques such as machine learning will be applied, a dedicated weather station will be set up to record results and a platform will be developed for public access.",
        developerTeam: "The development team consists of 8 developers and is led by Professor Dr. Oliver Dürr. The 8 developers are all Master's students with a computer science background: Lukas Benner, Jonas Elsper, Lukas Epple, Maren Franke, Samantha Isted, Marta Mate, Simon Rauch and Elijah Stauss.",
        contact: "Contact",
        university: "University",
        website: "Website",
        email: "e-mail",
        legalInfo: "Legal information",
        htwg: "Imprint HTWG",
        dataProtection: "Privacy policy HTWG",
        gitHub: "Code on GitHub",
        sourcesLicences: "Sources and Licences",
        licence: "Licence",
        furtherLicences: "Further Informations about the Licences",
        dwdData: "The real-time data and current forecasts are based on DWD data. The DWD data also formed the basis for the analyses.",
        openMeteoData: "The data presented on the website is largely based on Openmeteo.",
        pegelOnline: "Parts of the data, like the data about the water level, is from Pegelonline",
        lubw: "Basis: Data from the Environmental Information System (UIS) of the Landesanstalt für Umwelt Baden-Württemberg (LUBW)",
        userAgreement: "User Agreement",
        dataFrom: "Data from",
        and: "and",
        legalInfoText: `
## Legal Notice

Freely accessible geodata from the DWD and Open Meteo may be used under the conditions of Creative Commons BY 4.0 (CC BY 4.0), geodata from Pegelonline under the conditions of the DL-DE->Zero-2.0 licence, provided the source is cited.
`
    },

    infos: {
        'dataDWD': 'Data from the [Deutschen Wetterdienst](/lexicon#dwdDescription)',
        'dataDWDAndStation': 'Data from the [DWD](/lexicon#dwdDescription) and from our [weather station](/station)',
        'dataStation': 'Data from our [weather station](/weatherstation)',
        'temperature': 'historical values: [here](/data?tab=temperature)',
        'waterLevel': 'historical values: [here](/data?tab=waterLevel)',

        'fogDays': 'Days with a view below 1km; More Info: [Lexikon](/lexiko0n#fogDays).',
        'fogDataSource': "Data from the [Deutschen Wetterdienst](/lexikon#dwdDescription); no longer provided since 2017.",

        'forecastICON': "Forecast from [ICON-D2](/lexikon#ICON_D2) model, data from [Openmeteo](/lexikon#meteoblueDescription)",
        'forecastCloudCover': "Forecast from [ICON-D2](/lexikon#ICON_D2) model, data from [Openmeteo](/lexikon#meteoblueDescription); More details about Cloud cover: [Lexikon](/lexikon#cloudCover)",
        'forecastWindspeed': "Forecast from [ICON-D2](/lexikon#ICON_D2) model, data from [Openmeteo](/lexikon#meteoblueDescription); More details about Wind Gusts: [Lexikon](/lexikon#windGusts)",
        'forecastWinddirection': "Indicated in degrees: 0° = N, 90° = E, 180° = S, 270° = W\nForecast from [ICON-D2](/lexikon#ICON_D2) model, data from [Openmeteo](/lexikon#meteoblueDescription)",
        'forecastCape': "Forecast from [ICON-D2](/lexikon#ICON_D2) model, data from [Openmeteo](/lexikon#meteoblueDescription); More details about CAPE Index: [Lexikon](/lexikon#capeIndex)"
    },

    cookies: {
        text: `This website uses techical cookies to improve your experience. It is necessary for the functionality of the page, improves the user experience, and helps store configurations like language and color mode. 

Further information can be found in the [Impressum](\impressum).    `,
        accept: "Understood"
    },

    other: {
        underConstruction: "This page is under construction...",
    },
}

export default en
