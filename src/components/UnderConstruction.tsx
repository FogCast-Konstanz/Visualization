import { Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaHammer } from 'react-icons/fa';

export default function UnderConstruction() {
    const { t } = useTranslation()
    
    return (
        <>
            <Flex gap="10px" >
                <Icon as={FaHammer} boxSize={8} color={useColorModeValue('custom_light.text', 'custom_dark.text')} />
                <Text 
                    fontSize="xl" 
                    fontWeight="bold" 
                    color={useColorModeValue('custom_light.text', 'custom_dark.text')} >
                    {t('other.underConstruction')}
                </Text>
            </Flex>

        </>
    )
}