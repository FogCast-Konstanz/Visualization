import { ArrowRightIcon } from '@chakra-ui/icons';
import { Card, CardBody, CardHeader, Heading, Icon, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useColor } from '../../components/style';
import { phenomenaType } from '../../i18n/dePhenomena';


type Input = phenomenaType
export default function PhenomenonCard({title, description, id }: Input) {
    const navigate = useNavigate();

    return (
        <Card 
            bg={useColor('background')} 
            color={useColor('text')} 
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
                color={useColor('text')} 
            />
        </Card>
    )
}