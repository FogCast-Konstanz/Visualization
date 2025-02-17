import { Flex, Heading, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useEffect, useState } from 'react'
import UnderConstruction from '../../components/UnderConstruction'
import LexikonEntry from './LexikonEntry'

export default function Lexikon() {
    const lexikonEntries = [
        {
            header: 'Lorem ipsum dolor sit amed Lorem ipsum dolor sit amed',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
            tags: ['cat', 'miau'],
            id: 'lorem'
        },
        { header: 'wuff', text: 'wuff', tags: ['dog', ''], id: 'wuff' },
        { header: 'miau', text: 'miau', tags: ['cat'], id: 'miau' },
    ]
    const [hash, setHash] = useState('')

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
        <Flex direction='column' overflow="auto" maxHeight={'100dvh'} margin={'10px'} gap='10px' width={{lg: '100%'}}>
            <Heading>{t('lexicon.title')}</Heading>
            <UnderConstruction></UnderConstruction>
            <VStack width={'100%'} padding={'0px'} margin={'0'}>
                {lexikonEntries.map((entry, index) => (
                    <LexikonEntry {...entry} defaultShown={entry.id == hash} key={index} />
                ))}
            </VStack>
        </Flex>

    )
}