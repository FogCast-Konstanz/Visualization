import { Link, Text, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { layoutConfig, useColor, useSurfaceColor, useTextColor } from '../../components/style';

export default function DataSource() {
    const { t } = useTranslation()

    return (
        <>
            <Text
                position='absolute'
                bottom='10px'
                left='50%'
                color={useColor('text')}>
                    {t('impressum.dataFrom')} 
                    <Link href='/impressum#openMeteoSource'> OpenMeteo*</Link>, 
                    <Link href='/impressum#dwdSource'> DWD**</Link>, 
                    <Link href='/impressum#pegelOnlineSource'> Pegelonline*** </Link> {t('impressum.and')} 
                    <Link href='/impressum#lubwSource'> LUBW**** </Link>
                </Text>
        </>
    )
}