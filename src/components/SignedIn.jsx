import { Box, Container, Heading, Text } from "@chakra-ui/react";

export default function SingedIn() {
    return (
        <Container maxW="75vw" display="flex" alignItems="center" h="calc(100vh - 128px)">
            <Box mx="auto">
                <Heading>You are already signed in.</Heading>
                <Text mt={4}>{"Why are you still here? Just to suffer? Every night, You can feel your leg… and your arm… even your fingers. The body You've lost… the comrades You've lost… won’t stop hurting… It’s like they’re all still there. You feel it, too, don’t you?"}</Text>
            </Box>
        </Container>
    )
}