
import {
    Badge,
    Box,
    Button,
    Flex,
    Heading,
    SimpleGrid,
    Spinner,
    Text
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import {
    fetchSystemStatus,
    platformStatus
} from '../../components/requests/statusBackend';
import type {
    HealthComponent,
    HealthKey,
    HealthReport,
    HealthState
} from '../../components/requests/statusBackend';
import {
    useColor,
    useTextColor
} from '../../components/style';

const colors: Record<HealthState, string> = {
    ok: 'green',
    warning: 'yellow',
    error: 'red',
    unknown: 'gray'
};

const stateNames: Record<HealthState, string> = {
    ok: 'Erfolgreich',
    warning: 'Eingeschränkt',
    error: 'Fehler',
    unknown: 'Unbekannt'
};

const components: {
    key: HealthKey;
    title: string;
}[] = [
    { key: 'proxy', title: 'Website / Reverse Proxy' },
    { key: 'api', title: 'API / Backend' },
    { key: 'influxdb', title: 'InfluxDB / Datenbank' },
    { key: 'station', title: 'Wetterstation / echte Messwerte' },
    { key: 'forecasts', title: 'Wetterprognosen' },
    { key: 'cronjobs', title: 'Cronjobs / Hintergrundverarbeitung' }
];

function formatUtc(value: string | null): string {
    if (!value) return 'Nicht verfügbar';

    const parsed = new Date(value);

    return Number.isFinite(parsed.getTime())
        ? parsed.toLocaleString('de-DE', {
            dateStyle: 'short',
            timeStyle: 'medium',
            timeZone: 'Europe/Berlin'
        }) + ' (MEZ/MESZ)'
        : 'Ungültiger Zeitstempel';
}

function StateBadge({
    status
}: {
    status: HealthState;
}) {
    return (
        <Badge
            colorScheme={colors[status]}
            borderRadius="md"
            px={2}
            py={1}
        >
            {stateNames[status]}
        </Badge>
    );
}

function StatusTile({
    title,
    description,
    state,
    message,
    latestAt
}: {
    title: string;
    description?: string;
    state: HealthState;
    message: string;
    latestAt?: string | null;
}) {
    const backgroundColor = useColor('background');

    return (
        <Box
            bg={backgroundColor}
            borderRadius="xl"
            borderWidth="1px"
            borderColor="gray.400"
            p={4}
            minW={0}
        >
            <Flex
                justify="space-between"
                align="start"
                gap={3}
                wrap="wrap"
                mb={3}
            >
                <Text fontWeight="bold">
                    {title}
                </Text>

                <StateBadge status={state} />
            </Flex>

            {description && (
                <Text
                    fontSize="sm"
                    mb={2}
                >
                    {description}
                </Text>
            )}

            <Text fontSize="sm">
                {message}
            </Text>

            {latestAt && (
                <Text fontSize="xs" mt={2}>
                    Letzter Datenzeitpunkt: {formatUtc(latestAt)}
                </Text>
            )}
        </Box>
    );
}

function getVisitorText(report: HealthReport) {
    const platform = platformStatus(report);

    return {
        platform: {
            status: platform,
            message:
                platform === 'ok'
                    ? 'Website, API und Datenbank reagieren.'
                    : platform === 'warning'
                        ? 'Mindestens ein zentraler Dienst ist eingeschränkt.'
                        : platform === 'error'
                            ? 'Mindestens ein zentraler Dienst ist nicht erreichbar.'
                            : 'Die Verfügbarkeit konnte nicht vollständig geprüft werden.'
        },
        station: report.components.station,
        forecasts: report.components.forecasts
    };
}

export default function StatusPage() {
    const [report, setReport] = useState<HealthReport | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const textColor = useTextColor();
    const surfaceColor = useColor('surface');
    const backgroundColor = useColor('background');

    const refresh = useCallback(async (initial = false) => {
        if (!initial) setRefreshing(true);

        try {
            const next = await fetchSystemStatus();
            setReport(next);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        let active = true;

        const update = async () => {
            const next = await fetchSystemStatus();

            if (active) {
                setReport(next);
                setLoading(false);
            }
        };

        void update();

        const interval = window.setInterval(
            () => void update(),
            60000
        );

        return () => {
            active = false;
            window.clearInterval(interval);
        };
    }, []);

    const summary = report ? getVisitorText(report) : null;

    return (
        <Box
            px={{ base: 4, md: 8 }}
            py={{ base: 5, md: 8 }}
            color={textColor}
            width="100%"
            maxW="1100px"
            mx="auto"
        >
            <Heading size="lg" mb={2}>
                FogCast Systemstatus
            </Heading>

            <Text mb={5} fontSize="sm">
                Hier sehen Sie, ob die FogCast-Systeme erreichbar
                sind und ob aktuelle Wetterstationsdaten und
                Wetterprognosen vorliegen.
            </Text>

            <Flex
                align="center"
                gap={3}
                mb={6}
                wrap="wrap"
            >
                <Button
                    size="sm"
                    onClick={() => void refresh()}
                    isLoading={refreshing}
                    loadingText="Prüfung läuft"
                >
                    Jetzt prüfen
                </Button>

                <Text
                    fontSize="xs"
                    color={textColor}
                    aria-live="polite"
                >
                    {loading
                        ? 'Prüfungen laufen…'
                        : `Letzter Prüfversuch: ${formatUtc(
                            report?.checked_at ?? null
                        )}`}
                </Text>
            </Flex>

            {loading && (
                <Flex gap={3} align="center" role="status">
                    <Spinner size="sm" />
                    Status wird geladen. Noch kein Ergebnis verfügbar.
                </Flex>
            )}

            {summary && (
                <>
                    <Heading size="md" mb={3}>
                        Auf einen Blick
                    </Heading>

                    <SimpleGrid
                        columns={{ base: 1, md: 3 }}
                        spacing={4}
                        mb={6}
                    >
                        <StatusTile
                            title="Systemverfügbarkeit"
                            description="Sind die technischen Dienste von FogCast erreichbar?"
                            state={summary.platform.status}
                            message={summary.platform.message}
                        />

                        <StatusTile
                            title="Messdaten der Wetterstation"
                            description="Liefert unsere Wetterstation aktuelle Messwerte?"
                            state={summary.station.status}
                            message={summary.station.message}
                            latestAt={summary.station.latest_at}
                        />

                        <StatusTile
                            title="Wetterprognosen"
                            description="Wie aktuell sind die verfügbaren Wettervorhersagen?"
                            state={summary.forecasts.status}
                            message={summary.forecasts.message}
                            latestAt={summary.forecasts.latest_at}
                        />
                    </SimpleGrid>

                    <Box
                        as="details"
                        bg={surfaceColor}
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor="gray.400"
                        px={{ base: 3, md: 5 }}
                        py={4}
                    >
                        <Box
                            as="summary"
                            cursor="pointer"
                            fontWeight="bold"
                            fontSize="md"
                            _focusVisible={{
                                outline: '2px solid currentColor'
                            }}
                        >
                            Technische Details (6 Komponenten)
                        </Box>

                        <Text fontSize="sm" my={3}>
                            Grün bedeutet nur, dass die jeweilige Prüfung
                            erfolgreich war. Eine erreichbare API beweist
                            nicht die Aktualität der Daten.
                        </Text>

                        <SimpleGrid
                            columns={{ base: 1, md: 2 }}
                            spacing={3}
                        >
                            {components.map(({ key, title }) => {
                                if (!report) return null;

                                const value: HealthComponent =
                                    report.components[key];

                                return (
                                    <Box
                                        key={key}
                                        bg={backgroundColor}
                                        p={3}
                                        borderRadius="md"
                                        minW={0}
                                    >
                                        <Flex
                                            align="start"
                                            justify="space-between"
                                            gap={2}
                                            wrap="wrap"
                                            mb={2}
                                        >
                                            <Text
                                                fontWeight="semibold"
                                                fontSize="sm"
                                            >
                                                {title}
                                            </Text>

                                            <StateBadge
                                                status={value.status}
                                            />
                                        </Flex>

                                        <Text fontSize="sm">
                                            {value.message}
                                        </Text>

                                        {value.latest_at && (
                                            <Text fontSize="xs" mt={2}>
                                                Letzte Aktivität/Messung:{' '}
                                                {formatUtc(value.latest_at)}
                                            </Text>
                                        )}

                                        {value.age_minutes !== null && (
                                            <Text fontSize="xs" mt={1}>
                                                Alter: {value.age_minutes} Minuten
                                            </Text>
                                        )}
                                    </Box>
                                );
                            })}
                        </SimpleGrid>

                        <Text fontSize="xs" mt={4}>
                            Hinweis: Der Proxy-Test bestätigt nur nginx;
                            der Cronjob-Test bestätigt Logaktivität,
                            keinen erfolgreichen Datenimport.
                            Ersatz-/Fallback-Messwerte zählen nicht
                            als echte Stationsmessungen.
                        </Text>
                    </Box>
                </>
            )}
        </Box>
    );
}
