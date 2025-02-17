import { Link, Text, useColorModeValue } from '@chakra-ui/react';

export default function DataSource() {
    return (
        <>
            <Text
                position='absolute'
                bottom='10px'
                left='50%'
                color={useColorModeValue('custom_light.text', 'custom_dark.text')}    
            >Daten von <Link href='/impressum#openMeteoSource'>OpenMeteo*</Link> und <Link href='/impressum#dwdSource'>DWD**</Link></Text>
        </>
    )
}