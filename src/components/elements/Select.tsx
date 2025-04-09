// CustomSelect.tsx
import { Select } from "@chakra-ui/react";
import { useColor } from '../../components/style';
// adjust path as needed

interface Option {
    code: string | number;
    label: string;
}

interface CustomSelectProps {
    value?: string | number;
    defaultValue?: string | number;
    placeholder?: string;
    onChange: (value: string | number | any) => void;
    options: Option[];
}

export default function CustomSelect({ value, onChange, options, defaultValue, placeholder }: CustomSelectProps) {
    const bg = useColor("background");
    const text = useColor("text");
    const focusColor = useColor('surface')

    return (
        <Select
            defaultValue={defaultValue}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e)}
            width="fit-content"
            bg={bg}
            color={text}
            border="1px solid"
            borderColor={text}
            borderRadius="md"
            _focus={{
              borderColor: text,
              boxShadow: "none"
            }}
            sx={{
              option: {
                background: bg,
                border: '0px',
                color: text,
                padding: "8px",
                _hover: { 
                    background: focusColor
                }
              },
            }}
        >
            {options.map(({ code, label }) => (
                <option key={code} value={code} color={text}>
                    {label}
                </option>
            ))}
        </Select>
    );
};
