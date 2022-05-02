import {
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    IconButton,
    useColorMode,
    Link as ChakraLink,
    Heading,
    DrawerBody,
    DrawerFooter,
    Button,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { BsSun, BsMoon } from "react-icons/bs";
import { useSelector } from "react-redux";
import { auth } from "../../../libs/firebase";

export const MobileDrawer = ({ isOpen, onClose }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const user = useSelector((state) => state.user);
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
                    {user ? <LoggedInFooter /> : <LoggedOutFooter />}
                    <IconButton
                        aria-label="Theme Toggle"
                        onClick={toggleColorMode}
                    >
                        {colorMode === "light" ? <BsMoon /> : <BsSun />}
                    </IconButton>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

const LoggedOutFooter = () => {
    return (
        <Flex gap="1rem">
            <Link href="/signup" passHref>
                <ChakraLink>
                    <Button colorScheme="twitter">SignUp</Button>
                </ChakraLink>
            </Link>
            <Link href="/login" passHref>
                <ChakraLink>
                    <Button colorScheme="twitter" variant="outline">
                        Login
                    </Button>
                </ChakraLink>
            </Link>
        </Flex>
    );
};

const LoggedInFooter = () => {
    const handleLogout = () => {
        signOut(auth);
    }
    return (
        <Flex gap="1rem">
            <Link href="/profile" passHref>
                <ChakraLink>
                    <Button colorScheme="twitter">Profile</Button>
                </ChakraLink>
            </Link>
            <Button
                colorScheme="twitter"
                variant="outline"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Flex>
    );
};
