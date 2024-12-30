import { useState } from 'react'
import { Box, Heading, Link, List, ListItem, Select, Text, UnorderedList } from '@chakra-ui/react'
import { LANGUAGES } from './constants'
import { useTranslation } from 'react-i18next';

export default function Menu() {

    const { i18n, t } = useTranslation();

    const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang_code = e.target.value;
        i18n.changeLanguage(lang_code);
    };

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
        </>
    )
}