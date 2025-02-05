import { Card, CardBody, CardHeader, Flex, Heading, useColorModeValue } from "@chakra-ui/react"

type Input = { time: string, temperature: string, weather: 'cloudy' | 'rainy' | 'sunny', humidity: string }
export default function ForcastCard({ time, temperature, weather, humidity }: Input) {

    return (
        <Card
            bg={useColorModeValue('custom_light.primary', 'custom_dark.primary')}
            color={useColorModeValue('custom_light.secondarytext', 'custom_dark.secondarytext')}
            width='fit-content'>
            <CardBody>
                <Flex direction='column' alignItems='center'>
                    <p>{time}</p>
                    <p>{temperature}°C</p>
                    <img src={'assets/weather/'+ weather +'.svg'} height='50px' width='50px'/>
                    <p>{humidity}</p>
                </Flex>
            </CardBody>
        </Card>
    )
}