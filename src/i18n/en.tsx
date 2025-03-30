import { enLexicon } from "./enLexicon"

const en = {
    title: "FogCast",
    subtitle: "in Constance",
    insert: "My name is {{name}}",

    navigation: {
        models: "Models",
        station: "Station",
        data: "Data",
        lexikon: "Lexikon",
        phenomena: "Phenomena",
        home: "Home",
        analysis: "Analysis"
    },

    data: {
        temperature: "Temperature",
        humidity: "Humidity",
        forecast: "Forecast",
        time: "Time",
        waterTemp: "Water temperature",
        waterLevel: "Water level",
        windspeed: "Wind speed",
    },

    startingPage: {
        title: "Weather in Constance",
        forecast: "Forecast",
        currentWeather: "Current Weather",
        next2Days: "Next 2 Days",
        next14Days: "Next 14 Days"
    },

    dataPage: {
        introduction: "How has the weather changed in recent years? What temperature trends are there within a year? How does the temperature fluctuate within a week? These and many other questions can be answered on this page with the help of many graphs!",
        tempLastYear: "Temperature in the last year",
        tempLastWeek: "Temperature of the last week",
        fogMonth: "Fog days per month",
        fogYear: "Fog days per year",
        waterLevelLastMonth: "Water level in the last month",

        tempTab: "Temperature",
        fogTab: "Fog",
        waterLevel: "Water level"
    },

    phenomena: {
        title: "Weather phenomena",
        introduction: "Lake Constance is a unique climate regulator that, due to its size and location, causes various weather phenomena. The Swabian Sea Effect influences the local climate by balancing temperature differences and promoting weather changes. Especially in autumn and winter, dense fog is common, formed by the lake's moisture and often significantly reducing visibility. Additionally, the lake's water level can fluctuate considerably due to flooding caused by heavy rainfall or snowmelt. The following sections will provide a closer look at these and other weather phenomena.",
        explanation: "Explanation",
        referenceBodensee: "Reference to Bodensee",
        dataAnalysis: "Data Analysis",
        sources: "Sources"
    },

    lexicon: enLexicon,

    models: {
        title: "Forecasting",
        selectValues: "Select date and model. (top right)",
        introduction: "Analyze and compare the predictions of different models! Here, you can select different models and the [predicted time](/lexikon#predictedTime). Consequently, the [historical predictions](/lexikon#timeOfPrediction) for all selected models are displayed over time.",
        forecastTemp: 'Temperature forecast for {{date}}',
        forecastHumidity: 'Humidity forecast for {{date}}'
    },

    weatherStation: {
        title: "Weather station",
        introduction: "The weather station..."
    },

    impressum: {
        title: "Impressum",
        aboutTitle: "About the project",
        description: "Weather forecasting is not only fun, but also crucial for predicting and planning the production of renewable energy such as wind and solar power. More accurate forecasting can help increase the stability and efficiency of energy production by better adapting to local weather conditions.",
        about: "Fogcast is a project that is being developed as part of the 2024/25 team project in the Master of Computer Science (MSI) at the HTWG Konstanz. It deals with the analysis, evaluation and presentation of weather data for Constance and the Lake Constance area, with the aim of better understanding weather phenomena (such as fog) and improving forecasts. To this end, techniques such as machine learning will be applied, a dedicated weather station will be set up to record results and a platform will be developed for public access.",
        developerTeam: "The development team consists of 8 developers and is led by Professor Dr. Oliver Dürr. The 8 developers are all Master's students with a computer science background: Lukas Benner, Jonas Elsper, Lukas Epple, Maren Franke, Samantha Isted, Marta Mate, Simon Rauch and Elija Stauss.",
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
        dataFrom: "Data from",
        and: "and",
        legalInfoText: `
## Legal Notice

The content of this website is protected by copyright.

All content published on the FogCast website is protected by copyright and may only be used, distributed or publicly reproduced with the consent of the HTWG Konstanz.

Freely accessible geodata from the DWD and Open Meteo may be used under the conditions of Creative Commons BY 4.0 (CC BY 4.0), geodata from Pegelonline under the conditions of the DL-DE->Zero-2.0 licence, provided the source is cited.
`
    },

    cookies: {
        text: "This website uses cookies to improve your experience. It is necessary for the functionality of the page, improves the user experience, and helps store configurations like language and color mode.",
        accept: "Accept"
    },

    other: {
        underConstruction: "This page is under construction...",
    },


}

export default en