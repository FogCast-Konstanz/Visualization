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
        } catch (err) {
            console.error("Error fetching benchmarking data:", err);
            setError("Failed to load benchmarking data. Please try again later.");
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
        <Flex direction='column' width='100%' gap={layoutConfig.gap} margin={'10px'} maxHeight={'calc(100vh - 20px)'} overflow='hidden' overflowY='auto' >
            <Introduction header={t('leaderBoard.title')} text={t('leaderBoard.text')}></Introduction>

            <Tabs variant="soft-rounded" colorScheme="teal" index={tabIndex} onChange={handleTabChange}>
                <TabList>
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