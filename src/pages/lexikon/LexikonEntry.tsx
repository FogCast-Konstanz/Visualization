import { Box, Card, CardBody, CardHeader, Flex, Heading, Icon, Tag } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { layoutConfig, useColor } from '../../components/style';

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

    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.slice(1));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);;

    const color = useColor('warning')

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
            bg={useColor('background')}
            color={useColor('text')}
            _hover={{ boxShadow: "md", transform: "scale(1.001)", cursor: "pointer" }}
            transition="all 0.2s ease-in-out"
            width={'100%'}
            marginTop={'5px'}
            id={id}
            className='markdown'
        >
            {/* <CardHeader onClick={() => toggleCard()} borderBottomColor={useColor('background')} borderBottom={shown ? "1px solid" : ""} paddingBottom={shown ? layoutConfig.padding : ""}> */}
            <CardHeader onClick={() => toggleCard()}>
                <Flex justify={'space-between'} >
                    <Heading lineHeight={1.2} fontSize='lg'>
                        <Icon
                            as={shown ? FaMinus : FaPlus}
                            boxSize={3}
                            color={useColor('text')}
                            mr={layoutConfig.margin}
                        />
                        {highlightText(header, searchQuery)} </Heading>

                    <div className='tags'>
                        {
                            tags?.map((tag, index) => (
                                <Tag
                                    key={index}
                                    bg={useColor('surface')}
                                    color={useColor('text')}
                                    marginStart={layoutConfig.margin} size='md'>
                                    {tag}
                                </Tag>
                            ))
                        }
                    </div>
                </Flex>
            </CardHeader>
            <CardBody style={{ display: shown ? 'block' : 'none' }} pt={'0px'} >
                <ReactMarkdown
                    children={text}
                    remarkPlugins={[remarkGfm]}
                    components={{
                        p: ({ children }) => (
                            <Box mb={6}>
                                {children}
                            </Box>
                        ),
                    }}
                />
            </CardBody>
        </Card>
    )
}