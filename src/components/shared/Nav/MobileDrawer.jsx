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
import Link from "next/link";
import { BsSun, BsMoon } from "react-icons/bs";

export const MobileDrawer = ({ isOpen, onClose }) => {
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
