
import { useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchModels } from './requests/forcastBackend';
import { CurrentForecastResponseFormat } from './requests/currentForecacstBackend';
import { useBackgroundColor, useSurfaceColor, useTextColor } from './style';

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
        console.log("Selected Option", selectedOptions)
    };

    const bgColor = useBackgroundColor();
    const focusColor = useSurfaceColor();
    const textColor = useTextColor();

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

    return (

        <Select
            options={measurements}
            isMulti
            value={measurements.filter((option) => select.includes(option.value))}
            onChange={(e) => handleModelChange(e)}
            placeholder="Select models..."
            menuPlacement='auto'
            styles={customStyles}
        />

    )
}



