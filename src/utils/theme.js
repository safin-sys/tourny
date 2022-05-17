import "@fontsource/pacifico"
import "@fontsource/nunito"
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    config: {
        initialColorMode: "light",
        useSystemColorMode: true,
    },
    fonts: {
        logo: 'Pacifico, sans-serif',
        heading: 'Nunito, sans-serif',
        body: 'Nunito, sans-serif',
    },
    fontSizes: {
        title: {
            sm: "0.875rem",
            md: "1rem",
            lg: "1.375rem",
        },
        label: {
            sm: "0.75rem",
            lg: "0.875rem",
        },
        body: {
            sm: "0.75rem",
            md: "0.875rem",
            lg: "1rem",
        }
    },
})

export default theme;