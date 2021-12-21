import { IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { HiMoon, HiSun } from "react-icons/hi";

export const LoggedOutNavLinks = ({ colorMode, toggleColorMode }) => {
    return (
        <>
            <Link href="/">Login</Link>
            <Link href="/">Signup</Link>
            <IconButton
                aria-label="Toggle dark mode"
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <HiMoon /> : <HiSun />}
            />
        </>
    );
};
