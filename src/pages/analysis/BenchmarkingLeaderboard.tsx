// pages/BenchmarkingLeaderboard.tsx (or wherever you want to place it)
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Spinner, Center, Alert, AlertIcon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchBenchmarking, BenchmarkingResponseFormat } from "../../components/requests/benchmarking";
import { layoutConfig, useColor } from "../../components/style";
import LeaderboardTable from "./Leaderboard"; // Adjust the import path as needed
import Introduction from "../../components/elements/Introduction";
import { useTranslation } from "react-i18next";

export default function BenchmarkingLeaderboard() {
    const [allData, setAllData] = useState<BenchmarkingResponseFormat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [isDemoData, setIsDemoData] = useState(false);


    const { t } = useTranslation()

    const textColor = useColor('text');
    const tabBg = useColor('background');
    const tabSelectedBg = useColor('primary');

    useEffect(() => {
        requestData();
    }, []);

    async function requestData() {
        try {
            setLoading(true);
            setError(null);
            // Fetch data for the past 30 days to get a broader range for all lead times
            const data = await fetchBenchmarking('30d');
            setAllData(data);
            setIsDemoData(false);
        } catch (err) {
            console.error("Error fetching benchmarking data:", err);
            setAllData(createDemoBenchmarkingData());
            setIsDemoData(true);
        } finally {
            setLoading(false);
        }
    }

    const handleTabChange = (index: number) => {
        setTabIndex(index);
    };

    // Group data by lead_time
    const longTermData = allData.filter(item => item.lead_time === 'l');
    const midTermData = allData.filter(item => item.lead_time === 'm');
    const shortTermData = allData.filter(item => item.lead_time === 's');

    if (loading) {
        return (
            <Center mt={layoutConfig.margin}>
                <Spinner size="xl" />
                <Text ml={4}>Loading benchmarking data...</Text>
            </Center>
        );
    }

    if (error) {
        return (
            <Center mt={layoutConfig.margin}>
                <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>
            </Center>
        );
    }

    return (
        <Flex direction='column' width='calc(100% - 20px)' minW="0" gap={layoutConfig.gap} margin={'10px'} maxHeight={'calc(100vh - 20px)'} overflow='hidden' overflowY='auto' >
            <Introduction header={t('leaderBoard.title')} text={t('leaderBoard.text')}></Introduction>
            {isDemoData && (
                <Alert status="info" borderRadius={layoutConfig.borderRadius}>
                    <AlertIcon />
                    Demo-Daten werden angezeigt, weil der Benchmarking-Server nicht erreichbar ist.
                </Alert>
            )}

            <Tabs variant="soft-rounded" colorScheme="teal" index={tabIndex} onChange={handleTabChange}>
                <TabList flexWrap="wrap" gap={layoutConfig.smallGap}>
                    <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius={layoutConfig.buttonBorderRadius} px={layoutConfig.padding} py={layoutConfig.padding} mr={layoutConfig.margin}>{t('leaderBoard.longTerm')}</Tab>
                    <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius={layoutConfig.buttonBorderRadius} px={layoutConfig.padding} py={layoutConfig.padding} mr={layoutConfig.margin}>{t('leaderBoard.midTerm')}</Tab>
                    <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius={layoutConfig.buttonBorderRadius} px={layoutConfig.padding} py={layoutConfig.padding} mr={layoutConfig.margin}>{t('leaderBoard.shortTerm')}</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <LeaderboardTable data={longTermData} timeRangeLabel="Long-term" />
                    </TabPanel>
                    <TabPanel>
                        <LeaderboardTable data={midTermData} timeRangeLabel="Mid-term" />
                    </TabPanel>
                    <TabPanel>
                        <LeaderboardTable data={shortTermData} timeRangeLabel="Short-term" />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex >
    );
}

function createDemoBenchmarkingData(): BenchmarkingResponseFormat[] {
    const leadTimes = ['l', 'm', 's'];
    const models = ['icon_d2', 'gfs_global', 'meteofrance', 'ecmwf_ifs'];

    return leadTimes.flatMap((leadTime, leadIndex) =>
        Array.from({ length: 18 }, (_, index) => {
            const modelIndex = index % models.length;
            const variation = (index + 1) * 0.07;

            return {
                cloud_cover: 35 + modelIndex * 4 + variation,
                dew_point_2m: 7 + leadIndex + modelIndex * 0.4 + variation,
                forecast_date: `2026-10-${String(22 - Math.floor(index / 6)).padStart(2, '0')}T${String((index % 6) * 4).padStart(2, '0')}:00:00Z`,
                lead_time: leadTime,
                model: models[modelIndex],
                precipitation: Math.max(0, 1.2 + leadIndex * 0.5 + (index % 5) * 0.35),
                relative_humidity_2m: 58 + leadIndex * 3 + (index % 7),
                result: '_result',
                surface_pressure: 1008 + modelIndex * 1.8 - leadIndex + variation,
                table: index + 1,
                temperature_2m: 12 + modelIndex * 0.8 - leadIndex * 0.6 + variation,
                wind_speed_10m: 8 + (index % 6) * 1.1 + leadIndex,
            };
        })
    );
}