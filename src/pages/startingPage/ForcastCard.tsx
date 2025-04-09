import { Card, CardBody, createIcon, Flex, Icon, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";

import { IoCloudOfflineOutline, IoCloudy, IoSnow, IoSunny } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { FaDroplet } from "react-icons/fa6";

import FogSVG from '/public/assets/weather/fog.svg';
import HumiditySVG from '/public/assets/weather/humidity.svg';
import MoonSVG from '/public/assets/weather/moon.svg';
import PartlyMoonSVG from '/public/assets/weather/partlyMoon.svg';
import ParltySunnySVG from '/public/assets/weather/partlySunny.svg';
import RainySVG from '/public/assets/weather/rainy.svg';
import ThunderSVG from '/public/assets/weather/thunder.svg';
import { getWeatherIcon } from "../../components/requests/mapWeatherCodes";
import { useEffect } from "react";
import { layoutConfig, useColor, usePrimaryColor, useSecondaryTextColor, useSurfaceColor, useTextColor } from '../../components/style';


import { TbDropletFilled } from "react-icons/tb";
import { WiRaindrop, WiRaindrops } from "react-icons/wi";
import { t } from "i18next";
const SVGRepoRainy = createIcon({ displayName: "SVGRepoRainy", viewBox: "0 0 24 24", path: <image href={RainySVG} width="24" height="24" /> });
const SVGRepoPartlySunny = createIcon({ displayName: "SVGRepoPartlySunny", viewBox: "0 0 24 24", path: <image href={ParltySunnySVG} width="24" height="24" /> });
const SVGRepoThunder = createIcon({ displayName: "SVGRepoPartlySunny", viewBox: "0 0 24 24", path: <image href={ThunderSVG} width="24" height="24" /> });
const SVGRepoFog = createIcon({ displayName: "SVGRepoFog", viewBox: "0 0 24 24", path: <image href={FogSVG} width="24" height="24" /> });
const SVGRepoHumidity = createIcon({ displayName: "SVGRepoHumidity", viewBox: "0 0 24 24", path: <image href={HumiditySVG} width="24" height="24" /> });
const SVGRepoMoon = createIcon({ displayName: "SVGRepoMoon", viewBox: "0 0 24 24", path: <image href={MoonSVG} width="24" height="24" /> });
const SVGRepoPartlyMoon = createIcon({ displayName: "SVGRepoPartlyMoon", viewBox: "0 0 24 24", path: <image href={PartlyMoonSVG} width="24" height="24" /> });


export type ForcastCardProps = { time: Date, temperature: number, weather: number, rain: string, isDay: number }
export default function ForcastCard({ time, temperature, weather, rain, isDay }: ForcastCardProps) {

    useEffect(() => {
        console.log(temperature)
        console.log(time)
        console.log(time.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }))

    }, [])

    return (
        <Card
            bg={useColor('primary')}
            color={useColor('secondaryText')}
            width='fit-content'
            minWidth={'100px'}
            borderRadius={layoutConfig.borderRadius}
        >
            <CardBody padding={'0.5rem 1.75rem 0.75rem'}>
                <Flex direction='column' alignItems='center' justifyContent={"space-between"}>
                    <Text mb={layoutConfig.margin}>{time.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}</Text>

                    <Tooltip label={t('data.temperature')} bg={useColor('surface')} color={useColor('text')} hasArrow>
                        <Text fontSize={'lg'} mb={layoutConfig.margin} fontWeight={'bold'}>{Math.round(temperature)}°C</Text>
                    </Tooltip>

                    <Tooltip label={t('startingPage.currentWeather')} bg={useColor('surface')} color={useColor('text')} hasArrow>
                        <Icon as={getWeatherIcon(weather, isDay == 1).icon} color={getWeatherIcon(weather, isDay == 1).color} boxSize={12} mb={layoutConfig.margin} />
                    </Tooltip>

                    <Tooltip label={t('data.rain')} bg={useColor('surface')} color={useColor('text')} hasArrow>
                        <Flex direction={'row'} alignItems={"center"} justify={"center"} gap={'0px'}>
                            <Icon as={WiRaindrop} boxSize={6} mt={'4px'} color={useColor('secondaryText')} />
                            <Text fontSize={'s'}>{rain}%</Text>
                        </Flex>
                    </Tooltip>

                </Flex>
            </CardBody>
        </Card >
    )
}