
import { Badge, Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchModels } from './requests/forcastBackend';
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { fetchServerStatus } from './requests/statusBackend';


export default function StatusBadge() {

    const [status, setStatus] = useState<boolean>(true);


    useEffect(() => {
        checkStatus();
        const interval = setInterval(checkStatus, 5000); // Auto-refresh

        return () => clearInterval(interval);
    }, []);

    async function checkStatus() {
        const tempStatus = await fetchServerStatus();

        setStatus(tempStatus);
        return true;
    }

    return (
        <>
            <Flex
                p={2}
                borderRadius="md"
                align="center"
                justify="center"
                // border="1px solid"
                // borderColor={status === "running" ? "green.500" : "red.500"}
            >
                {/* <Icon
                    as={status === "running" ? CheckCircleIcon : WarningIcon}
                    boxSize={6}
                    color={status === "running" ? "green.500" : "red.500"}
                    mr={2}
                /> */}
                {/* <Text fontSize="md" fontWeight="bold">
                    Server {status === "running" ? "Running" : "Down"}
                </Text> */}
                <Badge colorScheme={status ? "green" : "red"} fontSize="md">
                    Server {status ? 'RUNNING' : 'DOWN'}
                </Badge>
            </Flex>

        </>

    )
}



