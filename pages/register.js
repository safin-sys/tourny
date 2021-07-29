import { Box, Button, Container, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"

export default function Register() {
    return (
        <>
            <Head>
                <title>Register | Tourny</title>
            </Head>
            <Container maxW="75vw" display="flex" alignItems="center" h="calc(100vh - 128px)">
                <Container maxW="400px" mb="2rem">
                    <Heading fontSize="1.5rem" mb="1rem" textAlign="center">Register</Heading>
                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input type="email" />
                    </FormControl>
                    <FormControl id="password" mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" />
                    </FormControl>
                    <FormControl id="password" mt={4}>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input type="password" />
                    </FormControl>
                    <Button colorScheme="twitter" w="100%" mt={4}>Register</Button>
                    <Box mt={4}>
                        <NextLink href="/login"><a>Already have an Account?</a></NextLink>
                    </Box>
                </Container>
            </Container>
        </>
    )
}
