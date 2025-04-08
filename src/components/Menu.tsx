import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Flex, Select, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from './constants';
import { layoutConfig, useColor, useSurfaceColor, useTextColor } from './style';

export default function Settings() {
    const { i18n } = useTranslation();
    const { colorMode, toggleColorMode } = useColorMode()

    function onChangeLang(e: React.ChangeEvent<HTMLSelectElement>){
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
                <Select
                    defaultValue={i18n.language}
                    onChange={onChangeLang}
                    width={'fit-content'}
                    bg={useColor('background')}
                    color={useColor('text')}
                    _focus={{ borderColor: useColor('background') }}
                    sx={{
                        option: {
                            background: useColor('background'),
                            color: useColor('text'),
                            _hover: {background: useColor('background')}
                        },
                    }}
                >
                    {LANGUAGES.map(({ code, label }) => (
                        <option
                            key={code}
                            value={code}
                            color={useColor('text')}
                        >
                            {label}
                        </option>
                    ))}
                </Select>

                <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
                </Button>
            </Flex>

        </>
    )
}