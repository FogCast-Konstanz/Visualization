import { Box, Card, CardBody, Flex, Heading, Icon, Popover, PopoverArrow, PopoverContent, PopoverTrigger, Text, Tooltip } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { layoutConfig, useColor } from '../../components/style';
import { useTranslation } from "react-i18next";

import ReactMarkdown from 'react-markdown';

type Input = { measurement: string, value: string, name?: string, name2?: string, value2?: string, unit: string, icon?: IconType, click?: string, popoverText?: string }
export default function MeasurementCard({ measurement, value, name, name2, value2, popoverText, unit, icon, click }: Input) {

    const navigate = useNavigate();
    const { t } = useTranslation()

    return (

        <Popover trigger="click" openDelay={1000} >
            <PopoverTrigger >
                <Card
                    bg={useColor('background')}
                    color={useColor('text')} width='100%'
                    borderRadius={layoutConfig.borderRadius}
                    cursor={popoverText ? 'pointer' : 'default'}
                    _hover={popoverText ? { transform: 'scale(1.02)', transition: '0.2s' } : {}}
                    // onClick={click ? () => navigate('/data?tab=' + click) : () => { }}
                    minW="250px"
                    flex="1"
                    maxW={{ lg: "400px", base: '' }}
                >
                    <CardBody display={"flex"} alignItems={"center"}>
                        <Flex alignItems={"center"} gap={layoutConfig.gap}>
                            {icon && <Icon as={icon} boxSize={10} />}
                            <div>
                                <Heading size={'md'}>{measurement}</Heading>
                                <Text>{name ? name + ": " : ""}{value}{unit}</Text>
                                {value2 ? <Text>{name2 ? name2 + ": " : ""}{value2}{unit}</Text> : <></>}
                            </div>
                        </Flex>
                    </CardBody>
                </Card>
            </PopoverTrigger >

            {
                popoverText ?
                    <PopoverContent bg={useColor('surface')}
                        _focus={{ outline: 'none', boxShadow: 'none' }}
                        _focusVisible={{ outline: 'none', boxShadow: 'none' }}
                        color={useColor('text')}
                        maxW="250px"
                        p={2}>
                        <PopoverArrow bg={useColor('surface')} />
                        <ReactMarkdown children={popoverText} />
                    </PopoverContent>
                    : <></>
            }
        </Popover >


    )
}