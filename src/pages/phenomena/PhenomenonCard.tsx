import { Card, CardBody, CardHeader, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { penonemaPage } from './data'

type Input = penonemaPage
export default function PhenomenonCard({title, description, id }: Input) {
    return (
        <Card 
            bg={useColorModeValue('custom_light.background', 'custom_dark.background')} 
            color={useColorModeValue('custom_light.text', 'custom_dark.text')} 
            width={{lg: 'calc(50% - 10px)', base: '100%'}}
            _hover={{ boxShadow: "lg", transform: "scale(1.02)", cursor: "pointer" }}
            transition="all 0.2s ease-in-out"
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