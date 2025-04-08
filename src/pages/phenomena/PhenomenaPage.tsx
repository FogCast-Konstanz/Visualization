import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Introduction from '../../components/Introduction';
import { phenomenaType } from '../../i18n/dePhenomena';
import PhenomenonCard from './PhenomenonCard';
import { layoutConfig, useColor, useSurfaceColor, useTextColor } from '../../components/style';


export default function Phenomena() {
    const { t } = useTranslation();

    useEffect(() => {}, [])

    const phenomena2: phenomenaType[] = t('phenomena', { returnObjects: true, ns: 'phenomena' }) as phenomenaType[] 

    return (
        <Flex padding={layoutConfig.padding} direction={'column'} gap={layoutConfig.gap} overflow="auto" maxHeight={'100dvh'} ml={layoutConfig.margin}>
            <Introduction header={t('phenomena.title')} text={t('phenomena.introduction')}></Introduction>

            <Flex gap={layoutConfig.gap} wrap={'wrap'}>
                {phenomena2.map((entry, index) => (
                    <PhenomenonCard {...entry} key={index} />
                ))}
            </Flex>
        </Flex>
    )
}