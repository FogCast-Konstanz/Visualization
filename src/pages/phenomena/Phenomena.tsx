import { Card, CardBody, CardHeader, Flex, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react'
import PhenomenonCard from './PhenomenonCard'
import { useTranslation } from 'react-i18next';

export default function Phenomena() {
    const { t } = useTranslation();

    const phenomena = [
        {
            header: 'Lorem ipsum dolor sit amed Lorem ipsum dolor sit amed',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua',
            img: ''
        },
        { header: 'wuff', text: 'wuff', img: '' },
        { header: 'wuff', text: 'wuff', img: '' }]

    return (
        <Flex margin={'20px'} direction={'column'} gap={'20px'}>
                <Card bg={'custom.background'} color={'custom.text'} width={'100%'}>
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