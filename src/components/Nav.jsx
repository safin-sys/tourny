import { Flex, Heading, IconButton, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { HiMoon, HiSun } from "react-icons/hi";

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex h="4rem" alignItems="center" justifyContent="space-between">
            <Heading fontFamily="pacifico" fontSize="1.5rem" fontWeight="medium">Tourny</Heading>
            <Flex gap="1rem" fontWeight="medium" alignItems="center">
                <Link href="/">Login</Link>
                <Link href="/">Signup</Link>
                <IconButton
                    aria-label="Toggle dark mode"
                    onClick={toggleColorMode}
                    icon={colorMode === "light" ? <HiMoon /> : <HiSun />}
                />
            </Flex>
        </Flex>
    )
}
