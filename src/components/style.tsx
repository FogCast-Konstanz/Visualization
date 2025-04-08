

import { useColorModeValue } from '@chakra-ui/react';

const colors = {
    dark: {
        surface: "#2F4F4F",
        background: "#293F3F",
        text: "#DCDCDC",
        secondarytext: "#000000",
        primary: "rgb(195, 245, 175)",
        primary_variant: "#4f8b8b",
        secondary: "#A1E5AB",
        ternary: "#AE5656",
        warning: "#FFAA33 "
    },
    light: {
        surface: "#DDEDED",
        background: "#C7DFDF",
        text: "#2F4F4F",
        secondarytext: "#FFFFFF",
        primary: "#4C8C8C",
        primary_variant: "#4C8C8CBA", // 70% transparent
        secondary: "#7EDBB7",       // Mint green for secondary actions
        ternary: "#F28C8C",         // Warm coral for contrast or alerts
        warning: "#FFA500"
    }
}

// export const useColor = () => useColorModeValue('custom_light.background', 'custom_dark.background');
// export const useSurfaceColor = () => useColorModeValue('custom_light.surface', 'custom_dark.surface');
// export const useTextColor = () => useColorModeValue('custom_light.text', 'custom_dark.text');
// export const useColor = () => useColorModeValue(colors.light.background, colors.dark.background);
export const useSurfaceColor = () => useColorModeValue(colors.light.surface, colors.dark.surface);
export const useTextColor = () => useColorModeValue(colors.light.text, colors.dark.text);
export const useSecondaryTextColor = () => useColorModeValue(colors.light.secondarytext, colors.dark.secondarytext);
export const usePrimaryColor = () => useColorModeValue(colors.light.primary, colors.dark.primary);
export const usePrimaryVariantColor = () => useColorModeValue(colors.light.primary_variant, colors.dark.primary_variant);
export const useWarningColor = () => useColorModeValue(colors.light.warning, colors.dark.warning);
export const useGraphColors = () => useColorModeValue(["#F39C12", "#E74C3C", "#3498DB", "#9B59B6", "#2ECC71"], ["#A1C3D1", "#FFB6C1", "#C5E1A5", "#FFD3B6", "#D4A5A5"],)

export function useColor(color: 'background' | 'surface' | 'text' | 'secondaryText' | 'primary' | 'primaryVariant' | 'warning') {
    switch (color) {
        case 'background': return useColorModeValue(colors.light.background, colors.dark.background);
        case 'surface': return useColorModeValue(colors.light.surface, colors.dark.surface);
        case 'text': return useColorModeValue(colors.light.text, colors.dark.text);
        case 'secondaryText': return useColorModeValue(colors.light.secondarytext, colors.dark.secondarytext);
        case 'primary': return useColorModeValue(colors.light.primary, colors.dark.primary);
        case 'primaryVariant': return useColorModeValue(colors.light.primary_variant, colors.dark.primary_variant);
        case 'warning': return useColorModeValue(colors.light.warning, colors.dark.warning);
        default: return '#FFFFFF'
    }
}


export const layoutConfig = {
    margin: '10px',
    padding: '10px',
    
    smallGap: '5px',

    pageWidth: 'calc(100vw - 250px)',
    pageHeight: '100dvh',

    borderRadius: '15px',
    buttonBorderRadius: '5px',

    gap: '10px',

    navBar: {
        width: '250px',
        height: '100dvh'

    }
};


// custom_dark: {
//     surface: "#2F4F4F",
//     background: "#293F3F",

//     // surface: "#2f6969",
//     // background: "#2F4F4F",
//     text: "#DCDCDC",
//     secondarytext: "#000000",
//     primary:"rgb(195, 245, 175)",
//     primary_variant:"#4f8b8b",
//     secondary: "#A1E5AB",
//     ternary: "#AE5656",
//     warning: "#FFAA33 "
// },
// custom_light: {
//     surface: "#DDEDED",
//     background: "#C7DFDF",
//     text: "#2F4F4F",
//     secondarytext: "#FFFFFF",
//     primary: "#4C8C8C",
//     primary_variant: "#4C8C8CBA", // 70% transparent
//     secondary: "#7EDBB7",       // Mint green for secondary actions
//     ternary: "#F28C8C",         // Warm coral for contrast or alerts
//     warning: "#FFA500"
// }