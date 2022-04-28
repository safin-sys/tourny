import { Box, Flex, Link } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Flex as="footer" h="4rem" mt="4rem" justifyContent="center" alignItems="center">
            <Link
                href="https://fb.me/safintheship"
                isExternal
                color="blue.500"
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
