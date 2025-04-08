import { Card, CardBody, Flex, Heading, Icon, useColorModeValue } from "@chakra-ui/react"
import { IconType } from "react-icons/lib"
import { layoutConfig, useColor, useSurfaceColor, useTextColor } from '../../components/style';


type Input = { measurement: string, value: string, unit: string, icon?: IconType }
export default function MeasurementCard({ measurement, value, unit, icon }: Input) {

    return (
        <Card
            bg={useColor('background')}
            color={useColor('text')} width='100%'
            borderRadius={layoutConfig.borderRadius}
            >
            <CardBody >
                <Flex alignItems={"center"} gap={layoutConfig.gap}>
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