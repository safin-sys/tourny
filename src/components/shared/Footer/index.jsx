import { Flex, Link, useColorMode } from "@chakra-ui/react";

const Footer = () => {
    const { colorMode } = useColorMode()
    const color = colorMode === "dark" ? "blue.200" : "blue.500"
    return (
        <Flex as="footer" h="4rem" mt="4rem" justifyContent="center" alignItems="center">
            <Link
                href="https://fb.me/safintheship"
                isExternal
                color={color}
                fontStyle="italic"
                textDecor="underline"
                fontWeight="bold"
                fontSize="label.sm"
            >
                Safin Ahmed
            </Link>
        </Flex>
    );
};

export default Footer;
