import { VStack } from '@chakra-ui/react'
import LexikonEntry from './LexikonEntry'
import { useEffect, useState } from 'react'

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
        <>
            <VStack width={'100%'} padding={'10px'} overflow="auto" maxHeight={'100dvh'}>
                {lexikonEntries.map((entry, index) => (
                    <LexikonEntry {...entry} defaultShown={entry.id == hash} key={index} />
                ))}

            </VStack>
        </>
    )
}