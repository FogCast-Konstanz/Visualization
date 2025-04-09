import { Button, Card, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTemperatureHalf, FaWater } from "react-icons/fa6"
import { RiWindyFill } from "react-icons/ri"
import { WiHumidity } from "react-icons/wi"
import { OrbitProgress } from 'react-loading-indicators'
import DataSource from '../../impressum/DataSource'
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat, PlotlyChartDataFormat, weekdayAnnotations } from '../../../components/plotly/PlotlyChartFormat'
import { fetchActualWeather } from '../../../components/requests/actualBackend'
import { default as DWDForcast } from '../../../components/requests/dwdForcast'
import PlotlyChart from '../../../components/ui/plotly/DefaultChart'
import ForcastCard, { ForcastCardProps } from '../ForcastCard'
import MeasurementCard from '../MeasurementCard'
import { extractCurrentWeatherForecastHourly, extractCurrentWeatherForecastHourlyLastXDays, fetchCurrentForecast } from '../../../components/requests/currentForecacstBackend'
import { layoutConfig, useColor, usePrimaryColor, usePrimaryVariantColor, useSurfaceColor, useTextColor } from '../../../components/style';
import { convertCodesAndIsDaysToAscii } from '../../../components/requests/mapWeatherCodes'


export default function StandardMode() {
  const { t } = useTranslation();

  const [requestDuration, setRequestDuration] = useState<number>(1);

  const [forecast, setForecast] = useState<PlotlyChartDataFormat[] | null>(null);
  const [forecastSymbols, setForecastSymbols] = useState<PlotlyChartBasicFormat | null>(null);
  const [forecastCard, setForecastCard] = useState<any | null>(null);

  const [cloudData, setCloudData] = useState<PlotlyChartDataFormat[] | null>(null)

  const [currentWeather, setCurrentWeather] = useState<Record<string, string>>({})
  const [weekdays, setWeekdays] = useState<any | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null);
  const [shape, setShape] = useState<any>(null);

  const buttons = [
    { label: t('startingPage.currentWeather'), value: 1 },
    { label: t('startingPage.next2Days'), value: 2 },
    { label: t('startingPage.next14Days'), value: 14 },
  ];

  useEffect(() => {
    fetchCurrentForecastData();
    fetchActualWeatherData();
  }, []);

  useEffect(() => {
    fetchCurrentForecastData();
    fetchActualWeatherData();
    handleScroll();
  }, [requestDuration])

  useEffect(() => {
    handleScroll();
  }, [forecast])


  async function fetchActualWeatherData() {
    const weather = await fetchActualWeather();
    const reformattedWeather = weather.reduce((acc, entry) => {
      acc[entry.name] = entry.value;
      return acc;
    }, {} as Record<string, string>);

    setCurrentWeather(reformattedWeather);
  }

  async function fetchCurrentForecastData() {
    const currentForecast = await fetchCurrentForecast('icon_global');

    /* Convert to Plotly format */
    const temperature = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'apparent_temperature', 'Temperature', requestDuration)
    const humidity = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'relative_humidity_2m', 'Humidity', requestDuration)
    const rain = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'rain', 'Rain', requestDuration)
    const weather_code = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'weather_code', 'Weather Code', requestDuration)
    const is_day = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'is_day', 'isDay', requestDuration)

    // Set the cards
    setForecastCard(
      {
        temperature: temperature.y,
        rain: rain.y,
        time: temperature.x,
        weather_code: weather_code.y,
        is_day: is_day.y
      }
    )

    console.log(temperature.x[0], rain.x[0], new Date(temperature.x[0]))

    // Set data for plotly graph: temperature weather code and humidity
    if (weather_code && humidity && temperature) {
      setForecast([
        convertToPlotlyChartFormat(humidity, 'line', 'y2'),
        convertToPlotlyChartFormat(temperature, 'line', 'y1'),
        convertToPlotlyChartFormat(rain, 'bar', 'y1'),
      ])
      setForecastSymbols(convertToPlotlyChartFormat(convertCodesAndIsDaysToAscii(weather_code, is_day), 'weatherIcon'))
      setWeekdays(weekdayAnnotations(temperature.x))
    }

    // Set cloud cover
    const cloud_cover_high = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'cloud_cover_high', 'Cloud Cover High', requestDuration)
    const cloud_cover_mid = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'cloud_cover_mid', 'Cloud Cover High', requestDuration)
    const cloud_cover_low = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'cloud_cover_low', 'Cloud Cover High', requestDuration)
    // const visibility = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'cloud_cover_low', 'Cloud Cover High', requestDuration)


    const scaleCloud = (values: number[], center: number) => {
      const up = values.map(v => center + (v / 12));
      const down = values.map(v => center - (v / 12)).reverse();
      return { up, down };
    };

    const xTime = cloud_cover_high.x.concat([...cloud_cover_high.x].reverse())
    const scaledHigh = scaleCloud(cloud_cover_high.y, 75)
    const scaledMid = scaleCloud(cloud_cover_mid.y, 50)
    const scaledLow = scaleCloud(cloud_cover_low.y, 25)
    setCloudData(
      [
        convertToPlotlyChartFormat({ x: xTime, y: scaledHigh.up.concat(scaledHigh.down), name: 'High Cloud Cover' }, 'cloud', 'y1', 'lightblue'),
        convertToPlotlyChartFormat({ x: xTime, y: scaledMid.up.concat(scaledMid.down), name: 'Mid Cloud Cover' }, 'cloud', 'y1', '#808080'),
        convertToPlotlyChartFormat({ x: xTime, y: scaledLow.up.concat(scaledLow.down), name: 'Low Cloud Cover' }, 'cloud', 'y1', '#202020'),
        // convertToPlotlyChartFormat({ x: xTime, y: data.hourly.visibility.map((v: number) => v / 1000), name: 'Visibility' }, 'dashedLine', 'y2', 'orange')
      ]
    )
  };

  const loadingColor = useColor('primary')
  const markingColor = useColor('primaryVariant')

  function handleScroll() {
    const scrollLeft = scrollRef.current?.scrollLeft || 0;
    const totalWidth = scrollRef.current?.clientWidth || 0;

    if (forecast && forecast.length > 1) {
      const x = forecast[1].x

      const positionLeft = Math.round(scrollLeft / 110);
      const rightCorner = Math.round((scrollLeft + totalWidth) / 110);

      const positionRight = x.length > rightCorner ? rightCorner : x.length - 1

      /** Set the shape with the current position */
      setShape({
        type: "rect",
        x0: x[positionLeft],
        x1: x[positionRight],
        y0: 0, y1: 1,
        yref: "paper", // Maps 0-1 to full height
        fillcolor: markingColor,
        opacity: 0.5,
        // layer: "below",
        line: { width: 0 },
      })
    }
  }

  function handleWheel(event: React.WheelEvent) {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += event.deltaY; // Converts vertical to horizontal scroll
    }
  };

  return (
    <Flex direction='column' width={{ lg: layoutConfig.pageWidth, base: 'calc(100vw - 20px)' }} gap={layoutConfig.gap} maxWidth={'100%'}>
      <Heading size="md" padding='0px'>{t('startingPage.currentWeather')}</Heading>
      <Flex gap={layoutConfig.gap} flexDirection={{ lg: "row", base: 'column' }}>
        {currentWeather ?
          <>
            <MeasurementCard measurement={t('data.temperature')} value={currentWeather['temperature']} unit='°C' icon={FaTemperatureHalf}></MeasurementCard>
            <MeasurementCard measurement={t('data.humidity')} value={String(Math.round((parseFloat(currentWeather['humidity']) * 100) * 100) / 100)} unit='%' icon={WiHumidity}></MeasurementCard>
            <MeasurementCard measurement={t('data.waterLevel')} value={currentWeather['water_level']} unit='cm' icon={FaWater}></MeasurementCard>
            <MeasurementCard measurement={t('data.windspeed')} value={currentWeather['wind_speed']} unit='km/h' icon={RiWindyFill}></MeasurementCard>
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
            color={requestDuration === value ? useColor('text') : 'inherit'}
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
          {forecastCard ? forecastCard.temperature.map((_: any, index: any) => (
            <ForcastCard
              time={new Date(forecastCard.time[index])}
              temperature={forecastCard.temperature[index]}
              rain={forecastCard.rain[index]}
              isDay={forecastCard.is_day[index]}
              weather={forecastCard.weather_code[index]}
              key={index}></ForcastCard>
          )) : <OrbitProgress color={loadingColor} size="medium" />}
        </Flex>
      </Card>

      <Flex gap={layoutConfig.gap}>
        {forecast && forecastSymbols ?
          <PlotlyChart
            data={[...forecast, forecastSymbols]}
            title={t('data.forecast')}
            yAxis={t('data.temperature')}
            xAxis={t('data.time')}
            y2Axis={t('data.humidity')}
            showNow={true}
            customLayout={{ annotations: weekdays, shapes: [shape] }} />
          : <OrbitProgress color={loadingColor} size="medium" />}
      </Flex>

      <Flex>
        {cloudData ?
          <PlotlyChart
            title={'CloudCover'}
            data={cloudData}
            yAxis={t('data.cloud')}
            xAxis={t('data.time')}
            y2Axis={t('data.visibility')}
            showNow={true}
            customLayout={{ annotations: weekdays, shapes: [shape] }} 
            startFromZero={false}
            />
          : <OrbitProgress color={loadingColor} size="medium" />}
      </Flex>

      <DataSource></DataSource>
    </Flex>
  )
}
