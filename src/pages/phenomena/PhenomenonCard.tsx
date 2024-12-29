import { calc, Image, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'


type Input = { text: string, header: string, img?:string }
export default function PhenomenonCard({ text, header, img }: Input) {
    return (
        <Card bg={'custom.background'} color={'custom.text'} width={'calc(50% - 10px)'}>
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