import { Container, Flex, Grid, Text } from "@chakra-ui/react";
import Nav from "../src/components/shared/Nav";
import Footer from "../src/components/shared/Footer";
import Image from "next/image";

NotFound.title = "404 | Tourny";
export default function NotFound() {
    return (
        <Container>
            <Nav />
            <Grid h="calc(100vh - 12rem)" placeContent="center">
                <Flex flexDir="column" alignItems="center">
                    <Image
                        src="/images/404.webp"
                        height="100"
                        width="100"
                        alt="404"
                        priority
                    />
                    <Text fontWeight="bold" mt="1rem">404 | Does Not Compute</Text>
                </Flex>
            </Grid>
            <Footer />
        </Container>
    )
}