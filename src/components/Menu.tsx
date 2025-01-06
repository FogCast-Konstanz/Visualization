import { useState } from 'react'
import { Box, Button, Flex, Heading, Link, List, ListItem, Select, Text, UnorderedList, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { LANGUAGES } from './constants'
import { useTranslation } from 'react-i18next'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Settings() {
    const { i18n, t } = useTranslation();
    const { colorMode, toggleColorMode } = useColorMode()

    const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang_code = e.target.value;
        i18n.changeLanguage(lang_code);
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