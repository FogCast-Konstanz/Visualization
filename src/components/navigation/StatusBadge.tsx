
import { Badge, Flex, Link } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
    fetchSystemStatus,
    platformStatus,
    type HealthState
} from '../requests/statusBackend';
import { layoutConfig } from '../style';

const colors: Record<HealthState, string> = {
    ok: 'green',
    warning: 'yellow',
    error: 'red',
    unknown: 'gray'
};

const labels: Record<HealthState, string> = {
    ok: 'Verfügbar',
    warning: 'Eingeschränkt',
    error: 'Störung',
    unknown: 'Unbekannt'
};

const compactLabels: Record<HealthState, string> = {
    ok: 'OK',
    warning: 'Teilw.',
    error: 'Fehler',
    unknown: '?'
};

export default function StatusBadge({
    compact = false
}: {
    compact?: boolean
}) {
    // Vor der ersten erfolgreichen Prüfung niemals grün anzeigen.
    const [status, setStatus] = useState<HealthState>('unknown');

    useEffect(() => {
        let active = true;

        async function checkStatus() {
            const report = await fetchSystemStatus();

            if (active) {
                setStatus(platformStatus(report));
            }
        }

        void checkStatus();

        // Status alle 60 Sekunden aktualisieren.
        const interval = window.setInterval(
            () => void checkStatus(),
            60000
        );

        return () => {
            active = false;
            window.clearInterval(interval);
        };
    }, []);

    return (
        <Flex
            p={layoutConfig.padding}
            align="center"
            justify="center"
        >
            <Link
                href="/status"
                aria-label={
                    `Systemstatus: ${labels[status]}. Details öffnen.`
                }
            >
                <Badge
                    colorScheme={colors[status]}
                    fontSize="sm"
                    px={3}
                    py={1}
                    borderRadius="full"
                >
                    {compact
                        ? compactLabels[status]
                        : `System: ${labels[status]}`}
                </Badge>
            </Link>
        </Flex>
    );
}



