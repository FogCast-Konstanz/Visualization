import { useState } from 'react'
import { Card, CardBody, CardHeader, Flex, Heading, HStack, Tag, Text, useColorModeValue } from '@chakra-ui/react'

type Input = { text: string, header: string, tags?: string[] }
export default function LexikonEntry({ text, header, tags }: Input) {

    const [shown, setShown] = useState(false);

    return (
        <Card 
            bg={useColorModeValue('custom_light.background', 'custom_dark.background')} 
            color={useColorModeValue('custom_light.text', 'custom_dark.text')} 
            width={'100%'}
            >
            <CardHeader onClick={() => setShown((s) => !s)}>
                <Flex justify={'space-between'}>
                    <Heading size='md'>{header}</Heading>
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
            <CardBody style={{ display: shown ? 'block' : 'none' }}>
                <Text>{text}</Text>
            </CardBody>
        </Card>
    )
}