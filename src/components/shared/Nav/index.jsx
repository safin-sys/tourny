import {
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    IconButton,
    useColorMode,
    useDisclosure,
    Link as ChakraLink,
    Heading,
    DrawerBody,
    DrawerFooter,
    Button,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import Logo from "./Logo";
import Link from "next/link";
import { BsSun, BsMoon } from "react-icons/bs";

const Nav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex justifyContent="space-between" alignItems="center" h="4rem">
            <Link href="/" passHref>
                <ChakraLink>
                    <Logo />
                </ChakraLink>
            </Link>
            <IconButton onClick={onOpen}>
                <AiOutlineMenu />
            </IconButton>
            <MobileDrawer isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};

export default Nav;

const MobileDrawer = ({ isOpen, onClose }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody mt="4rem">
                    <Link href="/" passHref>
                        <ChakraLink>
                            <Heading fontSize="title.lg">Home</Heading>
                        </ChakraLink>
                    </Link>
                </DrawerBody>
                <DrawerFooter justifyContent="space-between">
                    <Flex gap="1rem">
                        <Link href="/signup" passHref>
                            <ChakraLink>
                                <Button
                                    colorScheme="twitter"
                                >
                                    SignUp
                                </Button>
                            </ChakraLink>
                        </Link>
                        <Link href="/login" passHref>
                            <ChakraLink>
                                <Button
                                    colorScheme="twitter"
                                    variant="outline"
                                >
                                    Login
                                </Button>
                            </ChakraLink>
                        </Link>
                    </Flex>
                    <IconButton onClick={toggleColorMode}>
                        {colorMode === "light" ? <BsMoon /> : <BsSun />}
                    </IconButton>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
