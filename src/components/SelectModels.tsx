
import { useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchModels } from './requests/forcastBackend';
import { useBackgroundColor, useSurfaceColor, useTextColor } from './style';

type ModelSelectionProps = {
    selectModels: string[];
    setSelectModels: (model: string[]) => void;
};

type ModelOption = { label: string; value: string };

export default function SelectModels({ selectModels, setSelectModels }: ModelSelectionProps) {

    const [modelOptions, setModelOptions] = useState<ModelOption[]>([]);

    useEffect(() => { fetchData() }, [])

    async function fetchData() {
        const forcastResponse = await fetchModels();

        setModelOptions(forcastResponse.map((model) => ({ label: model, value: model })))
    };


    function handleModelChange(selectedOptions: any) {
        setSelectModels(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
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
            options={modelOptions}
            isMulti
            value={modelOptions.filter((option) => selectModels.includes(option.value))}
            onChange={(e) => handleModelChange(e)}
            placeholder="Select models..."
            menuPlacement='auto'
            styles={customStyles}
        />

    )
}



