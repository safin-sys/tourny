import { Container, Flex, Link } from "@chakra-ui/layout"
import { Avatar, Box, Heading, MenuItem, Switch, useToast } from "@chakra-ui/react"
import { useColorMode } from "@chakra-ui/color-mode"
import { Menu, MenuButton, MenuList, MenuDivider } from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import NextLink from 'next/link'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../helper/base"
import { useRouter } from "next/router"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore"

export const Nav = () => {
    return (
        <Container h="4rem" maxW="75vw">
            <Flex h="100%" alignItems="center" justifyContent="space-between">
                <NextLink href="/"><a><Heading as="h3" fontSize="1.5rem" fontWeight="normal" fontFamily="Pacifico" cursor="pointer">Tourny</Heading></a></NextLink>
                <NavLinks />
            </Flex>
        </Container>
    )
}

const NavLinks = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const [user] = useAuthState(auth)
    return (
        <Flex className="nav-links" alignItems="center" justifyContent="space-between" fontWeight="medium">
            {user ? <LoggedInLinks colorMode={colorMode} toggleColorMode={toggleColorMode} /> : <LoggedOutLinks colorMode={colorMode} toggleColorMode={toggleColorMode} />}
        </Flex>
    )
}

const NavAvatar = ({ colorMode, toggleColorMode }) => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const { displayName, uid } = user
    const [value] = useDocumentDataOnce(db.collection('players').doc(uid))
    const toast = useToast()
    const signOut = () => {
        auth.signOut()
            .then(() => {
                toast({
                    title: "Successfully Logged Out",
                    description: "You are logged out of your account.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
                router.push('/')
            })
    }
    return (
        <Menu closeOnSelect={false}>
            <MenuButton>
                <Avatar name={displayName && displayName} src={value?.dp} />
            </MenuButton>
            <MenuList minWidth="240px">
                <Container display="flex" flexDirection="column">
                    <NextLink href={`/players/player?id=${uid}`}>
                        <a style={{ textDecoration: "none" }}>
                            <MenuItem fontWeight="bold">{displayName}</MenuItem>
                        </a>
                    </NextLink>
                    <MenuItem fontWeight="bold">Your Matches</MenuItem>
                    <MenuDivider />
                    <MenuItem>
                        <FormControl display="flex" alignItems="center">
                            <FormLabel>
                                Toggle {colorMode === "dark" ? "Light" : "Dark"}
                            </FormLabel>
                            <Switch onChange={toggleColorMode} />
                        </FormControl>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem fontWeight="bold" color="red.400" onClick={signOut}>Logout</MenuItem>
                </Container>
            </MenuList>
        </Menu>
    )
}

const LoggedInLinks = () => {
    return (
        <>
            <NextLink href="/"><a>Home</a></NextLink>
            <NextLink href="/tournaments"><a>Tournaments</a></NextLink>
            <NextLink href="/teams"><a>Teams</a></NextLink>
            <NextLink href="/players"><a>Players</a></NextLink>
            <NavAvatar />
        </>
    )
}

const LoggedOutLinks = ({ colorMode, toggleColorMode }) => {
    return (
        <>
            <NextLink href="/login"><a>Login</a></NextLink>
            <NextLink href="/register"><a>Register</a></NextLink>
            <Box>Toggle {colorMode === "dark" ? "Light" : "Dark"} <Switch ml=".5rem" onChange={toggleColorMode} />
            </Box>
        </>
    )
}