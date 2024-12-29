import { useState } from 'react'
import { Card, CardBody, CardHeader, Flex, Heading, HStack, Tag, Text } from '@chakra-ui/react'

type Input = { text: string, header: string, tags?: string[] }
export default function LexikonEntry({ text, header, tags }: Input) {

    const [shown, setShown] = useState(false);

    return (
        <Card bg={'custom.background'} color={'custom.text'} width={'100%'}>
            <CardHeader onClick={() => setShown((s) => !s)}>
                <Flex justify={'space-between'}>
                    <Heading size='md'>{header}</Heading>
                    <div className='tags'>
                        {
                            tags?.map((tag, index) => (
                                <Tag key={index} bg={'custom.surface'} color={'custom.text'} marginStart={'10px'} size='md'>{tag}</Tag>
                            ))
                        }
                    </div>
                </Flex>
            </CardHeader>
            <CardBody style={{ display: shown ? 'block' : 'none' }}>
                <Text>{text}</Text>
            </CardBody>
        </Card>
    )
}