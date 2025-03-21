import { useTranslation } from 'react-i18next';

import { Box, Card, CardBody, CardHeader, Flex, Heading, Image, Link, Text, useColorModeValue, VStack } from "@chakra-ui/react";

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Impressum() {
    const { t } = useTranslation();

    return (
        <VStack width={'100%'} padding={'15px'} overflow="auto" maxHeight={'100dvh'} gap='15px'>
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

                    <Flex align="center" flexDirection={{ lg: 'row', base: "column" }}>
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
                    </Flex>
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
                    <Flex direction={{ lg: 'row', base: 'column' }} gap='20px' justifyContent='space-between'>
                        <Box flex="1">
                            <Text fontWeight="bold" mb={3}>{t('impressum.contact')}</Text>
                            <Text>{t('impressum.website')}: <Link href='https://www.htwg-konstanz.de'>www.htwg-konstanz.de</Link></Text>
                            <Text>{t('impressum.email')}: <Link href='mailto:oliver.duerr@htwg-konstanz.de'>oliver.duerr@htwg-konstanz.de</Link></Text>
                            <Text><Link href='https://github.com/FogCast-Konstanz'>{t('impressum.gitHub')}</Link></Text>
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

            <Card
                bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
                color={useColorModeValue('custom_light.text', 'custom_dark.text')}
                width={'100%'}>
                {/* Sources and Licences */}
                <CardHeader pb={0}>
                    <Heading size="md">{t('impressum.sourcesLicences')}</Heading>
                </CardHeader>

                <CardBody>
                    <Flex direction='column'>
                        <Flex direction={{ lg: 'row', base: 'column' }} gap='20px' justifyContent='space-between'>
                            <Box flex="1" id='dwdSource'>
                                <Link href='https://www.dwd.de/DE/Home/home_node.html'><Text fontWeight="bold" mb={3}>Deutscher Wetterdienst</Text></Link>
                                <Text>{t('impressum.licence')}: <Link href='https://creativecommons.org/licenses/by/4.0/'>Attribution 4.0 International</Link></Text>
                                <Text>Datenbasis: <Link href='https://www.dwd.de/DE/Home/home_node.html'>Deutscher Wetterdienst</Link> - {t('impressum.dwdData')}</Text>
                            </Box>

                            <Box flex="1" id='openMeteoSource'>
                                <Link href='https://open-meteo.com'><Text fontWeight="bold" mb={3}>OpenMeteo</Text></Link>
                                <Text>{t('impressum.licence')}: <Link href='https://creativecommons.org/licenses/by/4.0/'>Attribution 4.0 International</Link></Text>
                                <Text>{t('impressum.furtherLicences')}: <Link href='https://open-meteo.com/en/license'>Open Meteo Licences</Link></Text>
                                <Text>Datenbasis: <Link href='https://open-meteo.com/'>Open Meteo</Link> - {t('impressum.openMeteoData')}</Text>
                            </Box>

                            <Box flex="1" id='openMeteoSource'>
                                <Link href='https://www.pegelonline.wsv.de/gast/start'><Text fontWeight="bold" mb={3}>Pegelonline </Text></Link>
                                <Text>{t('impressum.licence')}: <Link href='https://www.govdata.de/dl-de/zero-2-0'>DL-DE-Zero-2.0 Lizenz</Link></Text>
                                <Text>Datenbasis: <Link href='https://www.pegelonline.wsv.de/gast/start'>Pegelonline</Link> - {t('impressum.pegelOnline')}</Text>
                            </Box>
                        </Flex>

                        <Flex direction='column'>
                            <ReactMarkdown
                                children={t('impressum.legalInfoText')}
                                remarkPlugins={[remarkGfm]}
                            />
                        </Flex>
                    </Flex>


                </CardBody>
            </Card>
        </VStack >
    );
};
