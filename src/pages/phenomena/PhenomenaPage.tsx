import { Card, CardBody, CardHeader, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { phenomena } from './data';
import PhenomenonCard from './PhenomenonCard';

export default function Phenomena() {
    const { t } = useTranslation();

    return (
        <Flex padding={'10px'} direction={'column'} gap={'20px'} overflow="auto" maxHeight={'100dvh'} ml='10px'>
            <Card
                bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
                color={useColorModeValue('custom_light.text', 'custom_dark.text')}
                width={'100%'}>
                <CardHeader>
                    <Heading size='lg'>{t('phenomena.title')}</Heading>
                </CardHeader>
                <CardBody>
                    <Text>{t('phenomena.introduction')}</Text>
                </CardBody>
            </Card>
            <Flex gap={'20px'} wrap={'wrap'}>
                {phenomena.map((entry, index) => (
                    <PhenomenonCard {...entry} key={index} />
                ))}
            </Flex>
        </Flex>
    )
}