import { ArrowLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import CardIndividual from '../../components/elements/CardIndividual';
import { layoutConfig, useColor } from '../../components/style';
import { phenomenaType } from '../../i18n/dePhenomena';

import './phenomena.scss';

type Input = phenomenaType
export default function PhenomenaSite({ title, description, content, sources, id }: Input) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Flex padding={layoutConfig.padding} direction={'column'} gap={layoutConfig.gap} overflow="auto" maxHeight={'100dvh'} key={id}>
            <Flex gap={layoutConfig.gap}>
                <Icon
                    as={ArrowLeftIcon}
                    aria-label="Go Back"
                    top="10px"
                    left="10px"
                    onClick={() => navigate(-1)} // Go back to the previous page
                    _hover={{ bg: useColor('background') }}
                    borderRadius={layoutConfig.buttonBorderRadius}
                    padding={'5px'}
                    margin={'0px'}
                    height='auto'
                    width='25px'
                    color={useColor('text')}
                />
                <Text marginLeft={'20px'}>
                    <Link href='/phenomena'>{t('navigation.phenomena')}</Link>
                    <Icon
                        as={ChevronRightIcon}
                        aria-label="Go Back"
                        top="10px"
                        left="10px"
                        width='25px'
                        color={useColor('text')}
                    />
                    {title}
                </Text>
            </Flex>

            <Flex id='phenomenas' padding={layoutConfig.padding} direction={'column'} gap={layoutConfig.gap} overflow="auto">
                <CardIndividual header={title} body={description} />
                {content.map((c, index) => {
                    return <CardIndividual header={c.title} body={c.text} key={index} />
                })}
                {sources && <CardIndividual header={t('phenomena.sources')} body={sources} />}
            </Flex>

        </Flex>
    )
}