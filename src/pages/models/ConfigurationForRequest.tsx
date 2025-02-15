
import { useEffect, useState } from 'react'
import { Button, Icon, IconButton, Input, Menu, MenuButton, MenuList, useColorModeValue, VStack } from '@chakra-ui/react'
import { fetchModels } from '../../components/requests/forcastBackend';

import Select from 'react-select';
import { GrConfigure } from "react-icons/gr";

type ModelSelectionProps = {
  selectedModels: string[];
  selectedDateTime: string;
  onModelChange: (model: string[]) => void;
  onDateTimeChange: (dateTime: string) => void;
};

export default function ConfigurationForRequest({ selectedModels, selectedDateTime, onModelChange, onDateTimeChange }: ModelSelectionProps) {

  const [modelOptions, setModelOptions] = useState<ModelOption[]>([]);
  const [selectModels, setSelectModels] = useState(selectedModels);
  const [selectDatetime, setSelectedDatetime] = useState(selectedDateTime);

  useEffect(() => { fetchData() }, [])

  async function fetchData() {
    const forcastResponse = await fetchModels();

    setModelOptions(forcastResponse.map((model) => ({ label: model, value: model })))
  };


  function handleModelChange(selectedOptions: any) {
    setSelectModels(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
    console.log("Selected Option", selectedOptions)
  };

  const bgColor = useColorModeValue('#C7DFDF', '#293F3F');
  const focusColor = useColorModeValue('#DDEDED', '#2F4F4F');
  const textColor = useColorModeValue("#2F4F4F", "#DCDCDC");

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: bgColor,
      boxShadow: "none",
      color: textColor,
      borderColor: textColor,
      width: "100%",
      maxWidth: "500px"
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: bgColor,
      width: "100%"
    }),
    option: (provided: any, { isFocused }: any) => ({
      ...provided,
      backgroundColor: isFocused ? focusColor : bgColor,
      color: textColor,
    }),
  };

  function setValues() {
    onModelChange(selectModels);
    onDateTimeChange(selectDatetime);
  }

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<Icon as={GrConfigure} />} aria-label="Open Config" width={'20px'} />
      <MenuList p={3} maxWidth={{lg: '600px', base: '400px'}} 
        background={useColorModeValue('custom_light.background', 'custom_dark.background')}
        textColor={useColorModeValue('custom_light.text', 'custom_dark.text')}>
        <VStack spacing={4} p={5} width='100%'>
          <Select
            options={modelOptions}
            isMulti
            value={modelOptions.filter((option) => selectModels.includes(option.value))}
            onChange={(e) => handleModelChange(e)}
            placeholder="Select models..."
            menuPlacement='auto'
            styles={customStyles}
          />
          <Input type="datetime-local" value={selectDatetime} onChange={(e) => setSelectedDatetime(e.target.value)} />
          <Button onClick={() => setValues()}>Send</Button>
        </VStack>
      </MenuList>
    </Menu >
  )
}

type ModelOption = { label: string; value: string };

