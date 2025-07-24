import { Card, CardBody, ComponentWithAs, createIcon, Flex, Icon, IconProps, Text, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { WiRaindrop } from "react-icons/wi";
import { getWeatherIcon } from "../../components/requests/mapWeatherCodes";
import { layoutConfig, useColor } from '../../components/style';

// Definiere einen Typ, der alle möglichen Props für beide Modi enthält
export type ForecastCardProps = {
    time: Date;
    isDay: number;
    // Standard-Wetterdaten
    temperature?: number;
    weather?: number; // weather_code
    rain?: number; // Hinzufüge 'rain' als number für Berechnungen

    // Segler-spezifische Daten (optional)
    windSpeed?: number;
    windGusts?: number;
    windDirection?: number; // In Grad
};

export default function ForcastCard({
    time,
    isDay,
    temperature,
    weather,
    rain,
    windSpeed,
    windGusts,
    windDirection,
}: ForecastCardProps) {
    const { t } = useTranslation();

    const isSailorMode = windSpeed !== undefined || windGusts !== undefined || windDirection !== undefined;

    // Funktion zum Konvertieren von Grad in Himmelsrichtungen (optional, für Tooltip)
    const getWindDirectionText = (degrees: number | undefined) => {
        if (degrees === undefined) return '';
        if (degrees >= 337.5 || degrees < 22.5) return t('direction.N');
        if (degrees >= 22.5 && degrees < 67.5) return t('direction.NE');
        if (degrees >= 67.5 && degrees < 112.5) return t('direction.E');
        if (degrees >= 112.5 && degrees < 157.5) return t('direction.SE');
        if (degrees >= 157.5 && degrees < 202.5) return t('direction.S');
        if (degrees >= 202.5 && degrees < 247.5) return t('direction.SW');
        if (degrees >= 247.5 && degrees < 292.5) return t('direction.W');
        if (degrees >= 292.5 && degrees < 337.5) return t('direction.NW');
        return '';
    };

    const WindArrowIconComponent = (direction: number | undefined): ComponentWithAs<"svg", IconProps> | null => {
        if (direction === undefined) {
            return null;
        }

        // `wind_direction_10m` gives the direction from which the wind comes.
        // To draw an arrow indicating WHERE the wind is blowing,
        // we add 180 degrees to the direction from which the wind comes.
        const effectiveRotation = direction + 180;

        return createIcon({
            displayName: 'WindDirectionArrow',
            viewBox: '0 0 24 24',
            path: (
                <path
                    fill="currentColor"
                    d="M6.19957 20.6341L11.8683 10.2414C11.9252 10.1372 12.0748 10.1372 12.1317 10.2414L17.8004 20.6341C17.8677 20.7575 17.7436 20.8974 17.613 20.8452L13.077 19.0308C13.0291 19.0116 12.9944 18.9692 12.9852 18.9184L12.1476 14.3117C12.1177 14.1475 11.8823 14.1475 11.8524 14.3117L11.0148 18.9184C11.0056 18.9692 10.9709 19.0116 10.923 19.0308L6.38697 20.8452C6.25644 20.8974 6.13226 20.7575 6.19957 20.6341Z"
                    transform={`rotate(${effectiveRotation}, 12, 12)`}
                />
            ),
        });
    };

    // Before rendering, store the potential icon component in a variable
    const [currentWindIcon, setCurrentWeather] = useState<ComponentWithAs<"svg", IconProps> | null>(WindArrowIconComponent(windDirection));

    return (
        <Card
            bg={useColor('primary')}
            color={useColor('secondaryText')}
            width='fit-content'
            minWidth={'120px'}
            borderRadius={layoutConfig.borderRadius}
        >
            <CardBody padding={'0.5rem 1.75rem 0.75rem'}>
                <Flex direction='column' alignItems='center' justifyContent={"space-between"}>
                    <Flex direction={'column'} alignItems={"center"} mb={layoutConfig.margin}>
                        <Text>{time.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}</Text>
                        <Text fontSize={'xs'}>{time.toLocaleDateString("de-DE")}</Text>
                    </Flex>

                    {isSailorMode ? (
                        <>
                            <Tooltip label={t('data.windSpeed10m')} bg={useColor('surface')} color={useColor('text')} hasArrow>
                                <Flex direction={'row'} alignItems={"center"} mb={layoutConfig.margin}>
                                    <Text fontSize={'lg'} fontWeight={'bold'}>{Math.round(windSpeed || 0)} km/h</Text>
                                </Flex>
                            </Tooltip>

                            <Tooltip label={`${t('data.windDirection10m')}: ${getWindDirectionText(windDirection)}`} bg={useColor('surface')} color={useColor('text')} hasArrow>
                                <Text>
                                    {currentWindIcon && ( // This check acts as a type guard for currentWindIcon
                                        <Icon as={currentWindIcon} color={useColor('secondaryText')} boxSize={12} mb={layoutConfig.margin} />
                                    )}
                                </Text>
                            </Tooltip>

                            <Tooltip label={t('data.windGusts10m')} bg={useColor('surface')} color={useColor('text')} hasArrow>
                                <Flex direction={'row'} alignItems={"center"} mb={layoutConfig.margin}>
                                    <Text fontSize={'md'}>{Math.round(windGusts || 0)} km/h ({t('data.windGusts10m')})</Text>
                                </Flex>
                            </Tooltip>

                        </>
                    ) : (
                        <>
                            <Tooltip label={t('data.temperature')} bg={useColor('surface')} color={useColor('text')} hasArrow>
                                <Text fontSize={'lg'} mb={layoutConfig.margin} fontWeight={'bold'}>{Math.round(temperature || 0)}°C</Text>
                            </Tooltip>

                            <Tooltip label={t('startingPage.currentWeather')} bg={useColor('surface')} color={useColor('text')} hasArrow>
                                <Text>
                                    {weather !== undefined && (
                                        <Icon as={getWeatherIcon(weather, isDay == 1).icon} color={getWeatherIcon(weather, isDay == 1).color} boxSize={12} mb={layoutConfig.margin} />
                                    )}
                                </Text>
                            </Tooltip>

                            <Tooltip label={t('data.rain')} bg={useColor('surface')} color={useColor('text')} hasArrow>
                                <Flex direction={'row'} alignItems={"center"} justify={"center"} gap={'0px'}>
                                    <Icon as={WiRaindrop} boxSize={6} mt={'4px'} color={useColor('secondaryText')} />
                                    <Text fontSize={'s'}>{String(Math.round((rain || 0) * 100) / 10)}mm</Text>
                                </Flex>
                            </Tooltip>
                        </>
                    )}
                </Flex>
            </CardBody>
        </Card>
    );
}