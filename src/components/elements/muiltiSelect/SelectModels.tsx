
import { useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchModels } from '../../requests/forcastBackend';
import { useColor, useSurfaceColor, useTextColor } from '../../style';
import { selectedStyle } from './selectStyle';

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
    };

    return (

        <Select
            options={modelOptions}
            isMulti
            value={modelOptions.filter((option) => selectModels.includes(option.value))}
            onChange={(e) => handleModelChange(e)}
            placeholder="Select models..."
            menuPlacement='auto'
            styles={selectedStyle()}
        />

    )
}



