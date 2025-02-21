import { Card, CardBody, CardHeader, Flex, Heading, Tag, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Input = { text: string, header: string, tags?: string[], id: string, defaultShown: boolean, searchQuery?: string }
export default function LexikonEntry({ text, header, tags, id, defaultShown = false, searchQuery = '' }: Input) {
    const [shown, setShown] = useState(defaultShown);

    function toggleCard() {
        setShown((s) => !s)
        window.history.replaceState(null, "", `#${id}`);
    }

    useEffect(() => {
        const hash = window.location.hash.substring(1); // Remove the '#'
        if (hash && hash == id) {
            setShown(true);
        }
    }, [defaultShown])

    const color = useColorModeValue('custom_light.warning', 'custom_dark.warning')

    function highlightText(text: string, query: string) {
        if (!query) return <Heading as='span' size={'md'}>{text}</Heading>;
        const parts = text.split(new RegExp(`(${query})`, "gi"));

        return parts.map((part, index) => {
            return part.toLowerCase() === query.toLowerCase() ? (
                <Heading as="span" size={'md'} color={color} fontWeight="bold" key={index}>{part}</Heading>
            ) : <Heading as="span" size={'md'} key={index}>{part}</Heading>
        })
    };

    return (
        <Card
            bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
            color={useColorModeValue('custom_light.text', 'custom_dark.text')}
            _hover={{ boxShadow: "md", transform: "scale(1.001)", cursor: "pointer" }}
            transition="all 0.2s ease-in-out"
            width={'100%'}
            id={id}
        >
            <CardHeader onClick={() => toggleCard()}>
                <Flex justify={'space-between'}>
                    <Heading lineHeight={0}>{highlightText(header, searchQuery)}</Heading>
                    <div className='tags'>
                        {
                            tags?.map((tag, index) => (
                                <Tag
                                    key={index}
                                    bg={useColorModeValue('custom_light.surface', 'custom_dark.surface')}
                                    color={useColorModeValue('custom_light.text', 'custom_dark.text')}
                                    marginStart={'10px'} size='md'>
                                    {tag}
                                </Tag>
                            ))
                        }
                    </div>
                </Flex>
            </CardHeader>
            <CardBody style={{ display: shown ? 'block' : 'none' }} pt={'0px'}>
                <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
            </CardBody>
        </Card>
    )
}