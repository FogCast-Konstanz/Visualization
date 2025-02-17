import { Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import CardIndividual from './CardIndividual';

import { ArrowLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { penonemaPage } from './data';
import './phenomena.scss';

type Input = penonemaPage
export default function PhenomenaSite({ title, description, explanation, referenceBodensee, dataAnalysis, sources, id }: Input) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Flex padding={'20px'} direction={'column'} gap={'20px'} overflow="auto" maxHeight={'100dvh'} key={id}>
            <Icon
                as={ArrowLeftIcon}
                aria-label="Go Back"
                top="10px"
                left="10px"
                onClick={() => navigate(-1)} // Go back to the previous page
                _hover={{ bg: useColorModeValue('custom_light.background', 'custom_dark.surface') }}
                borderRadius='5px'
                padding={'5px'}
                margin={'0px'}
                height='auto'
                width='25px'
                color={useColorModeValue('custom_light.text', 'custom_dark.text')}
            />

            {description && <CardIndividual header={title} body={description} />}
            {explanation && <CardIndividual header={t('phenomena.explanation')} body={explanation} />}
            {referenceBodensee && <CardIndividual header={t('phenomena.referenceBodensee')} body={referenceBodensee} />}
            {dataAnalysis && <CardIndividual header={t('phenomena.dataAnalysis')} body={dataAnalysis} />}
            {sources && <CardIndividual header={t('phenomena.sources')} body={sources} />}
        </Flex>
    )
}