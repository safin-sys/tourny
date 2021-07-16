import { Button, Container, Flex, FormControl, FormLabel, Heading, Input, Link, useDisclosure } from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"
import { ForgotPassword } from "../src/components/Modals"

export default function LoginPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Head>
                <title>Login | Tourny</title>
            </Head>
            <Container maxW="75vw" display="flex" alignItems="center" h="calc(100vh - 128px)">
                <Container maxW="400px" mb="2rem">
                    <Heading fontSize="1.5rem" mb="1rem" textAlign="center">Login</Heading>
                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input type="email" />
                    </FormControl>
                    <FormControl id="password" mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" />
                    </FormControl>
                    <Button colorScheme="twitter" w="100%" mt={4}>Login</Button>
                    <Flex justifyContent="space-between" mt={4}>
                        <Link onClick={onOpen}>Forgot Password?</Link>
                        <NextLink href="/register"><Link>Create Account</Link></NextLink>
                    </Flex>
                </Container>
                <ForgotPassword isOpen={isOpen} onClose={onClose} />
            </Container>
        </>
    )
}
