import { Grid, Spinner } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Grid height="calc(100vh - 128px)" placeContent="center">
            <Spinner size="xl" />
        </Grid>
    )
}
