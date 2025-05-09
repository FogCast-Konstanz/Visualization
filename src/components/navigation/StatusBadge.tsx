
import { Badge, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fetchServerStatus } from '../requests/statusBackend';
import { layoutConfig } from '../style';


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
                p={layoutConfig.padding}
                borderRadius={layoutConfig.borderRadius}
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



