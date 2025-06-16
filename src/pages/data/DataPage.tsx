import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Introduction from '../../components/elements/Introduction';
import { layoutConfig, useColor, useGraphColors } from '../../components/style';
import DataSource from '../impressum/DataSource';

const tabKeys = ['temperature', 'fog', 'waterLevel'];

import FogTab from './tabs/fog';
import TemperatureTab from './tabs/temperature';
import WaterLevelTab from './tabs/waterLevel';


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
  const textColorActive = useColor('buttonText');
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
            <TemperatureTab isActive={tabIndex === 0} />
          </TabPanel>
          <TabPanel>
            <FogTab isActive={tabIndex === 1} />
          </TabPanel>
          <TabPanel>
            <WaterLevelTab isActive={tabIndex === 2} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <DataSource></DataSource>
    </Flex>
  )
}
