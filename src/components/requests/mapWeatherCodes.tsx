import { createIcon } from "@chakra-ui/react";
import { IoCloudOfflineOutline, IoCloudy, IoSnow, IoSunny } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { PlotlyChartBasicFormat } from "../plotly/PlotlyChartFormat";
import { toUtcPlotlyIsoString } from "../time";
import FogSVG from '/public/assets/weather/fog.svg';
import MoonSVG from '/public/assets/weather/moon.svg';
import PartlyMoonSVG from '/public/assets/weather/partlyMoon.svg';
import ParltySunnySVG from '/public/assets/weather/partlySunny.svg';
import RainySVG from '/public/assets/weather/rainy.svg';
import ThunderSVG from '/public/assets/weather/thunder.svg';

const SVGRepoRainy = createIcon({ displayName: "SVGRepoRainy", viewBox: "0 0 24 24", path: <image href={RainySVG} width="24" height="24" /> });
const SVGRepoPartlySunny = createIcon({ displayName: "SVGRepoPartlySunny", viewBox: "0 0 24 24", path: <image href={ParltySunnySVG} width="24" height="24" /> });
const SVGRepoThunder = createIcon({ displayName: "SVGRepoPartlySunny", viewBox: "0 0 24 24", path: <image href={ThunderSVG} width="24" height="24" /> });
const SVGRepoFog = createIcon({ displayName: "SVGRepoFog", viewBox: "0 0 24 24", path: <image href={FogSVG} width="24" height="24" /> });
const SVGRepoMoon = createIcon({ displayName: "SVGRepoMoon", viewBox: "0 0 24 24", path: <image href={MoonSVG} width="24" height="24" /> });
const SVGRepoPartlyMoon = createIcon({ displayName: "SVGRepoPartlyMoon", viewBox: "0 0 24 24", path: <image href={PartlyMoonSVG} width="24" height="24" /> });


export function getWeatherIcon(code: number, isDay: boolean): { icon: IconType | any; color: string; background?: string } {
    const dayColor = '#F7CF52';
    const nightColor = '#F7CF52';
    const defaultColor = '#999999';

    const mapping: Record<number, { icon: IconType | any; color: string; background?: string }> = {
        // Clear sky
        0: isDay ? { icon: IoSunny, color: dayColor } : { icon: SVGRepoMoon, color: nightColor },

        // Mainly clear, partly cloudy, and overcast
        1: isDay ? { icon: SVGRepoPartlySunny, color: dayColor } : { icon: SVGRepoPartlyMoon, color: nightColor },
        2: isDay ? { icon: SVGRepoPartlySunny, color: dayColor } : { icon: SVGRepoPartlyMoon, color: nightColor },
        3: { icon: IoCloudy, color: defaultColor },

        // Fog
        45: { icon: SVGRepoFog, color: defaultColor },
        48: { icon: SVGRepoFog, color: defaultColor },

        // Drizzle
        51: { icon: SVGRepoRainy, color: '#4DA6FF' },
        53: { icon: SVGRepoRainy, color: '#4DA6FF' },
        55: { icon: SVGRepoRainy, color: '#4DA6FF' },
        56: { icon: SVGRepoRainy, color: '#4DA6FF' },
        57: { icon: SVGRepoRainy, color: '#4DA6FF' },

        // Rain
        61: { icon: SVGRepoRainy, color: '#0066CC' },
        63: { icon: SVGRepoRainy, color: '#0066CC' },
        65: { icon: SVGRepoRainy, color: '#0066CC' },
        66: { icon: SVGRepoRainy, color: '#0066CC' },
        67: { icon: SVGRepoRainy, color: '#0066CC' },

        // Snow fall
        71: { icon: IoSnow, color: '#FFFFFF' },
        73: { icon: IoSnow, color: '#FFFFFF' },
        75: { icon: IoSnow, color: '#FFFFFF' },
        77: { icon: IoSnow, color: '#FFFFFF' },

        // Rain showers
        80: { icon: SVGRepoRainy, color: '#4DA6FF' },
        81: { icon: SVGRepoRainy, color: '#4DA6FF' },
        82: { icon: SVGRepoRainy, color: '#0066CC' },

        // Snow showers
        85: { icon: IoSnow, color: '#FFFFFF' },
        86: { icon: IoSnow, color: '#FFFFFF' },

        // Thunderstorm
        95: { icon: SVGRepoThunder, color: '#0000FF' },
        96: { icon: SVGRepoThunder, color: '#0000FF' },
        99: { icon: SVGRepoThunder, color: '#0000FF' },
        // Freezing rain
        74: { icon: IoCloudOfflineOutline, color: '#000000' }
    };

    return mapping[code] || { icon: IoCloudy, color: defaultColor };
}

export function getWeatherAsciiDayAndNight(code: number, isDay: boolean) {
    const asciiMap: Record<number, { day: string; night: string }> = {
        0: { day: "🌞", night: "🌙" },
        1: { day: "🌤️", night: "🌖" },
        2: { day: "⛅️", night: "🌘" },
        3: { day: "☁️", night: "☁️" },
        45: { day: "🌫️", night: "🌫️" },
        48: { day: "🌫️", night: "🌫️" },
        51: { day: "🌦️", night: "🌦️" },
        53: { day: "🌧️", night: "🌧️" },
        55: { day: "🌧️", night: "🌧️" },
        56: { day: "🌧️", night: "🌧️" },
        57: { day: "🌧️", night: "🌧️" },
        61: { day: "🌧️", night: "🌧️" },
        63: { day: "🌧️", night: "🌧️" },
        65: { day: "🌧️", night: "🌧️" },
        66: { day: "🌧️", night: "🌧️" },
        67: { day: "🌧️", night: "🌧️" },
        71: { day: "❄️", night: "❄️" },
        73: { day: "❄️", night: "❄️" },
        75: { day: "❄️", night: "❄️" },
        77: { day: "❄️", night: "❄️" },
        80: { day: "🌦️", night: "🌦️" },
        81: { day: "🌦️", night: "🌦️" },
        82: { day: "🌧️", night: "🌧️" },
        85: { day: "🌨️", night: "🌨️" },
        86: { day: "🌨️", night: "🌨️" },
        95: { day: "⛈️", night: "⛈️" },
        96: { day: "⛈️", night: "⛈️" },
        99: { day: "⛈️", night: "⛈️" },
        74: { day: "❄️", night: "❄️" }
    };

    return isDay ? asciiMap[code]?.day || "❓" : asciiMap[code]?.night || "❓";
};

export function convertCodesAndIsDaysToAscii(weatherCodes: PlotlyChartBasicFormat, isDayFlags: PlotlyChartBasicFormat, maxY: number): PlotlyChartBasicFormat {
    const adjustedTimes = weatherCodes.x.map(time => {
        // const date = new Date(time);
        // date.setHours(date.getHours() + 2); // Adjust for 2-hour difference
        return toUtcPlotlyIsoString(time); // or return date.toString() depending on format
    });

    return {
        x: adjustedTimes,
        y: Array(weatherCodes.x.length).fill(maxY),
        text: weatherCodes.y.map((code, i) => {
            return getWeatherAsciiDayAndNight(code, Boolean(isDayFlags.y[i]))
        }
        ),
        name: weatherCodes.name
    }
}