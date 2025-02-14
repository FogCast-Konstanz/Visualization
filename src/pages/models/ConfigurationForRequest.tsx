
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Box, Button, Card, Checkbox, Flex, Heading, Input, Menu, MenuButton, MenuItem, MenuList, useColorModeValue, VStack } from '@chakra-ui/react'
import PlotlyChart from "../.././components/ui/plotly/DefaultChart";
import LineGraph from "../.././components/plotly/LineGraph";
import BarGraph from "../../components/plotly/BarGraph";
import { extractTemperatureAndModelOutOfForcast, fetchForecast, fetchModels } from '../../components/requests/forcastBackend';
import { PlotlyChartDataFormat } from '@/components/plotly/DataFormat';
import { OrbitProgress } from 'react-loading-indicators';
import { TriangleDownIcon } from '@chakra-ui/icons';
import Select from 'react-select';

type ModelSelectionProps = {
  selectedModels: string[];
  selectedDateTime: string;
  onModelChange: (model: string[]) => void;
  onDateTimeChange: (dateTime: string) => void;
};


export default function ConfigurationForRequest({ selectedModels, selectedDateTime, onModelChange, onDateTimeChange }: ModelSelectionProps) {

  const [models, setModels] = useState<string[] | null>(null)
  const [modelOptions, setModelOptions] = useState<ModelOption[]>([]);

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const forcastResponse = await fetchModels();
    setModels(forcastResponse)

    setModelOptions(forcastResponse.map((model) => ({ label: model, value: model })))
  };

  // const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
  //   onModelChange(selectedOptions);
  // };

  function handleModelChange(selectedOptions: any) {
    onModelChange(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
  };

  function handleDatetimeChange(datetime: any) {
    const isoDateTime = new Date(datetime).toISOString();
    onDateTimeChange(isoDateTime);
  }


  const bgColor = useColorModeValue('custom_light.primary', 'custom_dark.primary');
  const textColor = useColorModeValue("black", "white");

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: bgColor,
      color: textColor,
      borderColor: useColorModeValue("gray.300", "gray.600"),
      width: "100%"
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: useColorModeValue('pink', 'custom_dark.primary'),
      width: "100%"
    }),
    option: (provided: any, { isFocused }: any) => ({
      ...provided,
      backgroundColor: isFocused ? useColorModeValue("gray.100", "gray.600") : bgColor,
      color: textColor,
    }),
  };

  return (
    <VStack spacing={4} p={5} width='100%'>
      {/* <Select placeholder="Select model" value={selectedModels} onChange={(e: any) => handleModelChange(e)} >
        {models && models.map(model => (
          <option key={model} value={model}>{model}</option>
        ))}
      </Select> */}

      <Select
        options={modelOptions}
        isMulti
        value={modelOptions.filter((option) => selectedModels.includes(option.value))}
        onChange={handleModelChange}
        placeholder="Select models..."
        styles={customStyles}
      />

      {/* <Menu closeOnSelect={false}>
        <MenuButton as={Button} rightIcon={<TriangleDownIcon></TriangleDownIcon>}>
          {selectedModels.length > 0 ? selectedModels.join(", ") : "Select Models"}
        </MenuButton>
        <MenuList>
          {models && models.map((model) => (
            <MenuItem key={model} onClick={() => toggleModel(model)}>
              <Checkbox isChecked={selectedModels.includes(model)} mr={2} />
              {model}
            </MenuItem>
          ))}
        </MenuList>
      </Menu> */}


      <Input type="datetime-local" value={selectedDateTime} onChange={(e) => handleDatetimeChange(e.target.value)} />

      <Button colorScheme="blue" onClick={fetchData}>Fetch Data</Button>
    </VStack>
  )
}

type ModelOption = { label: string; value: string };

