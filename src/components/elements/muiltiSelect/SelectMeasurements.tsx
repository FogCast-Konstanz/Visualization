
import { useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchModels } from '../../requests/forcastBackend';
import { CurrentForecastResponseFormat } from '../../requests/currentForecacstBackend';
import { useColor, useSurfaceColor, useTextColor } from '../../style';
import { selectedStyle, } from './selectStyle';

type ModelSelectionProps = {
    select: string[];
    setSelect: (model: string[]) => void;
    measurements: ModelOption[]
};

type MeasurementKeys = keyof CurrentForecastResponseFormat;
export type ModelOption = { label: string; value: MeasurementKeys; };

export default function SelectParameter({ select, setSelect, measurements }: ModelSelectionProps) {

    useEffect(() => { }, [])

    function handleModelChange(selectedOptions: any) {
        setSelect(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
    };

    return (
        <Select
            options={measurements}
            isMulti
            value={measurements.filter((option) => select.includes(option.value))}
            onChange={(e) => handleModelChange(e)}
            placeholder="Select models..."
            menuPlacement='auto'
            styles={selectedStyle()}
        />

    )
}



