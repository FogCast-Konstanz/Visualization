
// 1. import `extendTheme` function
import { extendTheme, useColorModeValue, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}


// 3. extend the theme
const theme = extendTheme({
    config,
    colors: {
        custom_dark: {
            surface: "#2F4F4F",
            background: "#293F3F",
            text: "#DCDCDC",
            secondarytext: "#000000",
            primary: "#AFDBF5",
            primary_variant: "#AFDBF5BA",
            secondary: "#A1E5AB",
            ternary: "#AE5656",
        },
        custom_light: {
            surface: "#DDEDED",
            background: "#C7DFDF",
            text: "#2F4F4F",
            secondarytext: "#5A7676",
            primary: "#DDEDED",         // Soft sky blue for accents
            primary_variant: "#DDEDEDBA", // 70% transparent
            secondary: "#7EDBB7",       // Mint green for secondary actions
            ternary: "#F28C8C"          // Warm coral for contrast or alerts
        }
    },
    // components: {
    //     Card: {
    //         defaultProps: {
    //             size: 'lg', // default is md
    //             variant: 'sm', // default is solid
    //             colorScheme: ...
    //         },
    //     },
    // },
})

export default theme