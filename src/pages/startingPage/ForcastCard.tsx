import { background, Card, CardBody, CardHeader, createIcon, Flex, Heading, Icon, Text, useColorModeValue } from "@chakra-ui/react"

import { IoSunny, IoPartlySunny, IoCloudy, IoRainy, IoSnow, IoThunderstorm,  } from "react-icons/io5";
import { GiWaterDrop } from "react-icons/gi";
import { IconType } from "react-icons/lib";
import RainySVG from '/public/assets/weather/rainy.svg'
import ParltySunnySVG from '/public/assets/weather/partlySunny.svg'
import ThunderSVG from '/public/assets/weather/thunder.svg'

const SVGRepoRainy = createIcon({displayName: "SVGRepoRainy", viewBox: "0 0 24 24", path: <image href={RainySVG} width="24" height="24" />});
const SVGRepoPartlySunny = createIcon({displayName: "SVGRepoPartlySunny", viewBox: "0 0 24 24", path: <image href={ParltySunnySVG} width="24" height="24" />});
const SVGRepoThunder = createIcon({displayName: "SVGRepoPartlySunny", viewBox: "0 0 24 24", path: <image href={ThunderSVG} width="24" height="24" />});


export type ForcastCardProps = { time: string, temperature: string, weather: 'cloudy' | 'rainy' | 'sunny' | 'partlySunny' | 'snow' | 'thunder', humidity: string }
export default function ForcastCard({ time, temperature, weather, humidity }: ForcastCardProps) {

    const weatherIcon: {[key: string]: {icon: IconType | any, color: string, background?: string}} = {
        'sunny': { 'icon': IoSunny, 'color': '#F7CF52' },
        'partlySunny': { 'icon': SVGRepoPartlySunny, 'color': '#F7CF52' },
        'cloudy': { 'icon': IoCloudy, 'color': '#999999' },
        'rainy': {'icon': SVGRepoRainy, 'color': 'blue'},
        'snow': {'icon': IoSnow, 'color': 'white'},
        'thunder': {'icon': SVGRepoThunder, 'color': 'blue'}
    }
    
    return (
        <Card
            bg={useColorModeValue('custom_light.primary_variant', 'custom_dark.primary_variant')}
            color={useColorModeValue('custom_light.secondarytext', 'custom_dark.secondarytext')}
            width='fit-content'
            borderRadius={'20px'}
            >
            <CardBody padding={'0.5rem 1.75rem 0.75rem'}>
                <Flex direction='column' alignItems='center' justifyContent={"space-between"}>
                    <Text mb={'0.75rem'}>{time}</Text>
                    <Text fontSize={'lg'} mb={'0.5rem'} fontWeight={'bold'}>{temperature}°C</Text>
                    <Icon as={weatherIcon[weather].icon} boxSize={12} color={weatherIcon[weather].color} mb={'0.75rem'} />
                    {/* <Icon as={SVGRepoRainy} boxSize={12} color={weatherIcon[weather].color} mb={'0.75rem'} /> */}
                    <Flex direction={'row'} alignItems={"center"} gap={'5px'}><Icon as={GiWaterDrop} boxSize={3} color={useColorModeValue('custom_light.secondarytext', 'custom_dark.secondarytext')}/><Text fontSize={'s'}>{humidity}</Text></Flex>
                </Flex> 
            </CardBody>
        </Card>
    )
}