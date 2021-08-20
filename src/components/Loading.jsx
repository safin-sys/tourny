import { Grid, Spinner } from "@chakra-ui/react";

export default function Loading({ h }) {
    return (
        <Grid height={h ? "calc(100vh - 128px)" : "auto"} placeContent="center">
            <Spinner size="xl" />
        </Grid>
    )
}
