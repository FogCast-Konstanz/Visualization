import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Flex, useColorMode } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../constants';
import CustomSelect from '../elements/Select';
import { layoutConfig } from '../style';

export default function Settings() {
    const { i18n } = useTranslation();
    const { colorMode, toggleColorMode } = useColorMode()

    function onChangeLang(e: React.ChangeEvent<HTMLSelectElement>) {
        const lang_code = e.target.value;
        i18n.changeLanguage(lang_code);

        localStorage.setItem('lang', lang_code)
    };

    return (
        <>
            <Flex
                width={'fit-content'}
                margin={{ lg: '0', base: layoutConfig.margin }}
                gap={layoutConfig.gap}
            >
                <CustomSelect
                    defaultValue={i18n.language}
                    onChange={(value) => onChangeLang(value)}
                    options={LANGUAGES}
                />
                <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
                </Button>
            </Flex >

        </>
    )
}