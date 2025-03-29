import { Box, Text, Icon } from "@chakra-ui/react";
import { FaSun, FaCloud, FaCloudRain, FaSnowflake } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { Card, CardBody, createIcon, Flex, useColorModeValue } from "@chakra-ui/react";

import { IoCloudOfflineOutline, IoCloudy, IoSnow, IoSunny } from "react-icons/io5";
import FogSVG from '/public/assets/weather/fog.svg';
import HumiditySVG from '/public/assets/weather/humidity.svg';
import MoonSVG from '/public/assets/weather/moon.svg';
import PartlyMoonSVG from '/public/assets/weather/partlyMoon.svg';
import ParltySunnySVG from '/public/assets/weather/partlySunny.svg';
import RainySVG from '/public/assets/weather/rainy.svg';
import ThunderSVG from '/public/assets/weather/thunder.svg';

const SVGRepoRainy = createIcon({displayName: "SVGRepoRainy", viewBox: "0 0 24 24", path: <image href={RainySVG} width="24" height="24" />});
const SVGRepoPartlySunny = createIcon({displayName: "SVGRepoPartlySunny", viewBox: "0 0 24 24", path: <image href={ParltySunnySVG} width="24" height="24" />});
const SVGRepoThunder = createIcon({displayName: "SVGRepoPartlySunny", viewBox: "0 0 24 24", path: <image href={ThunderSVG} width="24" height="24" />});
const SVGRepoFog = createIcon({displayName: "SVGRepoFog", viewBox: "0 0 24 24", path: <image href={FogSVG} width="24" height="24" />});
const SVGRepoHumidity = createIcon({displayName: "SVGRepoHumidity", viewBox: "0 0 24 24", path: <image href={HumiditySVG} width="24" height="24" />});
const SVGRepoMoon = createIcon({displayName: "SVGRepoMoon", viewBox: "0 0 24 24", path: <image href={MoonSVG} width="24" height="24" />});
const SVGRepoPartlyMoon = createIcon({displayName: "SVGRepoPartlyMoon", viewBox: "0 0 24 24", path: <image href={PartlyMoonSVG} width="24" height="24" />});

// Function to map weather codes to descriptions
const getWeatherDescription = (code: number): string => {
    const descriptions: Record<number, string> = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        51: "Drizzle",
        61: "Rain",
        71: "Snowfall",
    };
    return descriptions[code] || "Unknown weather condition";
};

// Function to map weather codes to icons
export function getWeatherIcon(code: number, isDay: boolean): any {
    // const icons: Record<number, JSX.Element> = {
    //     0: <FaSun />,
    //     1: <FaSun />,
    //     2: <FaCloud />,
    //     3: <FaCloud />,
    //     45: <FaCloud />,
    //     51: <FaCloudRain />,
    //     61: <FaCloudRain />,
    //     71: <FaSnowflake />,
    // };
    // return icons[code] || <FaCloud />;

    const weatherIcon: { [key: number]: { icon: IconType | any, color: string, background?: string } } = {
        0: isDay ? { 'icon': IoSunny, 'color': '#F7CF52' } : { 'icon': SVGRepoMoon, 'color': '#F7CF52' },
        1: isDay ? { 'icon': SVGRepoPartlySunny, 'color': '#F7CF52' } : { 'icon': SVGRepoPartlyMoon, 'color': '#F7CF52' },
        2: isDay ? { 'icon': SVGRepoPartlySunny, 'color': '#F7CF52' } : { 'icon': SVGRepoPartlyMoon, 'color': '#F7CF52' },
        3: { 'icon': IoCloudy, 'color': '#999999' },
        45: { 'icon': SVGRepoRainy, 'color': 'blue' },
        71: { 'icon': IoSnow, 'color': 'white' },
        72: { 'icon': SVGRepoFog, 'color': 'white' },
        73: { 'icon': SVGRepoThunder, 'color': 'blue' },
        74: { 'icon': IoCloudOfflineOutline, 'color': 'black' }
    }

    return weatherIcon[code] || weatherIcon[3]
};


// Function to map weather codes to ASCII symbols
export function getWeatherAscii(code: number): string {
    const asciiMap: Record<number, string> = {
        0: "☀️",
        1: "⛅",
        2: "⛅",
        3: "☁️",
        45: "🌫",
        51: "🌧",
        61: "🌦",
        71: "❄️",
    };
    return asciiMap[code] || "❓";
};

// Example usage component
// const WeatherDisplay = ({ code }: { code: number }) => {
//     return (
//         <Box textAlign="center" p={4} borderWidth={1} borderRadius="md">
//             <Icon as={() => getWeatherIcon(code)} boxSize={10} />
//             <Text fontSize="xl">{getWeatherDescription(code)}</Text>
//             <Text fontSize="2xl">{getWeatherAscii(code)}</Text>
//         </Box>
//     );
// };

// export default WeatherDisplay;
