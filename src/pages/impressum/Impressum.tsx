import { useTranslation } from 'react-i18next';

import { VStack, Card, CardHeader, CardBody, Heading, Text, Link, Image, Box, HStack, CardFooter, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";


export default function Impressum() {
    const { t } = useTranslation();

    return (
        <VStack width={'100%'} padding={'15px'} overflow="auto" maxHeight={'100dvh'}>
            <Heading size='lg'>{t('impressum.title')}</Heading>
            <Card
                bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
                color={useColorModeValue('custom_light.text', 'custom_dark.text')}
                width={'100%'}>
                <CardHeader paddingBottom={'0px'}>
                    <Heading size="md" padding='0px'>{t('impressum.aboutTitle')}</Heading>
                </CardHeader>
                <CardBody>
                    {/* Project Information */}

                    <HStack spacing={4} align="center">
                        <Box>
                            <Text>{t('impressum.description')}</Text>
                            <br />
                            <Text>{t('impressum.about')}</Text>
                            <br />
                            <Text>{t('impressum.developerTeam')}</Text>
                        </Box>

                        <Image
                            src="assets/placeholder_picture.jpg"
                            alt="Developer Team"
                            width="400px"
                            borderRadius="5px"
                        />
                    </HStack>
                </CardBody>
            </Card>
            <Card
                bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
                color={useColorModeValue('custom_light.text', 'custom_dark.text')}
                width={'100%'}>
                {/* University Details */}
                <CardHeader pb={0}>
                    <Heading size="md">{t('impressum.contact')}</Heading>

                </CardHeader>
                <CardBody>
                    <Flex direction='row' gap='20px' justifyContent='space-between'>
                        <Box flex="1">
                            <Text fontWeight="bold" mb={3}>{t('impressum.contact')}</Text>
                            <Text>{t('impressum.website')}: <Link href='https://www.htwg-konstanz.de'>www.htwg-konstanz.de</Link></Text>
                            <Text>{t('impressum.email')}: <Link href='mailto:oliver.duerr@htwg-konstanz.de'>oliver.duerr@htwg-konstanz.de</Link></Text>
                        </Box>

                        <Box flex="1">
                            <Text fontWeight="bold" mb={3}>{t('impressum.university')}</Text>
                            <Box mb={4}>
                                <Text>HTWG Konstanz</ Text>
                                <Text>Hochschule für Technik, Wirtschaft und Gestaltung</Text>
                            </Box>
                            <Box mb={4}>
                                <Text>Alfred-Wachtel-Straße 8</Text>
                                <Text>78462 Konstanz</Text>
                                <Text>Germany</Text>
                            </Box>
                        </Box>

                        <Box flex="1">
                            <Text fontWeight="bold" mb={3}>{t('impressum.legalInfo')}</Text>
                            <Box mb={4}>
                                <Text><Link href='https://www.htwg-konstanz.de/info/impressum'>{t('impressum.htwg')}</Link></Text>
                                <Text><Link href='https://www.htwg-konstanz.de/datenschutzerklaerung'>{t('impressum.dataProtection')}</Link></Text>
                            </Box>
                        </Box>
                    </Flex>

                </CardBody>
            </Card>
        </VStack >
    );
};
