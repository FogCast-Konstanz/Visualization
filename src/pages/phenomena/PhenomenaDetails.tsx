import { Card, CardBody, CardHeader, Flex, Grid, GridItem, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';

type Input = { text: string, header: string, img?:string }
export default function PhenomenaSite({ text, header, img }: Input) {
    const { t } = useTranslation();

    return (
        <Flex padding={'20px'} direction={'column'} gap={'20px'} overflow="auto" maxHeight={'100dvh'}>
            <Card
                bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
                color={useColorModeValue('custom_light.text', 'custom_dark.text')}
                width={'100%'}>
                <CardHeader>
                    <Heading size='lg'>{header}</Heading>
                    <Text>{text}</Text>
                </CardHeader>
                <CardBody>
                    <Text>{t('phenomena.introduction')}</Text>
                </CardBody>
            </Card>
        </Flex>
    )
}