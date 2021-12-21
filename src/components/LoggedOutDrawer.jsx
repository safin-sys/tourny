import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerOverlay, Flex, IconButton, Link } from "@chakra-ui/react";
import { HiMoon, HiSun } from "react-icons/hi";

export const LoggedOutDrawer = ({ isOpen, onClose, btnRef, toggleColorMode, colorMode }) => {
    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                    <Flex flexDir="column" mt="5rem" fontWeight="bold" fontSize="1.5rem">
                        <Link href="/">Login</Link>
                        <Link href="/">Signup</Link>
                    </Flex>
                </DrawerBody>
                <DrawerFooter>
                    <IconButton
                        aria-label="Toggle dark mode"
                        onClick={toggleColorMode}
                        icon={colorMode === "light" ? <HiMoon /> : <HiSun />} />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
