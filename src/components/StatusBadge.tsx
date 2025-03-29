
import { Badge, Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchModels } from './requests/forcastBackend';
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { fetchServerStatus } from './requests/statusBackend';


export default function StatusBadge() {

    const [status, setStatus] = useState<'running' | 'down' | 'unreachable'>('running');


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
            >
                <Badge colorScheme={status == 'running' ? "green" : status == 'down' ? "red" : 'orange'} fontSize="md">
                    Server {status.toUpperCase()}
                </Badge>
            </Flex>
        </>
    )
}



