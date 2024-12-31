import { useState } from 'react'
import { Box, Button, Heading, Link, List, ListItem, Select, Text, UnorderedList, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { LANGUAGES } from './constants'
import { useTranslation } from 'react-i18next'

export default function Menu() {
    const { i18n, t } = useTranslation();
    const { colorMode, toggleColorMode } = useColorMode()

    const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang_code = e.target.value;
        i18n.changeLanguage(lang_code);
    };

    // const background = useColorModeValue('pink', 'blue')

    return (
        <>
            {/* <Text>{t('insert', {name: "miau"})}</Text>
            <Text>{t('test.test')}</Text> */}
            <Select defaultValue={i18n.language} onChange={onChangeLang}>
                {LANGUAGES.map(({ code, label }) => (
                    <option key={code} value={code}>
                        {label}
                    </option>
                ))}
            </Select>

            <Button onClick={toggleColorMode}>
                Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
        </>
    )
}