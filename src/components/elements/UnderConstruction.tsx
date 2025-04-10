import { Flex, Icon, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaHammer } from 'react-icons/fa';
import { useColor } from '../style';

export default function UnderConstruction() {
    const { t } = useTranslation()
    
    return (
        <>
            <Flex gap="10px" >
                <Icon as={FaHammer} boxSize={8} color={useColor('text')} />
                <Text 
                    fontSize="xl" 
                    fontWeight="bold" 
                    color={useColor('text')} >
                    {t('other.underConstruction')}
                </Text>
            </Flex>

        </>
    )
}