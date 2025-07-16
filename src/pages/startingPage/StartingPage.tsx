import { Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomSelect from '../../components/elements/Select';
import { layoutConfig } from '../../components/style';
import AdvancedMode from './modes/Advanced';
import SailorMode from './modes/Sailor';
import StandardMode from './modes/Standard';



export default function StartingPage() {
    const { t } = useTranslation();

    const userModes = [
        { label: t('startingPage.standard'), code: "1" },
        { label: t('startingPage.advanced'), code: "2" },
        { label: t('startingPage.sailor'), code: "3" },
    ];

    const [userMode, setUserMode] = useState<number>(Number(localStorage.getItem('userMode') ?? 1) ?? 1)

    function changeUserMode(e: React.ChangeEvent<HTMLSelectElement>) {
        const mode = Number(e.target.value)

        setUserMode(mode);
        localStorage.setItem('userMode', mode.toString())
    }

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

            {userMode == 1 ? <StandardMode></StandardMode>
                : userMode == 2 ? <AdvancedMode></AdvancedMode>
                    : <SailorMode></SailorMode>
            }
        </Flex>
    )
}
