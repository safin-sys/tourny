import { Box, Button, Container, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Text, useToast } from "@chakra-ui/react"
import Head from "next/head"
import NextLink from "next/link"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../src/helper/base"
import SignedIn from "../src/components/SignedIn"
import { useRouter } from "next/dist/client/router"

export default function Register() {
    const [user] = useAuthState(auth)
    return (
        <>
            <Head>
                <title>Register | Tourny</title>
            </Head>
            {user ? <SignedIn /> : <SignedOut />}
        </>
    )
}

const SignedOut = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const toast = useToast()
    const router = useRouter()
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log(userCredential.user.email)
                toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
                router.push('/')
            })
            .catch(err => {
                console.log(err);
                toast({
                    title: "Account creation failed.",
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
            })
    }
    return (
        <Container maxW="75vw" display="flex" alignItems="center" h="calc(100vh - 128px)">
            <Container maxW="400px" mb="2rem">
                <Heading fontSize="1.5rem" mb="1rem" textAlign="center">Register</Heading>
                <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={show ? "text" : "password"}
                            placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                            minLength="6"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                {show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button colorScheme="twitter" w="100%" mt={4} onClick={register}>Register</Button>
                <Box mt={4}>
                    <NextLink href="/login"><a>Already have an Account?</a></NextLink>
                </Box>
            </Container>
        </Container>

    )
}