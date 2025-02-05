import { Card, CardBody, CardHeader, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';

export default function Impressum() {

    const { t } = useTranslation();

    return (
        <>
            <VStack width={'100%'} padding={'10px'} overflow="auto" maxHeight={'100dvh'}>
                <Card
                    bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
                    color={useColorModeValue('custom_light.text', 'custom_dark.text')}
                    width={'100%'}>
                    <CardHeader>
                        <Heading size='lg'>{t('impressum.title')}</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>Das sind wir...</Text>
                    </CardBody>
                </Card>
            </VStack>
        </>
    )
}