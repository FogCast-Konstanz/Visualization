import { CloseIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton, Input, InputGroup, InputRightElement, Select, useColorModeValue, VStack } from '@chakra-ui/react'
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

    const [selectedTag, setSelectedTag] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const uniqueTags = Array.from(
        new Set(lexikonEntries.flatMap((entry) => entry.tags))
    );

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

        window.addEventListener('hashchange', handleUrlChange);

        return () => {
            window.removeEventListener('hashchange', handleUrlChange);
        };
    }, [])


    return (
        <Flex direction='column' overflow="auto" maxHeight={'calc(100dvh - 20px)'} margin={'10px'} gap='10px' width={{ lg: '100%' }}>
            <Flex direction={{ lg: 'row', base: 'column' }} alignItems={{ lg: 'center', base: 'flex-start' }} justifyContent='space-between'>
                <Heading flex={2}>{t('lexicon.title')}</Heading>
                <Flex flex={1} direction={{ lg: 'row', base: 'column' }} alignItems={{ lg: 'center', base: 'flex-start' }} justifyContent={'space-between'} gap={{ lg: '20px', base: '10px' }} width={'100%'}>
                    <InputGroup
                        flex={{ lg: 1, base: 'none' }}

                        bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
                        color={useColorModeValue('custom_light.text', 'custom_dark.text')}
                        _focus={{ borderColor: useColorModeValue('custom_light.background', 'custom_dark.background') }}
                        sx={{
                            option: {
                                background: useColorModeValue('custom_light.background', 'custom_dark.background'),
                                color: useColorModeValue('custom_light.text', 'custom_dark.text'),
                                _hover: { background: useColorModeValue('custom_light.background', 'custom_dark.background') }
                            },
                        }}
                    >
                        <Input
                            placeholder="Search title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <InputRightElement>
                                <IconButton
                                    aria-label="Clear search"
                                    icon={<CloseIcon />}
                                    size="xs"
                                    border={'none'}
                                    background={'none'}
                                    onClick={() => setSearchQuery("")}
                                />
                            </InputRightElement>
                        )}
                    </InputGroup>
                    <Select
                        width={{ lg: 'fit-content', base: '100%' }}
                        placeholder="Filter by tag"
                        flex={1}

                        onChange={(e) => setSelectedTag(e.target.value)}
                        bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
                        color={useColorModeValue('custom_light.text', 'custom_dark.text')}
                        _focus={{ borderColor: useColorModeValue('custom_light.background', 'custom_dark.background') }}
                        sx={{
                            option: {
                                background: useColorModeValue('custom_light.background', 'custom_dark.background'),
                                color: useColorModeValue('custom_light.text', 'custom_dark.text'),
                                _hover: { background: useColorModeValue('custom_light.background', 'custom_dark.background') }
                            },
                        }}
                    >
                        {uniqueTags.map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </Select>
                </Flex>
            </Flex>

            <VStack width={'100%'} padding={'0px'} margin={'0'}>
                {filteredEntries.map((entry, index) => (
                    <LexikonEntry {...entry} searchQuery={searchQuery} defaultShown={entry.id == hash} key={index} />
                ))}
            </VStack>
        </Flex>

    )
}