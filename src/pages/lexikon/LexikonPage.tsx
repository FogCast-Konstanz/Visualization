import { Flex, Heading, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LexikonEntry from './LexikonEntry'

export default function Lexikon() {
    const [hash, setHash] = useState('')

    const { t } = useTranslation()

    const lexikonEntries = [
        { header: t('lexicon.predictedTime.title'), text: t('lexicon.predictedTime.text'), tags: ['prediction'], id: 'predictedTime' },
        { header: t('lexicon.timeOfPrediction.title'), text: t('lexicon.timeOfPrediction.text'), tags: ['prediction'], id: 'timeOfPrediction' },
        { header: t('lexicon.benchmarkingIdea.title'), text: t('lexicon.benchmarkingIdea.text'), tags: ['prediction', 'benchmarking'], id: 'benchmarkingIdea' },
    ]

    useEffect(() => {
        const handleUrlChange = () => {
            setHash(window.location.hash.substring(1));
        };

        window.addEventListener('hashchange', handleUrlChange);

        return () => {
            window.removeEventListener('hashchange', handleUrlChange);
        };
    }, [])

    return (
        <Flex direction='column' overflow="auto" maxHeight={'calc(100dvh - 20px)'} margin={'10px'} gap='10px' width={{ lg: '100%' }}>
            <Heading>{t('lexicon.title')}</Heading>
            <VStack width={'100%'} padding={'0px'} margin={'0'}>
                {lexikonEntries.map((entry, index) => (
                    <LexikonEntry {...entry} defaultShown={entry.id == hash} key={index} />
                ))}
            </VStack>
        </Flex>

    )
}