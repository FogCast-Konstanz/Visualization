import { Card, CardBody, CardHeader, Flex, Heading, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { layoutConfig, useColor } from '../../components/style'
import LexikonEntry from './LexikonEntry'
import SearchFilterBar from './SearchFilterBar'
import { deLexicon } from '../../i18n/deLexicon'

export default function Lexikon() {
    const [hash, setHash] = useState('')

    const { t } = useTranslation()

    // const lexikonEntries = [
    //     { header: t('lexicon.predictedTime.title'), text: t('lexicon.predictedTime.text'), tags: ['prediction'], id: 'predictedTime' },
    //     { header: t('lexicon.timeOfPrediction.title'), text: t('lexicon.timeOfPrediction.text'), tags: ['prediction'], id: 'timeOfPrediction' },
    //     { header: t('lexicon.benchmarkingIdea.title'), text: t('lexicon.benchmarkingIdea.text'), tags: ['prediction', 'benchmarking'], id: 'benchmarkingIdea' },
    //     { header: t('lexicon.metaForecasting.title'), text: t('lexicon.metaForecasting.text'), tags: ['prediction', 'forecasting'], id: 'metaforecasting' },
    //     { header: t('lexicon.fogDays.title'), text: t('lexicon.fogDays.text'), tags: ['weather'], id: 'fogDays' },
    // ]

    const lexiconKeys = [
        'predictedTime',
        'timeOfPrediction',
        'benchmarkingIdea',
        'metaForecasting',
        'fogDays',
    ] as const

    const lexiconRaw = t('lexicon', { returnObjects: true }) as any
    console.log(Object.keys(lexiconRaw))

    const lexikonEntries = lexiconKeys.map((id) => ({
        id,
        header: t(`lexicon.${id}.title`),
        text: t(`lexicon.${id}.text`),
        tags: t(`lexicon.${id}.tags`, { returnObjects: true }) as string[],
    }))
    console.log(lexikonEntries)

    const [selectedTag, setSelectedTag] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const uniqueTags = Array.from(
        new Set(lexikonEntries.flatMap((entry) => entry.tags))
    );

    const tagOptions = uniqueTags.map((tag) => ({
        code: tag,
        label: tag,
    }));

    /* Filter after:
    * 1. Search value in 
    */
    const filteredEntries = lexikonEntries
        .filter((entry) =>
            selectedTag ? entry.tags.includes(selectedTag) : true
        ).filter((entry) =>
            entry.header.toLowerCase().includes(searchQuery.toLowerCase()) || entry.text.toLowerCase().includes(searchQuery.toLowerCase()
            )).sort((a, b) => a.header.localeCompare(b.header));

    useEffect(() => {
        const handleUrlChange = () => {
            setHash(window.location.hash.substring(1));
        };

        console.log(lexikonEntries)
        window.addEventListener('hashchange', handleUrlChange);

        return () => {
            window.removeEventListener('hashchange', handleUrlChange);
        };
    }, [])

    function changeTags(e: React.ChangeEvent<HTMLSelectElement>) {
        const tag = e.target.value
        setSelectedTag(tag)
    }


    return (
        <Flex direction='column' overflow="auto" maxHeight={'calc(100dvh - 20px)'} margin={layoutConfig.margin} gap={layoutConfig.gap} width={{ lg: '100%' }} pr={layoutConfig.padding}>
            <Flex direction={{ lg: 'row', base: 'column' }} alignItems={{ lg: 'center', base: 'flex-start' }} justifyContent='space-between'>
                <Card
                    bg={useColor('background')}
                    color={useColor('text')}
                    width={'100%'}>
                    <CardHeader pb={'0px'}>
                        <Flex alignItems='center' justifyContent='space-between'>
                            <Heading flex={2}>{t('lexiconPage.title')}</Heading>
                            <SearchFilterBar
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                tagOptions={tagOptions}
                                changeTags={changeTags}
                                layoutConfig={layoutConfig}
                            />
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <ReactMarkdown children={t('lexiconPage.introduction')} remarkPlugins={[remarkGfm]} />
                    </CardBody>
                </Card>


            </Flex>

            <VStack width={'100%'} margin={'0'}>
                {filteredEntries.map((entry, index) => (
                    <LexikonEntry {...entry} searchQuery={searchQuery} defaultShown={entry.id == hash} key={index} />
                ))}
            </VStack>
        </Flex>

    )
}