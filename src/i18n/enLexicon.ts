export const enLexicon = {
    predictedTime: {
        title: 'Predicted time',
        text: 'Time to which the prediction refers, i.e. at which the predicted value should occur. For example: On 24/02/2025 at 12:00 it should be 12°C. In this case, "24/12/2025 at 12 noon" is the predicted time.',
        tags: ['prediction']
    },
    timeOfPrediction: {
        title: 'Time of the prediction',
        text: 'Time at which the prediction was "published/created". For example, a prediction for 24/02/2025 is created on 12/02/2025. "12/02/2025" is the time of the prediction and "24/05/2025" is the [predicted time](#predictedTime).',
        tags: ['prediction']
    },
    benchmarkingIdea: {
        title: 'Numeric Benchmarks for Weathermodels',
        text: `
Weather models are complex systems that attempt to predict the future development of the atmosphere. Numerical benchmarks can be used to assess the quality of these predictions. These benchmarks compare the models' predictions with actual observations and rank the models based on their accuracy. 

### What are numerical benchmarks?

Numerical benchmarks are quantitative assessments that measure the performance of weather models against real observational data. They provide an objective basis for comparing different models and determining which model provides the best forecasts in certain situations or over a certain period of time.

### Methodology in the background

The basic idea behind numerical benchmarks is simple: 

1. collect forecasts: The forecasts of different weather models for a specific time and location are collected.
2. collect observations: Real weather observations (e.g. temperature, wind speed) for the same time and location are obtained from reliable sources such as weather stations or satellites.
3. comparison and evaluation: The predictions of the models are compared with the actual observations. Statistical metrics such as the mean square error (MSE) or the negative log-likelihood (NLL) are used to assess how well the predictions match the observations.
4. create a ranking list: The models are ranked based on their evaluation results. The model with the lowest MSE or the highest NLL is considered the most accurate. The values can be categorised into different time spans in order to make statements with a higher information content: (some models may perform better for long-term forecasts but are less good for short-term forecasts)

- Short-term forecasts (up to 24 hours)
- Medium-term forecasts (24-72 hours)
- Long-term forecasts (over 72 hours)

###  Extension of benchmarks

In the simplest version, benchmarks can be calculated and saved using a handful of variables for different time periods with one metric. To make the benchmarks more precise and meaningful, 1 more variables can be used, which may be weighted differently. In addition, the forecasts in the different time periods can be weighted according to their distance from the predicted point in time. Many other measures can be taken to make the assessment of the forecasts as precise and meaningful as possible.

### Interpretation of results

The practical application of the benchmark system is carried out via script sequences that enable an automated daily comparison of model performance. These can be viewed via the web interface. The benchmark scores can also be used, for example, to weight the statements of individual models based on their average historical benchmark scores when merging models.
`,
        tags: ['prediction', 'benchmarking']
    },
    metaForecasting: {
        title: "Meta Forecasting",
        text: `
In addition to the possibility of making concrete weather forecasts, i.e. predicting concrete values for weather characteristics, there is also the possibility of making forecasts for meta-information. Examples of such meta-forecasts are predictions about the confidence of a forecast.

### How can confidence be predicted?

Confidence describes how certain a model is when making a prediction. Neural networks can be used to learn patterns from past predictions and associated observations of how confident models have been in the past when making predictions under certain conditions. This can also be used to determine which of these conditions are crucial for the reliability of weather forecasts.

### Methodology behind confidence forecasts

Collecting historical predictions: In order to train models, predictions must be collected so that they can later be compared with the corresponding observations.

Record observations: To compare historical prediction data with actual values, observations must also be recorded.

Estimate means and standard deviations: Based on the historical predictions and the observations, an attempt is made to learn the prediction of a mean and a standard deviation. In our case, training is done using the maximum likelihood method, where the parameters of the model are adjusted to maximise the probability of the observed data under the estimated normal distribution.

### Possibility of extending meta-forecasts

Meta-forecasts offer a wide range of extension possibilities to improve the quality and usefulness of weather forecasts. One obvious extension is the integration of meta-forecasts for model fusion, where several models are combined to increase forecast accuracy and stability. In addition, feature dependencies can be taken into account and incorporated into the forecasts. Furthermore, the effects of inputs on the outputs of the meta-forecasts can be analysed to better understand what factors influence the confidence of the forecasts.


### Interpreting the results

Interpretation of meta-forecast results requires a thorough understanding of the underlying models and data. Confidence values should not be considered in isolation, but in the context of the model's historical performance and the specific weather conditions. A high confidence value means that the model is confident that the forecast is accurate based on past data, while a low value indicates uncertainty. It is important to identify and account for sources of error, such as incomplete or erroneous data, modelling assumptions or external influences. In addition, trends and patterns in confidence levels over time should be analysed to identify systematic errors or potential for improvement. Finally, the results of meta-forecasts should always be considered in conjunction with other weather data and models to ensure a comprehensive and reliable weather forecast.
`,
        tags: ['prediction']
    },
    fogDays: {
        title: 'Fog Day',
        text: 'A fog day occurs, according to the Deutscher Wetterdienst, when horizontal visibility temporarily drops below 1 kilometer within a 90-degree sector at any time during the day.\n\nhttps://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv3=101878&lv2=101812',
        tags: ['weather']
    },

    ACCESS_G: {
        title: 'ACCESS-G',
        text: '[ACCESS-G](http://www.bom.gov.au/nwp/doc/access/NWPData.shtml) by the Australian Bureau of Meteorology (BOM). Offers 15 km resolution with a 10-day forecast and 6-hourly updates.',
        tags: ['weather model']
    },

    ARPEGE_AROME: {
        title: 'ARPEGE & AROME',
        text: '[ARPEGE](https://www.umr-cnrm.fr/spip.php?article121&lang=en) & [AROME](https://www.umr-cnrm.fr/spip.php?article120&lang=fr) by Météo-France from France. Offers 11-25 km resolution, 4-day forecasts, and updates every 6-12 hours.',
        tags: ['weather model']
    },

    GEM: {
        title: 'GEM',
        text: '[GEM](https://docs.unidata.ucar.edu/ldm/current/basics/feedtypes/gem.html) by Canadian Weather Service from Canada. Offers 15 km resolution with 10-day forecasts and updates every 12 hours.',
        tags: ['weather model']
    },

    GFS_HRRR: {
        title: 'GFS & HRRR',
        text: '[GFS & HRRR](https://www.nco.ncep.noaa.gov/pmb/products/gfs/) by NOAA from the United States. Delivers 3-25 km resolution with 16-day forecasts, and updates every 3 hours.',
        tags: ['weather model']
    },

    GFS_GRAPES: {
        title: 'GFS GRAPES',
        text: '[GFS GRAPES](https://www.cma.gov.cn/en/forecast/highlight/202311/t20231117_5892086.html) by China Meteorological Administration (CMA). Delivers 15 km resolution with 10-day forecasts and 6-hourly updates.',
        tags: ['weather model']
    },

    GSM: {
        title: ' GSM',
        text: '[GSM](https://www.jma.go.jp/jma/en/NMHS/table/spec_GSM.pdf) by JMA from Japan. Offers 55 km resolution, 11-day forecasts, and updates every 6 hours.',
        tags: ['weather model']
    },

    HARMONIE_DMI: {
        title: 'HARMONIE (DMI)',
        text: '[HARMONIE (DMI)](https://opendatadocs.dmi.govcloud.dk/Data/Forecast_Data_Weather_Model_HARMONIE_DINI_IG) by DMI from Denmark. Features 2 km resolution, 2.5-day forecasts, and updates every 3 hours.',
        tags: ['weather model']
    },

    HARMONIE_KNMI: {
        title: 'HARMONIE (KNMI)',
        text: '[HARMONIE (KNMI)](https://dataplatform.knmi.nl/dataset/harmonie-arome-cy43-p3-1-0) by KNMI from the Netherlands. Offers 2 km resolution with 2.5-day forecasts and hourly updates.',
        tags: ['weather model']
    },

    ICON_D2: {
        title: 'ICON D2',
        text: '[ICON D2](https://open-meteo.com/en/docs/dwd-api) by Deutscher Wetterdienst (DWD) from Germany. Focuses on Central Europe with ~2 km resolution, 2-day forecasts, and updates every 3 hours.',
        tags: ['weather model']
    },

    ICON_Europe: {
        title: 'ICON Europe',
        text: '[ICON Europe](https://open-meteo.com/en/docs/dwd-api) by Deutscher Wetterdienst (DWD) from Germany. Covers Europe with ~7 km resolution, 5-day forecasts, and updates every 3 hours.',
        tags: ['weather model']
    },

    ICON_Global: {
        title: 'ICON Global',
        text: '[ICON Global](https://open-meteo.com/en/docs/dwd-api) by Deutscher Wetterdienst (DWD) from Germany. Offers ~11 km resolution globally with a 7.5-day forecast and updates every 6 hours.',
        tags: ['weather model']
    },

    IFS_AIFS: {
        title: 'IFS & AIFS',
        text: '[IFS & AIFS](https://www.ecmwf.int/en/forecasts/datasets/open-data) by ECMWF from the European Union. Features 25-28 km resolution with a 15-day forecast and updates every 6 hours.',
        tags: ['weather model']
    },

    UKMO: {
        title: 'UKMO',
        text: '[UKMO](https://open-meteo.com/en/docs/ukmo-api) by UK Met Office from the United Kingdom. Offers 10 km resolution with a 7-day forecast and updates every 6 hours.',
        tags: ['weather model']
    },

    capeIndex: {
        title: 'CAPE Thunderstorm Index',
        text: 'According to the Deutscher Wetterdienst, the CAPE value (Convective Available Potential Energy) describes the atmospheric energy available for convection. The greater the difference in temperature between a rising air parcel and its surroundings - combined with high near-surface humidity - the higher the CAPE value and the greater the thunderstorm potential. Values above 2000 J/kg can indicate severe weather.\n\nhttps://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv3=100534&lv2=100510',
        tags: ['weather']
    },
    weatherStationKonstanz: {
        title: 'DWD Weather Station Konstanz',
        text: 'The Konstanz weather station of the Deutscher Wetterdienst (DWD) is located at Silvanerweg 6, 78464 Konstanz, Baden-Württemberg, Germany. It sits at an elevation of approximately 444 meters above sea level and records various meteorological parameters:\n\n- Air temperature\n- Humidity\n- Air pressure\n- Wind speed and direction\n- Precipitation amount\n- Sunshine duration\n- Dew point\n- Visibility\n- Weather condition (e.g. cloudy, rain)\n\n**Measurement Methods:**\nTemperature: Measured at 2 m height above natural ground using a thermometer in a ventilated weather shelter.\nHumidity: Measured with a hygrometer also at 2 m height. Relative humidity is calculated from temperature and dew point.\nDew Point: Indicates the temperature at which the air becomes saturated with water vapor.\n\nData is recorded at short intervals and published online.\n\nhttps://offenedaten-konstanz.de/dataset/historische-wetterdaten/resource/fc407b6f-8d68-48f5-9d68-e66cf84c06f3#{}',
        tags: ['weather', 'station']
    },

    dwdDescription: {
        title: 'German Meteorological Service (DWD)',
        text: 'The German Meteorological Service (Deutscher Wetterdienst, DWD) is Germany\'s national authority for weather and climate and operates under the Federal Ministry for Digital and Transport. It is responsible for providing essential meteorological services across sectors such as transportation, disaster management, energy, agriculture, and public safety. Its mandate is defined by the German Meteorological Service Act.\n\nThe DWD operates one of the world’s most comprehensive observation networks, covering land, sea, air, and space. This includes more than 2,000 surface stations, weather satellites, radar installations, wind profilers, automatic buoys, measurement ships, weather balloons, and aircraft-based sensors. The collected data feeds into modern forecasting models powered by high-performance computing systems.\n\nCore responsibilities include weather and severe weather forecasting, issuing official warnings, monitoring climate change, measuring atmospheric radioactivity, and supporting aviation and maritime navigation. At major airports, the DWD maintains aviation weather stations with advanced systems for monitoring wind, visibility, and lightning activity.\n\nIn the field of climate research, the DWD analyzes long-term weather data, operates climate reference stations, and studies urban and rural environmental conditions. Much of its data is made publicly available as Open Data. It also tracks plant development through phenological observations to monitor climate change impacts.\n\nInternationally, the DWD represents Germany in organizations such as the World Meteorological Organization (WMO), EUMETSAT, and the European Centre for Medium-Range Weather Forecasts (ECMWF). The DWD also takes part in numerous global research initiatives and helps coordinate parts of the international weather observation system.\n\nhttps://www.bmv.de/DE/Themen/Digitales/Angewandte-Raumfahrt-und-Meteorologie/Deutscher-Wetterdienst/deutscher-wetterdienst.html\n\nhttps://www.dwd.de/SharedDocs/broschueren/DE/presse/messnetz_pdf.pdf;jsessionid=B2D25F579C8A3AED13BC9CC400C8618D.live11044?__blob=publicationFile&v=7',
        tags: ['institution', 'data']
    },

    meteoblueDescription: {
        title: 'meteoblue',
        text: 'meteoblue is a Swiss-based weather service that delivers high-precision forecasts worldwide. By intelligently combining over 25 weather models with up-to-date measurement and observation data, meteoblue achieves exceptional forecast accuracy—available in time intervals ranging from 15 minutes to several days ahead.\n\nThe data sources include international weather services, satellite imagery, in-house and third-party model simulations, and reanalyses such as NEMSGLOBAL and ERA5. These are processed using advanced techniques like data assimilation, statistical correction (MOS), nowcasting, machine learning, and multi-model comparisons. Additional geographic data, such as topography, land use, soil type, and population density, further enhance the results.\n\nmeteoblue is also known for its advanced weather data visualization. Since introducing its animated wind map in 2006, the company has set industry standards. Today, meteoblue offers more free weather maps than any other provider, including a global satellite composite.\n\nIn addition to forecasts, meteoblue provides a wide range of climate services, including risk assessments, long-term trend analyses, and future climate scenario modeling based on historical data. Through its powerful API, users gain access to one of the world’s largest weather data repositories. The API can be easily integrated into websites, systems, or applications and delivers weather and environmental data in multiple formats, including ready-made visualizations.\n\nhttps://content.meteoblue.com/de',
        tags: ['institution', 'data']
    },

    pegelonlineDescription: {
        title: 'PEGELONLINE',
        text: 'PEGELONLINE is a free online service provided by the German Federal Waterways and Shipping Administration (WSV). It delivers up-to-date hydrological raw data—such as water levels, discharge rates, and other environmental parameters—from more than 660 gauging stations along federal inland and coastal waterways. Measurements are updated in near real-time: coastal data every minute, and inland data at 15-minute intervals. All published values are unverified raw data, available for up to 30 days retrospectively.\n\nPEGELONLINE exclusively sources its data from federal gauging stations; it does not include measurements from state-run networks. The data is supplied by the local Waterways and Shipping Offices (WSÄ) and is operated technically by the Federal Information Technology Center (ITZBund). In addition to raw data, PEGELONLINE provides various web services such as REST APIs, Web Map Services, and XML interfaces, which allow seamless integration into third-party applications.\n\nThe service is used by a wide range of stakeholders—from commercial and recreational shipping to disaster response units, researchers, media outlets, and private individuals. Especially during flood events, PEGELONLINE becomes a key information source, handling up to 1,000 requests per second.\n\nFurther information:\nhttps://www.pegelonline.wsv.de/gast/start\nhttps://www.itzbund.de/EN/itloesungen/fachverfahren/pegelonline/pegelonline.html',
        tags: ['institution', 'data']
    },

    lubwDescription: {
        title: 'State Institute for the Environment Baden-Württemberg (LUBW)',
        text: 'The LUBW is a public institution based in Karlsruhe and operates under the legal supervision of the Ministry of the Environment, Climate and Energy of Baden-Württemberg. It provides expert support to the state government and authorities on topics such as environmental protection, nature conservation, radiation protection, occupational safety, and product and facility safety.\n\nThe LUBW collects environmental data across the state and conducts analyses of air, water, and soil. This information is processed and made publicly available through platforms such as UDO (Environmental Data and Maps Online). UDO offers free access to a wide range of digital environmental maps and datasets, which are sourced from the LUBW’s monitoring programs and from a network of state and municipal environmental agencies.\n\nWith this service, the LUBW fulfills its obligations under the Environmental Administration Act (UVwG) of Baden-Württemberg.\n\nhttps://um.baden-wuerttemberg.de/de/ministerium/aufgaben-organisation/nachgeordnete-dienststellen/landesanstalt-fuer-umwelt-baden-wuerttemberg/\n\nhttps://udo.lubw.baden-wuerttemberg.de/public/',
        tags: ['institution', 'data']
    },

    cloudCover: {
        title: 'Cloud Cover',
        text: 'Cloud cover refers to the percentage of the sky covered by clouds, measured on a scale from 0% (clear sky) to 100% (fully overcast). Forecasts express this as total cover or as segmented layers, low (0-2 km), medium (2-7 km), and high clouds (5-13 km), based on WMO definitions.\n\nCloud cover values represent an average over a forecast period, integrating any variations. Even when several layers report 50% coverage, the visible sky may remain limited. Cloud forecasts are essential for fields like aviation, astronomy, solar energy, and weather-sensitive planning.\n\nThe actual cloud cover depends not only on the percentage per layer but also on cloud types, density, and altitude. For instance, 50% low cloud cover can block more radiation than 100% high cloud cover. Cloud presence also influences temperature: during the day, it can cool the surface by blocking sunlight; at night, it traps longwave radiation, resulting in warmer conditions. Accurately predicting cloud dynamics is thus crucial for temperature and precipitation forecasts.\n\nCloud cover is measured via satellites, ground sensors, and visual observation (e.g. METAR codes use an 8-point scale). However, detecting and distinguishing layers remains challenging, especially for local phenomena like fog or stratus clouds.\n\nMore information:\nhttps://content.meteoblue.com/en/research-education/specifications/weather-variables/clouds',
        tags: ['weather']
    },

    devpoint: {
        title: '2 Metre Dewpoint Temperature',
        text: 'The 2 metre dewpoint temperature indicates the temperature to which air, 2 m above the Earth’s surface, must be cooled for saturation (100% relative humidity) to occur. It reflects the moisture content of the air and is often used alongside temperature and pressure to calculate relative humidity.\n\nThis value is derived by interpolating between the Earth’s surface and the lowest model level, factoring in current atmospheric conditions. It is expressed in kelvin (K), to convert to degrees Celsius, subtract 273.15.\n\nThis parameter is widely used in weather forecasts to assess comfort levels, fog risk, and thunderstorm potential.\n\nMore information:\nhttps://codes.ecmwf.int/grib/param-db/168',
        tags: ['humidity', 'weather']
    },

    evapotranspiration: {
        title: 'Evapotranspiration',
        text: 'Evapotranspiration describes the total amount of water transferred from land into the atmosphere through two processes: evaporation from soil and surfaces, and transpiration from plants. It plays a vital role in the water cycle and reflects how much moisture is being lost from the land.\n\nThis value is especially important in agriculture, where it helps estimate how much water crops need. Knowing how much water is being used by plants and lost to the air enables farmers to manage irrigation more precisely, especially in dry regions where water is limited.\n\nSince evapotranspiration requires energy, it cools the environment where it occurs. This effect is similar to how our skin feels cooler after water evaporates. Satellite sensors can detect such cooling using thermal infrared imaging.\n\nIn Germany, the national weather service defines evapotranspiration as the total water loss from vegetated land surfaces and measures it with specialized equipment such as lysimeters.\n\nSources:\nNASA: https://www.nasa.gov/missions/landsat/evapotranspiration-watching-over-water-use/\nDWD: https://www.dwd.de/DE/service/lexikon/Functions/glossar.html?lv3=100776&lv2=100652',
        tags: ['weather']
    },

    freezingLevel: {
        title: 'Freezing Level',
        text: 'The freezing level marks the altitude where the air temperature reaches 0°C (32°F or 273.15 K), allowing water to begin freezing. It is a critical boundary in meteorology, separating rain (below) from snow (above) and is highly relevant for mountain forecasting and aviation. The higher the freezing level, the colder the air mass above it.\n\nThis level can vary by location, season, and weather conditions. In colder climates or during winter, it can be close to or even below ground level, while in warm, dry regions or during summer, it can rise to several thousand meters. Changes in humidity, air pressure, or weather fronts can cause the freezing level to shift over short time periods.\n\nFreezing level charts visually show this elevation over time and are especially useful in ski areas or flight operations. In weather apps, it’s often depicted with a line separating zones of snowfall from rainfall.\n\nSources:\n- Windy.app: https://windy.app/blog/what-is-freezing-level-chart.html\n- meteoblue: https://content.meteoblue.com/en/research-education/specifications/weather-variables/temperatures',
        tags: ['weather']
    },

    humidity: {
        title: 'Humidity',
        text: 'Humidity describes the amount of water vapor in the air. It can be expressed in various ways: absolute humidity (grams per cubic meter), specific humidity (grams per kilogram of air), and the commonly known relative humidity, which shows how full the air is with moisture as a percentage of its capacity at a given temperature.\n\nHumidity data is vital for understanding weather processes and Earth’s ecosystems. It plays a key role in predicting storms, assessing soil and forest moisture, evaluating air quality, and calculating the risk of ice formation.\n\nSource: NASA Earthdata - https://www.earthdata.nasa.gov/topics/atmosphere/humidity',
        tags: ['humidity', 'weather']
    },

    soilMoisture: {
        title: 'Soil Moisture',
        text: 'Soil moisture refers to the amount of water held in the unsaturated part of the soil. It is a key variable in meteorology, hydrology, and agriculture, as it affects the exchange of energy and water between land and atmosphere.\n\nIt is measured using in-ground sensors, gravimetric methods, lysimeters, or remote sensing from satellites (e.g., SMAP, SMOS). These data support drought forecasting, irrigation planning, and the improvement of weather and climate models.\n\nSource: Climate Data Guide - https://climatedataguide.ucar.edu/climate-data/soil-moisture-data-sets-overview-comparison-tables',
        tags: ['weather']
    },

    sunshineDuration: {
        title: 'Sonnenscheindauer',
        text: 'Die Sonnenscheindauer beschreibt den Zeitraum, in dem direkte Sonnenstrahlung am Erdboden eine Intensität von mindestens 120 W/m² erreicht, typischerweise bei wolkenfreiem Himmel kurz nach Sonnenaufgang oder vor Sonnenuntergang. Diese Größe ist wichtig für die Klimabeobachtung, Landwirtschaft und Solarpotenzialanalysen.\n\nGemessen wird sie häufig mit einem Campbell-Stokes-Sonnenscheinautographen: Eine Glaskugel bündelt das Sonnenlicht auf eine spezielle, blaue Aufzeichnungskarte, die dabei versengt wird. Die Länge dieser Brandspuren, gemessen mit einer Kunststoffskala, ergibt die tägliche Sonnenscheindauer. Je nach Jahreszeit kommen unterschiedliche Kartentypen zum Einsatz.\n\nDas Gerät wird auf einem festen Sockel installiert und entsprechend der geografischen Breite ausgerichtet, um den Sonnenstand korrekt abzubilden.\n\nQuelle: Ahmad et al. (2017). Experimental Agrometeorology: A Practical Manual. https://doi.org/10.1007/978-3-319-69185-5_6',
        tags: ['weather']
    },

    vpd: {
        title: 'Vapor Pressure Deficit (VPD)',
        text: 'Vapor Pressure Deficit (VPD) describes the difference between the actual water vapor pressure in the air and the maximum possible pressure (saturation vapor pressure) the air could hold at a given temperature. As air warms, its capacity to hold moisture increases, raising the saturation vapor pressure. A higher VPD indicates drier air and greater potential for moisture to evaporate from plants and soil.\n\nVPD is a key indicator of atmospheric dryness and is closely linked to plant stress and water loss. When VPD is high, plants lose water more quickly and must draw more from their roots, which can lead to drying or dieback.\n\nSource: Climate Signals - https://www.climatesignals.org/resources/explainer-what-vapor-pressure-deficit-vpd',
        tags: ['humidity', 'weather']
    },

    wetBulbTemperature: {
        title: 'Wet Bulb Temperature (Twb)',
        text: 'The wet bulb temperature is the lowest temperature that can be reached by evaporative cooling at constant pressure. It is measured by wrapping a thermometer bulb in wet muslin and exposing it to airflow. As water evaporates from the muslin, it cools the bulb, leading to a reading lower than the dry bulb temperature.\n\nThe rate of evaporation—and thus the cooling effect—depends on the humidity of the air: drier air allows more evaporation, resulting in a lower wet bulb temperature. The wet bulb temperature always lies between the dry bulb temperature and the dew point.\n\nIt reflects the cooling potential of the air and is crucial for understanding heat stress, HVAC design, and weather forecasting. Wet bulb temperature lines are represented diagonally in psychrometric charts, helping to assess the thermodynamic state of humid air.\n\nSource: The Engineering Toolbox - https://www.engineeringtoolbox.com/dry-wet-bulb-dew-point-air-d_682.html',
        tags: ['weather', 'humidity']
    },

    windGusts: {
        title: 'Wind Gusts',
        text: 'Wind gusts are short-term, strong increases in wind speed that rise significantly above the average. According to the World Meteorological Organization (WMO), a gust is defined as a noticeable jump in wind speed. In the U.S., the National Weather Service defines a gust as a sudden increase reaching at least 30 km/h (18 mph), with a difference of at least 17 km/h (10 mph) between the peak and lull, all within less than 20 seconds.\n\nWind gusts are measured using anemometers - either classic rotating cup types or high-precision ultrasonic sensors. Causes include turbulence over uneven terrain or near buildings, wind shear from storms, thermal activity on sunny days, advancing weather fronts, or large systems like cyclones. Mountainous regions can also amplify gusts due to wind funneling.\n\nWind gusts are not just an inconvenience, they can pose serious risks, especially for maritime navigation and outdoor activities. Monitoring wind warnings and forecasts helps reduce these risks.\n\nSource: GeoScience Blog - https://geoscience.blog/defining-wind-gusts-understanding-sudden-spikes-in-wind-speed/',
        tags: ['weather']
    },

    weatherCodeWW: {
        title: 'Weather Code (WW)',
        text: 'The "WW" code from WMO Code Table 4677 represents present or recent weather conditions as observed at a manned weather station. The two-digit codes range from 00 to 99 and cover phenomena such as fog, rain, snow, thunderstorms, dust storms, and more. The code helps classify both the type and intensity of weather events, offering a standardized way to report atmospheric conditions.\n\nFor example:\n- Codes from 00–19 represent no precipitation but may include fog, dust, or lightning.\n- 20–29 indicate recent but no longer active weather such as drizzle or thunderstorms.\n- 30–39 cover dust storms and blowing snow.\n- 40–49 are used for fog and ice fog with varying visibility.\n- 50–99 represent ongoing precipitation, with increasing intensity and complexity, including showers and thunderstorms.\n\nThis system is essential for aviation, meteorological observations, and global weather reporting.\n\nSource: WMO Code Table 4677 https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM',
        tags: ['weather']
    }

}