import { Link, Text, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export default function DataSource() {
    const { t } = useTranslation()

    return (
        <>
            <Text
                position='absolute'
                bottom='10px'
                left='50%'
                color={useColorModeValue('custom_light.text', 'custom_dark.text')}>
                    {t('impressum.dataFrom')} <Link href='/impressum#openMeteoSource'>OpenMeteo*</Link> {t('impressum.and')} <Link href='/impressum#dwdSource'>DWD**</Link>    
                </Text>
        </>
    )
}