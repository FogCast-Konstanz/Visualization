import { Box, Link, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useColor } from '../../components/style';

export default function DataSource() {
    const { t } = useTranslation()

    return (
        <Box paddingBottom="15px">
            <Text
                position='absolute'
                paddingTop='50px'
                bottom='10px'
                left='50%'
                transform="translateX(-50%)"
                color={useColor('text')}>
                    {t('impressum.dataFrom')} 
                    <Link href='/impressum#openMeteoSource'> OpenMeteo*</Link>, 
                    <Link href='/impressum#dwdSource'> DWD**</Link>, 
                    <Link href='/impressum#pegelOnlineSource'> Pegelonline*** </Link> {t('impressum.and')} 
                    <Link href='/impressum#lubwSource'> LUBW**** </Link>
                </Text>
        </Box>
    )
}