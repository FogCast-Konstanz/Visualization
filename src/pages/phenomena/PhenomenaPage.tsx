import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Introduction from '../../components/Introduction';
import { phenomenaType } from '../../i18n/dePhenomena';
import PhenomenonCard from './PhenomenonCard';

export default function Phenomena() {
    const { t } = useTranslation();

    useEffect(() => {}, [])

    const phenomena2: phenomenaType[] = t('phenomena', { returnObjects: true, ns: 'phenomena' }) as phenomenaType[] 

    return (
        <Flex padding={'10px'} direction={'column'} gap={'20px'} overflow="auto" maxHeight={'100dvh'} ml='10px'>
            <Introduction header={t('phenomena.title')} text={t('phenomena.introduction')}></Introduction>

            <Flex gap={'20px'} wrap={'wrap'}>
                {phenomena2.map((entry, index) => (
                    <PhenomenonCard {...entry} key={index} />
                ))}
            </Flex>
        </Flex>
    )
}