import { Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaHammer } from 'react-icons/fa';
import { layoutConfig, useBackgroundColor, useSurfaceColor, useTextColor } from './style';

export default function UnderConstruction() {
    const { t } = useTranslation()
    
    return (
        <>
            <Flex gap="10px" >
                <Icon as={FaHammer} boxSize={8} color={useTextColor()} />
                <Text 
                    fontSize="xl" 
                    fontWeight="bold" 
                    color={useTextColor()} >
                    {t('other.underConstruction')}
                </Text>
            </Flex>

        </>
    )
}