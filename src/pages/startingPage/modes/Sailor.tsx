import { Button, Card, Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaWater, FaWind } from "react-icons/fa6";
import { RiSpeedUpLine, RiWindyFill } from "react-icons/ri"; // Importiere RiSpeedUpLine für Windböen
import { OrbitProgress } from 'react-loading-indicators';
import PlotlyChart from '../../../components/plotly/DefaultChart';
import { convertToPlotlyChartFormat, PlotlyChartDataFormat, weekdayAnnotations, PlotlyChartBasicFormat } from '../../../components/plotly/PlotlyChartFormat';
import { fetchActualWeather } from '../../../components/requests/actualBackend';
import { extractCurrentWeatherForecastHourlyLastXDays, fetchCurrentForecast } from '../../../components/requests/currentForecacstBackend';
import { layoutConfig, useColor } from '../../../components/style';
import DataSource from '../../impressum/DataSource';
import MeasurementCard from '../MeasurementCard';
import ForcastCard from '../ForcastCard'; // Angenommen, du hast eine angepasste ForcastCard für Segler

export default function SailorMode() {
    const { i18n, t } = useTranslation();
    const [requestDuration, setRequestDuration] = useState<number>(1); // Standardmäßig 1 Tag
    const [currentWeather, setCurrentWeather] = useState<Record<string, string>>({});
    const [windSpeedAndGustsData, setWindSpeedAndGustsData] = useState<PlotlyChartDataFormat[] | null>(null);
    const [windDirectionData, setWindDirectionData] = useState<PlotlyChartDataFormat[] | null>(null);
    const [capeAndRainData, setCapeAndRainData] = useState<PlotlyChartDataFormat[] | null>(null);
    const [weekdays, setWeekdays] = useState<any | null>(null);
    const [isDay, setIsDay] = useState<{ x: string[], y: number[] }>({ x: [], y: [] });

    const [forecastCard, setForecastCard] = useState<any | null>(null);

    // Ref für den horizontalen Scrollbereich der Vorhersagekarten
    const scrollRef = useRef<HTMLDivElement>(null);
    const [shape, setShape] = useState<any>(null); // Für die Markierung des aktuellen Bereichs im Plotly Chart

    // Initialer Datenabruf beim Laden der Komponente
    useEffect(() => {
        fetchActualWeatherData();
        fetchSailorForecastData();
    }, []);

    // Datenabruf bei Änderung der Request-Dauer (z.B. 1 Tag, 2 Tage)
    useEffect(() => {
        fetchSailorForecastData();
    }, [requestDuration]);

    // Update der Scroll-Position, wenn sich die Prognosedaten ändern
    useEffect(() => {
        handleScroll();
    }, [windSpeedAndGustsData]);


    /**
     * Ruft aktuelle Wetterdaten ab und formatiert sie für die Anzeige.
     */
    async function fetchActualWeatherData() {
        try {
            const weather = await fetchActualWeather();
            const reformattedWeather = weather.reduce((acc, entry) => {
                acc[entry.name] = entry.value;
                return acc;
            }, {} as Record<string, string>);

            setCurrentWeather(reformattedWeather);
            console.log(reformattedWeather)
        } catch (error) {
            console.error("Fehler beim Abrufen der aktuellen Wetterdaten für Segler:", error);
        }
    }

    /**
     * Ruft die Wettervorhersagedaten für Segler ab und bereitet sie für die Plotly-Diagramme auf.
     */
    async function fetchSailorForecastData() {
        try {
            const currentForecast = await fetchCurrentForecast('icon_global'); // Annahme: 'icon_global' ist ein guter Standard

            // Extrahiere relevante Daten für Segler
            const wind_speed_10m = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'wind_speed_10m', t('data.windspeed'), requestDuration);
            const wind_gusts_10m = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'wind_gusts_10m', t('data.windGusts'), requestDuration);
            const wind_direction_10m = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'wind_direction_10m', t('data.windDirection'), requestDuration);
            const cape = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'cape', t('data.cape'), requestDuration);
            const rain = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'rain', t('data.rain'), requestDuration);
            const pressure_msl = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'pressure_msl', t('data.pressureMSL'), requestDuration);
            const is_day = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'is_day', t('data.isDay'), requestDuration);
            const weather_code = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'weather_code', t('data.weatherCode'), requestDuration)

            // console.log(wind_direction_10m)
            // ForecastCard
            setForecastCard(
                {
                    windSpeed: wind_speed_10m.y,
                    windGusts: wind_gusts_10m.y,
                    windDirection: wind_direction_10m.y,
                    time: wind_speed_10m.x,
                    weather_code: weather_code.y,
                    is_day: is_day.y
                }
            )


            // Daten für Windgeschwindigkeit und Böen
            if (wind_speed_10m && wind_gusts_10m) {
                setWindSpeedAndGustsData([
                    convertToPlotlyChartFormat(wind_speed_10m, 'line', 'y1'),
                    convertToPlotlyChartFormat(wind_gusts_10m, 'bar', 'y1', 'rgba(255, 165, 0, 0.7)'), // Orange für Böen
                ]);
            }

            // Daten für Windrichtung (separates Diagramm, da y-Achse anders ist)
            if (wind_direction_10m) {
                setWindDirectionData([
                    convertToPlotlyChartFormat(wind_direction_10m, 'line', 'y1', 'green'),
                ]);
            }

            // Daten für CAPE und Regen (potenzielle Gewittergefahr)
            if (cape && rain) {
                setCapeAndRainData([
                    convertToPlotlyChartFormat(cape, 'bar', 'y1', 'rgba(255, 0, 0, 0.5)'), // Rot für CAPE (Gewittergefahr)
                    convertToPlotlyChartFormat(rain, 'bar', 'y1', 'rgba(0, 0, 255, 0.5)'), // Blau für Regen
                ]);
            }

            // Wochentage für die Diagramm-Annotationen
            if (wind_speed_10m) {
                setWeekdays(weekdayAnnotations(wind_speed_10m.x, true, i18n.language));
                setIsDay({ x: is_day.x.map(time => (new Date(time).toISOString())), y: is_day.y })
            }

        } catch (error) {
            console.error("Fehler beim Abrufen der Segler-Vorhersagedaten:", error);
        }
    }

    const loadingColor = useColor('primary');

    /**
     * Handhabt das Scrollen des Vorhersagebereichs und aktualisiert die Markierung im Diagramm.
     */
    function handleScroll() {
        const scrollLeft = scrollRef.current?.scrollLeft || 0;
        const totalWidth = scrollRef.current?.clientWidth || 0;

        if (windSpeedAndGustsData && windSpeedAndGustsData.length > 0 && windSpeedAndGustsData[0].x) {
            const x = windSpeedAndGustsData[0].x;

            // Annäherung an die sichtbaren Datenpunkte
            // Annahme: Jede Karte hat eine feste Breite von ca. 110px (wie in StandardMode)
            const positionLeft = Math.round(scrollLeft / 110);
            const rightCorner = Math.round((scrollLeft + totalWidth) / 110);
            const positionRight = x.length > rightCorner ? rightCorner : x.length - 1;

            /** Setzt die Form für den aktuell sichtbaren Bereich im Plotly-Diagramm */
            setShape({ left: x[positionLeft], right: x[positionRight] });
        }
    }

    /**
     * Ermöglicht horizontales Scrollen mit dem Mausrad.
     */
    function handleWheel(event: React.WheelEvent) {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += event.deltaY; // Konvertiert vertikales zu horizontalem Scrollen
        }
    }

    const buttons = [
        { label: t('startingPage.currentWeather'), value: 1 },
        { label: t('startingPage.next2Days'), value: 2 },
        { label: t('startingPage.next14Days'), value: 14 },
    ];

    return (
        <Flex direction='column' width={{ lg: layoutConfig.pageWidth, base: 'calc(100vw - 20px)' }} gap={layoutConfig.gap} maxWidth={'100%'}>
            <Heading size="md" padding='0px'>{t('sailorPage.currentConditions')}</Heading>
            <Flex gap={layoutConfig.gap} flexDirection={{ lg: "row", base: 'column' }} flexWrap="wrap" justifyContent="center">
                {currentWeather ? // Überprüfe, ob Windgeschwindigkeit vorhanden ist
                    <>
                        <MeasurementCard measurement={t('data.waterLevel')} value={currentWeather['water_level']} unit='cm' icon={FaWater}></MeasurementCard>
                        <MeasurementCard measurement={t('data.windGusts10m')} value={currentWeather['wind_speed']} unit='km/h' icon={RiSpeedUpLine}></MeasurementCard>
                        <MeasurementCard measurement={t('data.windDirection10m')} value={currentWeather['wind_direction']} unit='°' icon={FaWind}></MeasurementCard>
                        <MeasurementCard measurement={t('data.pressureMSL')} value={currentWeather['air_pressure']} unit='hPa' icon={FaWater}></MeasurementCard> {/* FaWater könnte für Druck verwendet werden oder ein neues Icon */}
                        {/* Weitere wichtige Segler-Messwerte können hier hinzugefügt werden, z.B. Wassertemperatur, Wellenhöhe falls verfügbar */}
                    </>
                    : <OrbitProgress color={loadingColor} size="medium" />
                }
            </Flex>

            <Heading size="md" pt={layoutConfig.padding}>{t('data.forecast')}</Heading>
            <Flex gap={layoutConfig.smallGap}>
                {buttons.map(({ label, value }) => (
                    <Button
                        key={value}
                        onClick={() => setRequestDuration(value)}
                        bg={requestDuration === value ? useColor('primary') : useColor('background')}
                        color={requestDuration === value ? useColor('buttonText') : 'inherit'}
                        borderRadius={layoutConfig.buttonBorderRadius}
                        px={layoutConfig.padding}
                        py={layoutConfig.padding}
                        mr={layoutConfig.margin}
                    >
                        {label}
                    </Button>
                ))}
            </Flex>

            <Card bg={useColor('background')}
                color={useColor('text')}
                padding={layoutConfig.padding}
                overflow={'hidden'}
                borderRadius={layoutConfig.borderRadius}
            >
                <Flex
                    gap={layoutConfig.gap}
                    overflow='hidden'
                    overflowX="auto"
                    pb={layoutConfig.padding}
                    ref={scrollRef}
                    onScroll={() => handleScroll()}
                    onWheel={(e) => { handleWheel(e) }}
                    sx={{
                        "&::-webkit-scrollbar": {
                            height: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                            background: useColor('surface'),
                            borderRadius: layoutConfig.borderRadius,
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background: useColor('text'),
                            borderRadius: layoutConfig.borderRadius,
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            background: useColor('primary'),
                        }
                    }}
                >
                    {/* Hier müsstest du eine angepasste ForcastCard verwenden,
                        die Windgeschwindigkeit, Windböen und Windrichtung anzeigt.
                        Angenommen, du übergibst die relevanten Daten aus der Forecast-Antwort.
                    */}
                    {forecastCard ? forecastCard.windSpeed.map((time: any, index: any) => (
                        <ForcastCard
                            time={new Date(forecastCard.time[index])}
                            windSpeed={forecastCard.windSpeed[index]}
                            windGusts={forecastCard.windGusts[index]}
                            windDirection={forecastCard.windDirection[index]}
                            isDay={forecastCard.is_day[index]}
                            weather={forecastCard.weather_code[index]}
                            key={index}>
                            
                            </ForcastCard>
                        //     time={new Date(forecastCard.time)}
                        //     windSpeed={extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'wind_speed_10m', '', requestDuration).y[index]}
                        //     windGusts={extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'wind_gusts_10m', '', requestDuration).y[index]}
                        //     windDirection={extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'wind_direction_10m', '', requestDuration).y[index]}
                        // // Weitere relevante Daten für Segler-Vorhersagekarten
                    )) : <OrbitProgress color={loadingColor} size="medium" />}
                </Flex>
            </Card>

            <Flex gap={layoutConfig.gap}>
                {windSpeedAndGustsData && weekdays ?
                    <PlotlyChart
                        data={windSpeedAndGustsData}
                        title={t('sailorPage.windSpeedAndGustsTitle')}
                        yAxis={t('data.windspeed') + ' (km/h)'}
                        xAxis={t('data.time')}
                        customLayout={{ annotations: weekdays }}
                        movingShape={shape}
                        isDay={isDay}
                    />
                    : <OrbitProgress color={loadingColor} size="medium" />}
            </Flex>

            <Flex gap={layoutConfig.gap}>
                {windDirectionData && weekdays ?
                    <PlotlyChart
                        data={windDirectionData}
                        title={t('sailorPage.windDirectionTitle')}
                        yAxis={t('data.windDirection') + ' (°)'}
                        xAxis={t('data.time')}
                        customLayout={{ annotations: weekdays }}
                        movingShape={shape}
                        isDay={isDay}
                        startFromZero={false} // Windrichtung geht von 0-360
                    />
                    : <OrbitProgress color={loadingColor} size="medium" />}
            </Flex>

            <Flex gap={layoutConfig.gap}>
                {capeAndRainData && weekdays ?
                    <PlotlyChart
                        data={capeAndRainData}
                        title={t('sailorPage.capeAndRainTitle')}
                        yAxis={t('data.cape') + ' (J/kg)'}
                        xAxis={t('data.time')}
                        y2Axis={t('data.rain') + ' (mm)'}
                        customLayout={{ annotations: weekdays }}
                        movingShape={shape}
                        isDay={isDay}
                    />
                    : <OrbitProgress color={loadingColor} size="medium" />}
            </Flex>

            {/* Hier könnten weitere spezifische Charts für Segler folgen, z.B. Wellenhöhe, Gezeiten (falls Daten verfügbar) */}

            <DataSource></DataSource>
        </Flex>
    );
}