import { enLexicon } from "./enLexicon"

const en = {
    title: "FogCast",
    subtitle: "in Constance",
    insert: "My name is {{name}}",

    navigation: {
        models: "Model comparison",
        station: "Weather station",
        data: "Data",
        lexikon: "Lexikon",
        phenomena: "Phenomena",
        home: "Home",
        analysis: "Leaderboard",

        main: "Main",
        info: "Info"
    },

    data: {
        temperature: "Temperature",
        humidity: "Humidity",
        fog: "Fog",
        forecast: "Forecast",
        time: "Time",
        waterTemp: "Water temperature",
        waterLevel: "Water level",
        windspeed: "Wind speed",
        cloud: "Cloud Cover",
        cloudCoverLow: "Cloud Cover Low",
        cloudCoverHigh: "Cloud Cover High",
        cloudCoverMid: "Cloud Cover Mid",
        visibility: "Visibility",
        rain: "Rain",
        weatherCode: "Weather Code",
        isDay: "is Day"
    },

    startingPage: {
        title: "Weather in Constance",
        forecast: "Forecast",
        currentWeather: "Current Weather",
        next2Days: "Next 2 Days",
        next14Days: "Next 14 Days"
    },

    dataPage: {
        title: "Data Visualization",
        introduction: "How has the weather changed in recent years? What temperature trends are there within a year? How does the temperature fluctuate within a week? These and many other questions can be answered on this page with the help of many graphs! The displayed data are measured data received from DWD, OpenMeteo and PegelOnline.",
        tempLastYear: "Temperature in the last year",
        tempYears: "Temperature over the years",
        tempLastWeek: "Temperature of the last week",
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
        introduction: "Todo",
        details: "Details",
        description: `TODO`,
        technicalDetailsHeader: "Technical Details",
        technicalDetailsText: "- RaspberryPi 5\n" +
            "- test",
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
