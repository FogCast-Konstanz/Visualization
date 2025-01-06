import { calc, Image, useColorModeValue, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { penonemaPage } from './data'

type Input = penonemaPage
export default function PhenomenonCard({title, description, explanation, referenceBodensee, dataAnalysis, sources, id }: Input) {
    return (
        <Card 
            bg={useColorModeValue('custom_light.background', 'custom_dark.background')} 
            color={useColorModeValue('custom_light.text', 'custom_dark.text')} 
            width={{lg: 'calc(50% - 10px)', base: '100%'}}
        >
            <CardHeader paddingBottom={'0'}>
                <Link to={id}><Heading size='lg'>{title}</Heading></Link>
            </CardHeader>
            <CardBody>
                <Text>{description}</Text>
                {/* { img && <Image src={img} alt={header}/> } */}
            </CardBody>
        </Card>
    )
}