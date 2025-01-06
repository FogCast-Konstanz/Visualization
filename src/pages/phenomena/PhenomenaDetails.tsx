import { Card, CardBody, CardHeader, Flex, Grid, GridItem, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next';
import CardIndividual from './CardIndividual';

import './phenomena.scss'
import { penonemaPage } from './data'

type Input = penonemaPage
export default function PhenomenaSite({title, description, explanation, referenceBodensee, dataAnalysis, sources, id }: Input) {
    const { t } = useTranslation();

    return (
        <Flex padding={'20px'} direction={'column'} gap={'20px'} overflow="auto" maxHeight={'100dvh'}>
            <CardIndividual header={title} body={description} />
            <CardIndividual header={t('phenomena.explanation')} body={explanation} />
            <CardIndividual header={t('phenomena.referenceBodensee')} body={referenceBodensee} />
            <CardIndividual header={t('phenomena.dataAnalysis')} body={dataAnalysis} />
            <CardIndividual header={t('phenomena.sources')} body={sources} />
        </Flex>
    )
}