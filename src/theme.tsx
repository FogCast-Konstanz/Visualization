
// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

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

            // surface: "#2f6969",
            // background: "#2F4F4F",
            text: "#DCDCDC",
            secondarytext: "#000000",
            primary:"rgb(195, 245, 175)",
            primary_variant:"#4f8b8b",
            secondary: "#A1E5AB",
            ternary: "#AE5656",
            warning: "#FFAA33 "
        },
        custom_light: {
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