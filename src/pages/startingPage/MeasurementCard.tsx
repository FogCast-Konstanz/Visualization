import { Card, CardBody, Flex, Heading, Icon, Link, Popover, PopoverArrow, PopoverContent, PopoverTrigger, popperCSSVars, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons/lib";
import ReactMarkdown from 'react-markdown';
import { useNavigate } from "react-router-dom";
import { layoutConfig, useColor } from '../../components/style';

type Input = { measurement: string, value: string, name?: string, name2?: string, value2?: string, unit: string, icon?: IconType, click?: string, popoverText?: string }
export default function MeasurementCard({ measurement, value, name, name2, value2, popoverText, unit, icon, click }: Input) {

    const navigate = useNavigate();
    const { t } = useTranslation()

    return (

        <Popover trigger="hover" openDelay={500} >
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
                        p={2}
                    >
                        <PopoverArrow bg={useColor('surface')} />
                        <ReactMarkdown
                            components={{
                                a: ({ href, children }) => (
                                    <Link href={href} color="blue.500" textDecoration="underline" isExternal>
                                        {children}
                                    </Link>
                                ),
                            }}
                        >{popoverText}</ReactMarkdown>
                    </PopoverContent>
                    : <></>
            }
        </Popover >


    )
}