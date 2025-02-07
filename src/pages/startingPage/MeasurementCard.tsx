import { Card, CardBody, CardHeader, Flex, Heading, Icon, useColorModeValue } from "@chakra-ui/react"
import { IconType } from "react-icons/lib"

type Input = { measurement: string, value: string, unit: string, icon?: IconType }
export default function MeasurementCard({ measurement, value, unit, icon }: Input) {

    return (
        <Card
            bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
            color={useColorModeValue('custom_light.text', 'custom_dark.text')} width='100%'>
            <CardBody >
                <Flex alignItems={"center"} gap={'20px'}>
                    {icon && <Icon as={icon} boxSize={10} />}
                    <div>
                        <Heading size={'md'}>{measurement}</Heading>
                        {value}{unit}
                    </div>
                </Flex>

            </CardBody>
        </Card>
    )
}