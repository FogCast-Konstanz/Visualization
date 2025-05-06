import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrbitProgress } from 'react-loading-indicators';
import Introduction from '../../components/elements/Introduction';
import PlotlyChart from '../../components/plotly/DefaultChart';
import { convertToPlotlyChartFormat, PlotlyChartBasicFormat, PlotlyChartDataFormat, weekdayAnnotations } from '../../components/plotly/PlotlyChartFormat';
import { fetchFogDaysHistoryDWD, fetchTemperatureHistoryDWD, fetchWaterLevelHistory, formatActualDatetime, highlightingAndAverage, parseActualRequestToPlotlyXYFormat, parseActualRequestToPlotlyXYFormatYearWise } from '../../components/requests/actualBackend';
import { layoutConfig, useColor, useGraphColors } from '../../components/style';
import DataSource from '../impressum/DataSource';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const tabKeys = ['temperature', 'fog', 'waterLevel'];

import { lazy, Suspense } from 'react'
import FogTab from './tabs/fog';
import WaterLevelTab from './tabs/waterLevel';
import TemperatureTab from './tabs/temperature';


export default function DataPage() {


  useEffect(() => {
    requestBackend()
  }, [])

  // Handle Navigation
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'temperature';
  const tabIndex = tabKeys.indexOf(tab);

  const handleTabChange = (index: number) => {
    setSearchParams({ tab: tabKeys[index] });
  };

  const { t } = useTranslation()

  const loadingColor = useColor('primary');
  const graphcolors = useGraphColors();

  const bgColor = useColor('background');
  const textColor = useColor('text');
  const tabBg = useColor('background');
  const tabSelectedBg = useColor('primary');

  async function requestBackend() {

  }

  return (
    <Flex direction='column' width='100%' gap={layoutConfig.gap} margin={'10px'} maxHeight={'calc(100vh - 20px)'} overflow='hidden' overflowY='auto' >
      <Introduction header={t('dataPage.title')} text={t('dataPage.introduction')}></Introduction>

      <Tabs variant="soft-rounded" colorScheme="teal" index={tabIndex} onChange={handleTabChange}>
        <TabList>
          <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius={layoutConfig.buttonBorderRadius} px={layoutConfig.padding} py={layoutConfig.padding} mr={layoutConfig.margin}>{t('dataPage.tempTab')}</Tab>
          <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius={layoutConfig.buttonBorderRadius} px={layoutConfig.padding} py={layoutConfig.padding} mr={layoutConfig.margin}>{t('dataPage.fogTab')}</Tab>
          <Tab _selected={{ bg: tabSelectedBg, color: textColor }} bg={tabBg} color={textColor} borderRadius={layoutConfig.buttonBorderRadius} px={layoutConfig.padding} py={layoutConfig.padding} mr={layoutConfig.margin}>{t('dataPage.waterLevelTab')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TemperatureTab></TemperatureTab>
          </TabPanel>

          {/* Fog Graphs */}
          <TabPanel>
            <FogTab></FogTab>

          </TabPanel>

          {/* Water Level Graph */}
          <TabPanel>
              <WaterLevelTab></WaterLevelTab>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <DataSource></DataSource>
    </Flex>
  )
}
