import { Flex, Icon, Text } from '@chakra-ui/react';
import { FaHammer } from 'react-icons/fa';

export default function UnderConstruction() {
    return (
        <>
            <Flex gap="10px" >
                <Icon as={FaHammer} boxSize={8} color="gray.500" />
                <Text fontSize="xl" fontWeight="bold" color="gray.600">
                    This page is under construction...
                </Text>
            </Flex>

        </>
    )
}