import { Box, Card, CardBody, CardHeader, Flex, Heading, Image, Link, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Introduction from '../../components/elements/Introduction';
import { layoutConfig, useColor } from '../../components/style';

export default function Impressum() {
    const { t } = useTranslation();

    return (
        <VStack width={'100%'} padding={layoutConfig.padding} overflow="auto" maxHeight={layoutConfig.pageHeight} gap={layoutConfig.gap}>
            <Introduction header={t('impressum.title')} text=''></Introduction>
            {/* <Heading size='lg'></Heading> */}
            <Card
                bg={useColor('background')}
                color={useColor('text')}
                width={'100%'}
                borderRadius={layoutConfig.borderRadius}
            >
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
                            borderRadius={layoutConfig.borderRadius}
                        />
                    </Flex>
                </CardBody>
            </Card>
            <Card
                bg={useColor('background')}
                color={useColor('text')}
                width={'100%'}
                borderRadius={layoutConfig.borderRadius}
            >
                {/* University Details */}
                <CardHeader pb={0}>
                    <Heading size="md">{t('impressum.contact')}</Heading>
                </CardHeader>
                <CardBody>
                    <Flex direction={{ lg: 'row', base: 'column' }} gap={layoutConfig.gap} justifyContent='space-between'>
                        <Box flex="1">
                            <Text fontWeight="bold" mb={layoutConfig.margin}>{t('impressum.contact')}</Text>
                            <Text>{t('impressum.website')}: <Link href='https://www.htwg-konstanz.de'>www.htwg-konstanz.de</Link></Text>
                            <Text>{t('impressum.email')}: <Link href='mailto:oliver.duerr@htwg-konstanz.de'>oliver.duerr@htwg-konstanz.de</Link></Text>
                            <Text><Link href='https://github.com/FogCast-Konstanz'>{t('impressum.gitHub')}</Link></Text>
                        </Box>

                        <Box flex="1">
                            <Text fontWeight="bold" mb={layoutConfig.margin}>{t('impressum.university')}</Text>
                            <Box mb={layoutConfig.margin}>
                                <Text>HTWG Konstanz</ Text>
                                <Text>Hochschule für Technik, Wirtschaft und Gestaltung</Text>
                            </Box>
                            <Box mb={layoutConfig.margin}>
                                <Text>Alfred-Wachtel-Straße 8</Text>
                                <Text>78462 Konstanz</Text>
                                <Text>Germany</Text>
                            </Box>
                        </Box>

                        <Box flex="1">
                            <Text fontWeight="bold" mb={layoutConfig.margin}>{t('impressum.legalInfo')}</Text>
                            <Box mb={layoutConfig.margin}>
                                <Text><Link href='https://www.htwg-konstanz.de/info/impressum'>{t('impressum.htwg')}</Link></Text>
                                <Text><Link href='https://www.htwg-konstanz.de/datenschutzerklaerung'>{t('impressum.dataProtection')}</Link></Text>
                            </Box>
                        </Box>
                    </Flex>
                </CardBody>
            </Card>

            <Card
                bg={useColor('background')}
                color={useColor('text')}
                width={'100%'}
                borderRadius={layoutConfig.borderRadius}
            >
                {/* Sources and Licences */}
                <CardHeader pb={0}>
                    <Heading size="md">{t('impressum.sourcesLicences')}</Heading>
                </CardHeader>

                <CardBody>
                    <Flex direction='column'>
                        <Flex direction={{ lg: 'row', base: 'column' }} gap={layoutConfig.gap} justifyContent='space-between'>
                            <Box flex="1" id='dwdSource'>
                                <Link href='https://www.dwd.de/DE/Home/home_node.html'><Text fontWeight="bold" mb={layoutConfig.margin}>Deutscher Wetterdienst</Text></Link>
                                <Text>{t('impressum.licence')}: <Link href='https://creativecommons.org/licenses/by/4.0/'>Attribution 4.0 International</Link></Text>
                                <Text>Datenbasis: <Link href='https://www.dwd.de/DE/Home/home_node.html'>Deutscher Wetterdienst</Link> - {t('impressum.dwdData')}</Text>
                            </Box>

                            <Box flex="1" id='openMeteoSource'>
                                <Link href='https://open-meteo.com'><Text fontWeight="bold" mb={layoutConfig.margin}>OpenMeteo</Text></Link>
                                <Text>{t('impressum.licence')}: <Link href='https://creativecommons.org/licenses/by/4.0/'>Attribution 4.0 International</Link></Text>
                                <Text>{t('impressum.furtherLicences')}: <Link href='https://open-meteo.com/en/license'>Open Meteo Licences</Link></Text>
                                <Text>Datenbasis: <Link href='https://open-meteo.com/'>Open Meteo</Link> - {t('impressum.openMeteoData')}</Text>
                            </Box>

                            <Box flex="1" id='pegelOnlineSource'>
                                <Link href='https://www.pegelonline.wsv.de/gast/start'><Text fontWeight="bold" mb={layoutConfig.margin}>Pegelonline </Text></Link>
                                <Text>{t('impressum.licence')}: <Link href='https://www.govdata.de/dl-de/zero-2-0'>DL-DE-Zero-2.0 Lizenz</Link></Text>
                                <Text>Datenbasis: <Link href='https://www.pegelonline.wsv.de/gast/start'>Pegelonline</Link> - {t('impressum.pegelOnline')}</Text>
                            </Box>

                            <Box flex="1" id='lubwSource'>
                                <Link href='https://www.lubw.baden-wuerttemberg.de/umweltinformationssystem'><Text fontWeight="bold" mb={layoutConfig.margin}>LUBW Baden Württemberg (LUBW)</Text></Link>
                                <Text><Link href='https://www.lubw.baden-wuerttemberg.de/umweltinformationssystem/nutzungsvereinbarung'>{t('impressum.userAgreement')} LUBW Baden Württemberg</Link></Text>
                                <Text>Datenbasis: <Link href='https://www.lubw.baden-wuerttemberg.de/umweltinformationssystem'>LUBW Baden Württemberg (LUBW)</Link> - {t('impressum.pegelOnline')}</Text>
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
