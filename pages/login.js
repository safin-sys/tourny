import { Button, Container, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, useDisclosure, useToast } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import NextLink from "next/link"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { ForgotPassword } from "../src/components/Modals"
import SingedIn from "../src/components/SignedIn"
import { auth } from "../src/helper/base"

export default function LoginPage() {
    const [user] = useAuthState(auth)
    return (
        <>
            <Head>
                <title>Login | Tourny</title>
            </Head>
            {user ? <SingedIn /> : <SignedOut />}
        </>
    )
}

const SignedOut = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const router = useRouter()
    const login = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log(userCredential.user.email)
                toast({
                    title: "Login Successful.",
                    description: "You've successfully logged on to your account.",
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
                    title: "Login Unsuccessful.",
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
            })
    }
    return (
        <>
            <Container maxW="75vw" display="flex" alignItems="center" h="calc(100vh - 128px)">
                <Container maxW="400px" mb="2rem">
                    <Heading fontSize="1.5rem" mb="1rem" textAlign="center">Login</Heading>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
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
                    <Button colorScheme="twitter" w="100%" mt={4} onClick={login} type="submit">Login</Button>
                    <Flex justifyContent="space-between" mt={4}>
                        <a onClick={onOpen}>Forgot Password?</a>
                        <NextLink href="/register"><a>Create Account</a></NextLink>
                    </Flex>
                </Container>
                <ForgotPassword isOpen={isOpen} onClose={onClose} />
            </Container>
        </>
    )
}
