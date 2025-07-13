import { useColor } from "../../style";

export function selectedStyle() {
    const bgColor = useColor('background');
    const focusColor = useColor('surface');
    const textColor = useColor('text');
    const primaryColor = useColor('primaryVariant');
    const warningColor = useColor('warning');

    const selectStyle = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: bgColor,
            boxShadow: "none",
            color: textColor,
            borderColor: textColor,
            ':hover': {
                borderColor: textColor,
            },
            width: "100%",
            maxWidth: "500px"
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: bgColor,
            width: "100%",
            color: textColor
        }),
        option: (provided: any, { isFocused }: any) => ({
            ...provided,
            backgroundColor: isFocused ? focusColor : bgColor,
            color: textColor,
        }),
        multiValue: (provided: any) => ({
            ...provided,
            backgroundColor: focusColor,
            color: textColor,
        }),
        multiValueLabel: (provided: any) => ({
            ...provided,
            color: textColor,
        }),
        multiValueRemove: (provided: any) => ({
            ...provided,
            color: textColor,
            ':hover': {
                backgroundColor: primaryColor,
                color: textColor,
            },
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            color: textColor,
            ':hover': {
                color: primaryColor,
            },
        }),

        clearIndicator: (provided: any) => ({
            ...provided,
            color: textColor,
            ':hover': {
                color: primaryColor
            },
        }),

        placeholder: (provided: any) => ({
            ...provided,
            color: textColor, // or your desired placeholder color
        }),
    };

    return (selectStyle);

}
