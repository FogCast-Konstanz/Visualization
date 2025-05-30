import { Card, CardBody, createIcon, Flex, Icon, Text, Tooltip } from "@chakra-ui/react";
import { t } from "i18next";
import { WiRaindrop } from "react-icons/wi";
import { getWeatherIcon } from "../../components/requests/mapWeatherCodes";
import { layoutConfig, useColor } from '../../components/style';


export type ForcastCardProps = { time: Date, temperature: number, weather: number, rain: string, isDay: number }
export default function ForcastCard({ time, temperature, weather, rain, isDay }: ForcastCardProps) {

    return (
        <Card
            bg={useColor('primary')}
            color={useColor('secondaryText')}
            width='fit-content'
            minWidth={'110px'}
            borderRadius={layoutConfig.borderRadius}
        >
            <CardBody padding={'0.5rem 1.75rem 0.75rem'}>
                <Flex direction='column' alignItems='center' justifyContent={"space-between"}>
                    <Flex direction={'column'} alignItems={"center"} mb={layoutConfig.margin}>
                        <Text>{time.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}</Text>
                        <Text fontSize={'xs'}>{time.toLocaleDateString("de-DE")}</Text>
                    </Flex>

                    <Tooltip label={t('data.temperature')} bg={useColor('surface')} color={useColor('text')} hasArrow>
                        <Text fontSize={'lg'} mb={layoutConfig.margin} fontWeight={'bold'}>{Math.round(temperature)}°C</Text>
                    </Tooltip>

                    <Tooltip label={t('startingPage.currentWeather')} bg={useColor('surface')} color={useColor('text')} hasArrow>
                        <Text><Icon as={getWeatherIcon(weather, isDay == 1).icon} color={getWeatherIcon(weather, isDay == 1).color} boxSize={12} mb={layoutConfig.margin} /></Text>
                    </Tooltip>

                    <Tooltip label={t('data.rain')} bg={useColor('surface')} color={useColor('text')} hasArrow>
                        <Flex direction={'row'} alignItems={"center"} justify={"center"} gap={'0px'}>
                            <Icon as={WiRaindrop} boxSize={6} mt={'4px'} color={useColor('secondaryText')} />
                            <Text fontSize={'s'}>{Math.round(Number(rain) * 10) / 10} l</Text>
                        </Flex>
                    </Tooltip>

                </Flex>
            </CardBody>
        </Card >
    )
}