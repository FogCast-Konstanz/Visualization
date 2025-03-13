import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Flex, Select, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from './constants';

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
                margin={{ lg: '0', base: '10px' }}
                gap={'10px'}
            >
                <Select
                    defaultValue={i18n.language}
                    onChange={onChangeLang}
                    width={'fit-content'}
                    bg={useColorModeValue('custom_light.background', 'custom_dark.background')}
                    color={useColorModeValue('custom_light.text', 'custom_dark.text')}
                    _focus={{ borderColor: useColorModeValue('custom_light.background', 'custom_dark.background') }}
                    sx={{
                        option: {
                            background: useColorModeValue('custom_light.background', 'custom_dark.background'),
                            color: useColorModeValue('custom_light.text', 'custom_dark.text'),
                            _hover: {background: useColorModeValue('custom_light.background', 'custom_dark.background')}
                        },
                    }}
                >
                    {LANGUAGES.map(({ code, label }) => (
                        <option
                            key={code}
                            value={code}
                            color={useColorModeValue('custom_light.text', 'custom_dark.text')}
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