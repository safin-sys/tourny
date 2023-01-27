import Logo from "./Logo";
import Link from "next/link";
import { MobileDrawer } from "./MobileDrawer";
import { AiOutlineMenu } from "react-icons/ai";
import { Flex, IconButton, useDisclosure } from "@chakra-ui/react";

const Nav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex justifyContent="space-between" alignItems="center" h="4rem">
            <Link href="/" passHref>
                <Logo />
            </Link>
            <IconButton aria-label="Menu" onClick={onOpen}>
                <AiOutlineMenu />
            </IconButton>
            <MobileDrawer isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};

export default Nav;
