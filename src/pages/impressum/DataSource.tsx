import { Box, Link, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useColor } from '../../components/style';

type DataSourceInput = { openMeteoText?: string, dwdText?: string, pegelOnlineText?: string, lubwText?: string}
export default function DataSource({openMeteoText, dwdText, pegelOnlineText, lubwText}: DataSourceInput) {
    const { t } = useTranslation()

    return (
        <Box paddingBottom="15px">
            <Text
                position='absolute'
                paddingTop='50px'
                bottom='10px'
                left='50%'
                transform="translateX(-50%)"
                color={useColor('text')}
            >
                <p>
                {t('impressum.dataFrom')}
                {openMeteoText ? <> <Link href='/impressum#openMeteoSource'>OpenMeteo</Link>({openMeteoText}) </> : <></>}
                {dwdText ? <> <Link href='/impressum#dwdSource'>DWD</Link> ({dwdText}) </>: <></>}
                {pegelOnlineText ? <> <Link href='/impressum#pegelOnlineSource'>Pegelonline</Link> ({pegelOnlineText})</>: <></>}
                {/* {t('impressum.and')} */}
                {lubwText ? <> <Link href='/impressum#lubwSource'>LUBW</Link> ({lubwText})</>: <></>}
                </p>
            </Text>
        </Box>
    )
}