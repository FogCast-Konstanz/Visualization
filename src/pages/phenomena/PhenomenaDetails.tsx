import { Flex, Icon } from '@chakra-ui/react';
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
                _hover={{ bg: "gray.200" }}
            />

            <CardIndividual header={title} body={description} />
            <CardIndividual header={t('phenomena.explanation')} body={explanation} />
            <CardIndividual header={t('phenomena.referenceBodensee')} body={referenceBodensee} />
            <CardIndividual header={t('phenomena.dataAnalysis')} body={dataAnalysis} />
            <CardIndividual header={t('phenomena.sources')} body={sources} />
        </Flex>
    )
}