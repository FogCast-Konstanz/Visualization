

import { useColorModeValue } from '@chakra-ui/react';

// export const useBackgroundColor = () => useColorModeValue('custom_light.background', 'custom_dark.background');
// export const useSurfaceColor = () => useColorModeValue('custom_light.surface', 'custom_dark.surface');
// export const useTextColor = () => useColorModeValue('custom_light.text', 'custom_dark.text');
export const useBackgroundColor = () => useColorModeValue('#C7DFDF', '#293F3F');
export const useSurfaceColor = () => useColorModeValue('#DDEDED', '#2F4F4F');
export const useTextColor = () => useColorModeValue("#2F4F4F", "#DCDCDC");
export const useSecondaryTextColor = () => useColorModeValue("#FFFFFF", "#000000");
export const usePrimaryColor = () => useColorModeValue('#4C8C8CBA', '#4C8C8CBA');
export const useWarningColor = () => useColorModeValue('#FFA500', '#FFAA33');
export const useGraphColors = () => useColorModeValue(["#F39C12", "#E74C3C", "#3498DB", "#9B59B6", "#2ECC71"], ["#A1C3D1", "#FFB6C1", "#C5E1A5", "#FFD3B6", "#D4A5A5"],)

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