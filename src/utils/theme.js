import { extendTheme } from "@chakra-ui/react";
import "@fontsource/pacifico"
import "@fontsource/nunito"

const theme = extendTheme({
    config: {
        initialColorMode: "system",
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
            sm: "0.6875rem",
            md: "0.75rem",
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