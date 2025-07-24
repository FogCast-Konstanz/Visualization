import { Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomSelect from '../../components/elements/Select';
import { layoutConfig } from '../../components/style';
import SailorMode from './modes/Sailor';
import StandardMode from './modes/Standard';
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AdvancedMode from './modes/Advanced';
import DataSource from '../impressum/DataSource';

export default function StartingPage() {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const paramUserMode = Number(searchParams.get('userMode'));
    const storedUserMode = Number(localStorage.getItem('userMode') ?? 1);
    const initialMode = isNaN(paramUserMode) ? storedUserMode : paramUserMode;

    const [userMode, setUserMode] = useState<number>(initialMode);

    useEffect(() => {
        if (paramUserMode != 0) {
            setUserMode(paramUserMode);
            // setSearchParams({ userMode: String(paramUserMode) });
        } else {
            setUserMode(storedUserMode);
            setSearchParams({ userMode: String(storedUserMode) });
        }
    }, []);

    useEffect(() => {

    }, [userMode])

    function changeUserMode(e: React.ChangeEvent<HTMLSelectElement>) {
        const mode = Number(e.target.value);
        setUserMode(mode);
        setSearchParams({ userMode: String(mode) });
        localStorage.setItem('userMode', mode.toString());
    }

    const userModes = [
        { label: t('startingPage.standard'), code: "1" },
        { label: t('startingPage.advanced'), code: "2" },
        { label: t('startingPage.sailor'), code: "3" },
    ];

    return (
        <Flex direction='column' width={{ lg: layoutConfig.pageWidth, base: 'calc(100vw - 20px)' }} gap={layoutConfig.gap} margin={layoutConfig.margin} maxWidth={'100%'} overflow={'hidden'} overflowY={'auto'} height={'calc(100dvh - 20px)'}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Heading>{t('startingPage.title')}</Heading>

                <CustomSelect
                    value={userMode}
                    onChange={(value) => changeUserMode(value)}
                    options={userModes}
                />
            </Flex>

            {userMode === 3 ? <SailorMode /> :
                userMode === 2 ? <AdvancedMode /> :
                    <StandardMode />}
            
            <DataSource openMeteoText={t('sources.forecast')} dwdText={t('sources.currentWeather')} pegelOnlineText={t('sources.waterLevel')} weatherStationText={t('sources.currentWeather')}></DataSource>
        </Flex>
    );
}

