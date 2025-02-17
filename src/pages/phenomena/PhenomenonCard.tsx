import { ArrowRightIcon } from '@chakra-ui/icons'
import { Card, CardBody, CardHeader, Heading, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { penonemaPage } from './data'

type Input = penonemaPage
export default function PhenomenonCard({title, description, id }: Input) {
    const navigate = useNavigate();

    return (
        <Card 
            bg={useColorModeValue('custom_light.background', 'custom_dark.background')} 
            color={useColorModeValue('custom_light.text', 'custom_dark.text')} 
            width={{lg: 'calc(50% - 10px)', base: '100%'}}
            _hover={{ boxShadow: "lg", transform: "scale(1.02)", cursor: "pointer" }}
            transition="all 0.2s ease-in-out"
            onClick={() => navigate(`/phenomena/${id}`)} // Navigate on card click
        >
            <CardHeader paddingBottom={'0'}>
                <Heading size='lg'>{title}</Heading>
            </CardHeader>
            <CardBody>
                <Text>{description}</Text>
            </CardBody>

            <Icon
                as={ArrowRightIcon} 
                boxSize={3} 
                position="absolute" 
                bottom={3} 
                right={3} 
                color={useColorModeValue('gray.600', 'gray.400')} 
            />
        </Card>
    )
}