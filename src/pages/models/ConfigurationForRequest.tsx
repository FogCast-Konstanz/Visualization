
import { Flex, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SelectModels from '../../components/elements/muiltiSelect/SelectModels';
import { layoutConfig, useColor } from '../../components/style';


type ModelSelectionProps = {
  selectedModels: string[];
  selectedDateTime: string;
  onModelChange: (model: string[]) => void;
  onDateTimeChange: (dateTime: string) => void;
};

export default function ConfigurationForRequest({ selectedModels, selectedDateTime, onModelChange, onDateTimeChange }: ModelSelectionProps) { 
  const [selectModels, setSelectModels] = useState(selectedModels);
  const [selectDatetime, setSelectedDatetime] = useState(selectedDateTime);
  
  useEffect(() => {
    onModelChange(selectModels);
  }, [selectModels])

  useEffect(() => {
    onDateTimeChange(selectDatetime);
  }, [selectDatetime])

  function setValues() {
    onModelChange(selectModels);
    onDateTimeChange(selectDatetime);
  }

  return (
    // <Menu>
    //   <MenuButton as={IconButton} icon={<Icon as={GrConfigure} />} aria-label="Open Config" width={'20px'} />
    //   <MenuList p={layoutConfig.padding} maxWidth={{lg: '600px', base: '400px'}} 
    //     background={useColor('background')}
    //     textColor={useColor('text')}>
    //     <VStack spacing={layoutConfig.padding} p={layoutConfig.padding} width='100%'>

    //       <Button onClick={() => setValues()}>Send</Button>
    //     </VStack>
    //   </MenuList>
    // </Menu >

    <Flex gap={layoutConfig.gap} alignItems={'center'}>
          <SelectModels selectModels={selectModels} setSelectModels={setSelectModels}></SelectModels>
          <Input width={'fit-content'} borderColor={useColor('text')} _hover={{borderColor: useColor('text')}} type="datetime-local" value={selectDatetime} onChange={(e) => setSelectedDatetime(e.target.value)} />
    </Flex>
  )
}
