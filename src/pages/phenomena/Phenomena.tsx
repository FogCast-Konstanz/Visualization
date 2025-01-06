import { Card, CardBody, CardHeader, Flex, Grid, GridItem, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import PhenomenonCard from './PhenomenonCard'
import { useTranslation } from 'react-i18next';
import { phenomena } from './data';

export default function Phenomena() {
    const { t } = useTranslation();

    return (
        <Flex padding={'20px'} direction={'column'} gap={'20px'} overflow="auto" maxHeight={'100dvh'}>
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