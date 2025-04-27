import { Card, CardBody, Flex, Heading, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { layoutConfig, useColor } from '../../components/style';
import { useNavigate } from "react-router-dom";


type Input = { measurement: string, value: string, unit: string, icon?: IconType, click?: string }
export default function MeasurementCard({ measurement, value, unit, icon, click }: Input) {

    const navigate = useNavigate();

    return (
        <Card
            bg={useColor('background')}
            color={useColor('text')} width='100%'
            borderRadius={layoutConfig.borderRadius}
            cursor={click ? 'pointer' : 'default'}
            _hover={click ? { transform: 'scale(1.02)', transition: '0.2s' } : {}}
            onClick={click ? () => navigate('/data?tab=' + click) : () => { }}
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