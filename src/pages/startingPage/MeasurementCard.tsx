import { Card, CardBody, CardHeader, Heading, useColorModeValue } from "@chakra-ui/react"

type Input = { measurement: string, value: string, unit: string, icon?: string }
export default function MeasurementCard({ measurement, value, unit, icon }: Input) {

    return (
        <Card
            bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
            color={useColorModeValue('custom_light.text', 'custom_dark.text')} width='100%'>
            <CardHeader>{measurement}</CardHeader>
            <CardBody >
                {value}{unit}
                {icon && <img src={icon} />}
            </CardBody>
        </Card>
    )
}