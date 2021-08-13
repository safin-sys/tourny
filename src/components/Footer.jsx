import { Flex, Link, Container } from "@chakra-ui/layout"

export const Footer = () => {
    return (
        <Container maxW="75vw">
            <Flex as="footer" justifyContent="space-between" alignItems="center" h="4rem">
                <Link isExternal href="https://safin.netlify.app/"  fontStyle="italic">Safin Ahmed</Link>
                <Link isExternal href="mailto:safinahmed248@gmail.com" fontStyle="italic">safinahmed248@gmail.com</Link>
            </Flex>
        </Container>
    )
}
