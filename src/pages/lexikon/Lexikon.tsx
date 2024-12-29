import { VStack } from '@chakra-ui/react'
import LexikonEntry from './LexikonEntry'

export default function Lexikon() {
    const lexikonEntries = [ 
        { 
            header: 'Lorem ipsum dolor sit amed Lorem ipsum dolor sit amed',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
            tags: ['cat', 'miau']
        }, 
            { header: 'wuff', text: 'wuff', tags: ['dog', '']}]

    return (
        <>
            <VStack width={'100%'} padding={'10px'}>
                {lexikonEntries.map((entry, index) => (
                    <LexikonEntry {...entry} key={index} />
                ))}

            </VStack>
        </>
    )
}