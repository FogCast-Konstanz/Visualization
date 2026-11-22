
import axios from 'axios';
import { BACKEND_API_URL, BACKEND_URL } from '../constants';

export type HealthState = 'ok' | 'warning' | 'error' | 'unknown';

export type HealthComponent = {
    status: HealthState;
    message: string;
    latest_at: string | null;
    age_minutes: number | null;
};

export type HealthKey =
    | 'proxy'
    | 'api'
    | 'influxdb'
    | 'station'
    | 'forecasts'
    | 'cronjobs';

export type HealthReport = {
    checked_at: string;
    components: Record<HealthKey, HealthComponent>;
};

const allowedStates: HealthState[] = [
    'ok', 'warning', 'error', 'unknown'
];

function item(
    status: HealthState,
    message: string,
    latestAt: string | null = null
): HealthComponent {
    return {
        status,
        message,
        latest_at: latestAt,
        age_minutes: null
    };
}

function normalize(value: unknown): HealthComponent | null {
    if (!value || typeof value !== 'object') return null;

    const v = value as Partial<HealthComponent>;

    if (
        !allowedStates.includes(v.status as HealthState) ||
        typeof v.message !== 'string'
    ) {
        return null;
    }

    return {
        status: v.status as HealthState,
        message: v.message,
        latest_at:
            typeof v.latest_at === 'string'
                ? v.latest_at
                : null,
        age_minutes:
            typeof v.age_minutes === 'number' &&
            Number.isFinite(v.age_minutes)
                ? v.age_minutes
                : null
    };
}

// Prüft API, InfluxDB, Wetterstation und Prognosen.

async function getBackend(): Promise<{
    checked_at: string;
    components: Record<
        'api' | 'influxdb' | 'station' | 'forecasts',
        HealthComponent
    >;
}> {
    try {
        const response = await axios.get(
            `${BACKEND_API_URL}/system-status`,
            {
                timeout: 16000,
                headers: { Accept: 'application/json' }
            }
        );

        const data = response.data;

        if (
            !data ||
            typeof data.checked_at !== 'string' ||
            !Number.isFinite(Date.parse(data.checked_at))
        ) {
            throw new Error('Invalid status timestamp');
        }

        const names = [
            'api',
            'influxdb',
            'station',
            'forecasts'
        ] as const;

        const mapped = {} as Record<
            typeof names[number],
            HealthComponent
        >;

        for (const name of names) {
            const parsed = normalize(data.components?.[name]);

            if (!parsed) {
                throw new Error('Invalid status response');
            }

            mapped[name] = parsed;
        }

        return {
            checked_at: data.checked_at,
            components: mapped
        };

    } catch {
        return {
            checked_at: new Date().toISOString(),
            components: {
                api: item(
                    'error',
                    'API-Statusanfrage fehlgeschlagen oder ungültig.'
                ),
                influxdb: item(
                    'unknown',
                    'Ohne API nicht prüfbar.'
                ),
                station: item(
                    'unknown',
                    'Ohne API nicht prüfbar.'
                ),
                forecasts: item(
                    'unknown',
                    'Ohne API nicht prüfbar.'
                )
            }
        };
    }
}

// Prüft den bestehenden Reverse-Proxy-Healthcheck.

async function getProxy(): Promise<HealthComponent> {
    // Vite ist nicht der produktive nginx-Reverse-Proxy.
    if (import.meta.env.DEV && !BACKEND_URL) {
        return item(
            'unknown',
            'Lokaler Vite-Betrieb: Reverse Proxy nicht geprüft.'
        );
    }

    try {
        const response = await axios.get(
            `${BACKEND_URL}/health-check`,
            {
                timeout: 5000,
                responseType: 'text'
            }
        );

        return response.data.trim() === 'success'
            ? item(
                'ok',
                'Reverse Proxy antwortet. Das Frontend ist im Browser geladen.'
            )
            : item(
                'error',
                'Reverse Proxy lieferte eine unerwartete Antwort.'
            );

    } catch {
        return item(
            'error',
            'Reverse Proxy nicht erreichbar.'
        );
    }
}

// Prüft den vorhandenen Cronjob-Statusdienst.

async function getCronjobs(): Promise<HealthComponent> {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/cronjob/status`,
            {
                timeout: 6000,
                headers: { Accept: 'application/json' }
            }
        );

        const data = response.data;

        const states: Record<string, HealthState> = {
            success: 'ok',
            warning: 'warning',
            error: 'error',
            unknown: 'unknown'
        };

        if (
            !data ||
            typeof data.status !== 'string' ||
            !Object.hasOwn(states, data.status)
        ) {
            return item(
                'unknown',
                'Cronjob-Statusantwort ist ungültig.'
            );
        }

        return item(
            states[data.status],
            typeof data.message === 'string'
                ? data.message
                : 'Cronjob-Status ohne weitere Angaben.',
            typeof data.last_activity_at === 'string'
                ? data.last_activity_at
                : null
        );

    } catch {
        return item(
            'error',
            'Cronjob-Statusdienst nicht erreichbar.'
        );
    }
}

// Führt die Prüfungen zusammen.

export async function fetchSystemStatus(): Promise<HealthReport> {
    const [backend, proxy, cronjobs] = await Promise.all([
        getBackend(),
        getProxy(),
        getCronjobs()
    ]);

    return {
        checked_at: backend.checked_at,
        components: {
            proxy,
            ...backend.components,
            cronjobs
        }
    };
}

// Berechnet den zusammenfassenden Plattformstatus.

export function platformStatus(
    report: HealthReport
): HealthState {
    const { proxy, api, influxdb } = report.components;

    if (
        proxy.status === 'error' ||
        api.status === 'error'
    ) {
        return 'error';
    }

    if (influxdb.status === 'error') {
        return 'warning';
    }

    if (
        [proxy, api, influxdb].some(
            component => component.status === 'unknown'
        )
    ) {
        return 'unknown';
    }

    if (
        [proxy, api, influxdb].some(
            component => component.status === 'warning'
        )
    ) {
        return 'warning';
    }

    return 'ok';
}
