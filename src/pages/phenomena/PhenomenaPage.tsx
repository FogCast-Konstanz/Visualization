import { Card, CardBody, CardHeader, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { phenomenaType } from '../../i18n/dePhenomena';
import PhenomenonCard from './PhenomenonCard';

export default function Phenomena() {
    const { t } = useTranslation();

    useEffect(() => {}, [])

    const phenomena2: phenomenaType[] = t('phenomena', { returnObjects: true, ns: 'phenomena' }) as phenomenaType[] 

    return (
        <Flex padding={'10px'} direction={'column'} gap={'20px'} overflow="auto" maxHeight={'100dvh'} ml='10px'>
            <Card
                bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
                color={useColorModeValue('custom_light.text', 'custom_dark.text')}
                width={'100%'}>
                <CardHeader pb={'0px'}>
                    <Heading size='lg'>{t('phenomena.title')}</Heading>
                </CardHeader>
                <CardBody>
                    <Text>{t('phenomena.introduction')}</Text>
                </CardBody>
            </Card>
            {/* <Flex gap={'20px'} wrap={'wrap'}>
                {phenomena.map((entry, index) => (
                    <PhenomenonCard {...entry} key={index} />
                ))}
            </Flex> */}

            <Flex gap={'20px'} wrap={'wrap'}>
                {phenomena2.map((entry, index) => (
                    <PhenomenonCard {...entry} key={index} />
                ))}
            </Flex>
        </Flex>
    )
}