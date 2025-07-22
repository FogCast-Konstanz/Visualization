import { Card, CardBody, Flex, Heading, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { layoutConfig, useColor } from '../../components/style';


type Input = { measurement: string, value: string, name?: string, name2?: string, value2?: string, unit: string, icon?: IconType, click?: string }
export default function MeasurementCard({ measurement, value, name, name2, value2, unit, icon, click }: Input) {

    const navigate = useNavigate();

    return (
        <Card
            bg={useColor('background')}
            color={useColor('text')} width='100%'
            borderRadius={layoutConfig.borderRadius}
            cursor={click ? 'pointer' : 'default'}
            _hover={click ? { transform: 'scale(1.02)', transition: '0.2s' } : {}}
            onClick={click ? () => navigate('/data?tab=' + click) : () => { }}
            minW="250px"
            flex="1"
            maxW={{ lg: "400px", base: '' }}
        >
            <CardBody display={"flex"} alignItems={"center"}>
                <Flex alignItems={"center"} gap={layoutConfig.gap}>
                    {icon && <Icon as={icon} boxSize={10} />}
                    <div>
                        <Heading size={'md'}>{measurement}</Heading>
                        <p>{name? name + ": " : ""}{value}{unit}</p>
                        {value2 ? <p>{name2? name2 +  ": " : ""}{value2}{unit}</p> : <></>}
                    </div>
                </Flex>

            </CardBody>
        </Card>
    )
}