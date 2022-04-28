import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "./Logo";

const Nav = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex justifyContent="space-between" alignItems="center" h="4rem">
            <Logo />
            <IconButton onClick={toggleColorMode}>
                <AiOutlineMenu />
            </IconButton>
        </Flex>
    );
};

export default Nav;
