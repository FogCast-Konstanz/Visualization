import { calc, Image, useColorModeValue, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'


type Input = { text: string, header: string, img?:string }
export default function PhenomenonCard({ text, header, img }: Input) {
    return (
        <Card 
            bg={useColorModeValue('custom_light.background', 'custom_dark.background')} 
            color={useColorModeValue('custom_light.text', 'custom_dark.text')} 
            width={{lg: 'calc(50% - 10px)', base: '100%'}}
        >
            <CardHeader>
                <Heading size='md'>{header}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{text}</Text>
                { img && <Image src={img} alt={header}/> }
            </CardBody>
        </Card>
    )
}