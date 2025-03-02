
import { Button, Icon, IconButton, Input, Menu, MenuButton, MenuList, useColorModeValue, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { GrConfigure } from "react-icons/gr";
import SelectModels from '../../components/SelectModels';

type ModelSelectionProps = {
  selectedModels: string[];
  selectedDateTime: string;
  onModelChange: (model: string[]) => void;
  onDateTimeChange: (dateTime: string) => void;
};

export default function ConfigurationForRequest({ selectedModels, selectedDateTime, onModelChange, onDateTimeChange }: ModelSelectionProps) {

  const [selectModels, setSelectModels] = useState(selectedModels);
  const [selectDatetime, setSelectedDatetime] = useState(selectedDateTime);

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
          <SelectModels selectModels={selectModels} setSelectModels={setSelectModels}></SelectModels>
          <Input type="datetime-local" value={selectDatetime} onChange={(e) => setSelectedDatetime(e.target.value)} />
          <Button onClick={() => setValues()}>Send</Button>
        </VStack>
      </MenuList>
    </Menu >
  )
}
