
import { Flex, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SelectModels from '../../components/elements/muiltiSelect/SelectModels';
import { layoutConfig, useColor } from '../../components/style';
import SelectParameter from '../../components/elements/muiltiSelect/SelectMeasurements';
import { weatherDataOptions } from '../../components/requests/currentForecacstBackend';


type ModelSelectionProps = {
  selectedModels: string[];
  selectedMeasurements: string[];
  selectedDateTime: string;
  onModelChange: (model: string[]) => void;
  onMeasurementChange: (model: string[]) => void;
  onDateTimeChange: (dateTime: string) => void;
};

export default function ConfigurationForRequest({ selectedModels, selectedDateTime, selectedMeasurements, onModelChange, onDateTimeChange, onMeasurementChange }: ModelSelectionProps) {
  const [selectModels, setSelectModels] = useState(selectedModels);
  const [selectDatetime, setSelectedDatetime] = useState(selectedDateTime);
  const [selectMeasurement, setSelectMeasurement] = useState(selectedMeasurements);


  useEffect(() => {
    setSelectModels(selectedModels);
  }, [selectedModels]);

  useEffect(() => {
    setSelectedDatetime(selectedDateTime);
  }, [selectedDateTime]);

  useEffect(() => {
    setSelectMeasurement(selectedMeasurements);
  }, [selectedMeasurements]);

  useEffect(() => {
    onModelChange(selectModels);
    // setSelectModels(selectedModels);
  }, [selectModels])

  useEffect(() => {
    onDateTimeChange(selectDatetime);
    // setSelectedDatetime(selectedDateTime);
  }, [selectDatetime])

  useEffect(() => {
    onMeasurementChange(selectMeasurement);
    // setSelectMeasurement(selectedMeasurements);
  }, [selectMeasurement])

  return (
    <Flex gap={layoutConfig.gap} alignItems={'center'}>
      <SelectModels selectModels={selectModels} setSelectModels={setSelectModels}></SelectModels>
      <SelectParameter select={selectMeasurement} setSelect={setSelectMeasurement} measurements={weatherDataOptions}></SelectParameter>
      <Input width={'fit-content'} borderColor={useColor('text')} _hover={{ borderColor: useColor('text') }} type="datetime-local" value={selectDatetime} onChange={(e) => setSelectedDatetime(e.target.value)} />
    </Flex>
  )
}
