import { Container, Flex, Link } from "@chakra-ui/layout"
import { Avatar, Heading, Switch } from "@chakra-ui/react"
import { useColorMode } from "@chakra-ui/color-mode"
import { Menu, MenuButton, MenuList, MenuDivider } from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import NextLink from 'next/link'

export const Nav = () => {
    return (
        <Container h="4rem" maxW="75vw">
            <Flex h="100%" alignItems="center" justifyContent="space-between">
                <NextLink href="/"><Heading as="h3" fontSize="1.5rem" fontWeight="normal" fontFamily="Pacifico" cursor="pointer">Tourny</Heading></NextLink>
                <NavLinks />
            </Flex>
        </Container>
    )
}

const NavLinks = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const isLoggedIn = true
    return (
        <Flex alignItems="center" justifyContent="space-between" fontWeight="medium">
            {/* {isLoggedIn ? <LoggedInLinks /> : <LoggedOutLinks />} */}
            <LoggedInLinks />
            <LoggedOutLinks />
            <Menu closeOnSelect={false}>
                <MenuButton>
                    <Avatar name="SafinTheShip" src="https://live.staticflickr.com/2445/3610341613_c8434baab9_b.jpg" />
                </MenuButton>
                <MenuList minWidth="240px">
                    <Container display="flex" flexDirection="column">
                        <Link>SafinTheShip</Link>
                        <Link>Your Matches</Link>
                        <MenuDivider />
                        <FormControl display="flex" alignItems="center">
                            <FormLabel>
                                Toggle {colorMode === "dark" ? "Light" : "Dark"}
                            </FormLabel>
                            <Switch onChange={toggleColorMode} />
                        </FormControl>
                        <MenuDivider />
                        <Link>Logout</Link>
                    </Container>
                </MenuList>
            </Menu>
        </Flex>
    )
}

const LoggedInLinks = () => {
    return (
        <>
            <NextLink href="/"><Link mr="1.5rem">Home</Link></NextLink>
            <NextLink href="/ts"><Link mr="1.5rem">Tournaments</Link></NextLink>
            <NextLink href="/players"><Link mr="1.5rem">Players</Link></NextLink>
        </>
    )
}

const LoggedOutLinks = () => {
    return (
        <>
            <NextLink href="/login"><Link mr="1.5rem">Login</Link></NextLink>
            <NextLink href="/register"><Link mr="2rem">Register</Link></NextLink>
        </>
    )
}