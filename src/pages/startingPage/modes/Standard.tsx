import { Button, Card, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTemperatureHalf, FaWater } from "react-icons/fa6"
import { RiWindyFill } from "react-icons/ri"
import { WiHumidity } from "react-icons/wi"
import { OrbitProgress } from 'react-loading-indicators'
import DataSource from '../../../components/DataSource'
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat, PlotlyChartDataFormat, weekdayAnnotations } from '../../../components/plotly/PlotlyChartFormat'
import { fetchActualWeather } from '../../../components/requests/actualBackend'
import { default as DWDForcast } from '../../../components/requests/dwdForcast'
import PlotlyChart from '../../../components/ui/plotly/DefaultChart'
import ForcastCard, { ForcastCardProps } from '../ForcastCard'
import MeasurementCard from '../MeasurementCard'
import { extractCurrentWeatherForecastHourly, extractCurrentWeatherForecastHourlyLastXDays, fetchCurrentForecast } from '../../../components/requests/currentForecacstBackend'

export default function StandardMode() {
  const { t } = useTranslation();

  const [requestDuration, setRequestDuration] = useState<number>(1);

  const [forecast, setForecast] = useState<PlotlyChartDataFormat[] | null>(null);
  const [forecastSymbols, setForecastSymbols] = useState<PlotlyChartBasicFormat | null>(null);
  const [forecastIcons, setForecastIcons] = useState<ForcastCardProps[] | null>(null);
  const [forecastCard, setForecastCard] = useState<any | null>(null);

  const [currentWeather, setCurrentWeather] = useState<Record<string, string>>({})
  const [weekdays, setWeekdays] = useState<any | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null);
  const [shape, setShape] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    handleScroll();
  }, [requestDuration])

  useEffect(() => {
    handleScroll();
  }, [forecast])

  async function fetchData() {
    const weather = await fetchActualWeather();
    const reformattedWeather = weather.reduce((acc, entry) => {
      acc[entry.name] = entry.value;
      return acc;
    }, {} as Record<string, string>);
    setCurrentWeather(reformattedWeather);
    
    const currentForecast = await fetchCurrentForecast('icon_global');

    /* Convert to Plotly format */
    const temperature = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'apparent_temperature', 'Temperature', requestDuration)
    const humidity = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'rain', 'Rain', requestDuration)
    const weather_code = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'weather_code', 'Weather Code', requestDuration)
    const is_day = extractCurrentWeatherForecastHourlyLastXDays(currentForecast, 'is_day', 'isDay', requestDuration)

    setForecastCard(
      {
        temperature: temperature.y,
        humidity: humidity.y,
        time: temperature.x,
        weather_code: weather_code.y,
        is_day: is_day.y
      }
    )

    if (weather_code && humidity && temperature) {
      setForecast([convertToPlotlyChartFormat(humidity, 'scatter', 'y2'), convertToPlotlyChartFormat(temperature, 'scatter', 'y1')])
      setForecastSymbols(convertToPlotlyChartFormat(weather_code, 'weatherIcon'))
      setWeekdays(weekdayAnnotations(temperature.x))
    }

    setForecastIcons(DWDForcast.getHourlyForcastValuesIcon(requestDuration))
  };

  const loadingColor = useColorModeValue('#4C8C8C', '#AFDBF5')
  const markingColor = useColorModeValue('#4f8b8bBA', '#4C8C8CBA')

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

  function handleWheel(event: React.WheelEvent){
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += event.deltaY; // Converts vertical to horizontal scroll
    }
  };

  return (
    <Flex direction='column' width={{ lg: "calc(100vw - 250px)", base: 'calc(100vw - 20px)' }} gap='10px' maxWidth={'100%'}>
      <Heading size="md" padding='0px'>{t('startingPage.currentWeather')}</Heading>
      <Flex gap='10px' flexDirection={{ lg: "row", base: 'column' }}>
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

      <Heading size="md" pt={'10px'}>{t('data.forecast')}</Heading>
      <Flex gap={'10px'}>
        <Button onClick={() => setRequestDuration(1)}>{t('startingPage.currentWeather')}</Button>
        <Button onClick={() => setRequestDuration(2)}>{t('startingPage.next2Days')}</Button>
        <Button onClick={() => setRequestDuration(14)}>{t('startingPage.next14Days')}</Button>
      </Flex>


      <Card bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
        color={useColorModeValue('custom_light.text', 'custom_dark.text')}
        padding='10px'
        overflow={'hidden'}
      >
        <Flex
          gap='10px'
          overflow='hidden'
          overflowX="auto"
          pb={'10px'}
          ref={scrollRef}
          onScroll={() => handleScroll()}
          onWheel={(e) => {handleWheel(e)}}
          sx={{
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: useColorModeValue('custom_light.surface', 'custom_dark.surface'),
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: useColorModeValue('custom_light.text', 'custom_dark.text'),
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: useColorModeValue('custom_light.primary_variant', 'custom_dark.primary_variant'),
            }
          }}
        >
          {forecastCard ? forecastCard.temperature.map((_: any, index: any) => (
            <ForcastCard 
              time={new Date(forecastCard.time[index])}
              temperature={forecastCard.temperature[index]}
              humidity={forecastCard.humidity[index]}
              isDay={forecastCard.is_day[index]}
              weather={forecastCard.weather_code[index]}
              key={index}></ForcastCard>
          )) : <OrbitProgress color={loadingColor} size="medium" />}
        </Flex>
      </Card>

      <Flex gap='10px'>
        {forecast && forecastSymbols ?
          <PlotlyChart data={[...forecast, forecastSymbols]} title={t('data.forecast')} yAxis={t('data.temperature')} xAxis={t('data.time')} y2Axis={t('data.humidity')} showNow={true} customLayout={{ annotations: weekdays, shapes: [shape] }} />
          : <OrbitProgress color={loadingColor} size="medium" />}
      </Flex>

      <DataSource></DataSource>
    </Flex>
  )
}
