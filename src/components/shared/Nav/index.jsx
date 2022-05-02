import {
    Flex,
    IconButton,
    useDisclosure,
    Link as ChakraLink,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "./Logo";
import Link from "next/link";
import { MobileDrawer } from "./MobileDrawer";
import { useSelector } from "react-redux";

const Nav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = useSelector((state) => state.user);
    return (
        <Flex justifyContent="space-between" alignItems="center" h="4rem">
            <Link href="/" passHref>
                <ChakraLink>
                    <Logo />
                </ChakraLink>
            </Link>
            <IconButton aria-label="Menu" onClick={onOpen}>
                <AiOutlineMenu />
            </IconButton>
            <MobileDrawer isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};

export default Nav;