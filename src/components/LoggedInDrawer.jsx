import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerOverlay, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { MenuComponent } from "./MenuComponent";

export const LoggedInDrawer = ({ isOpen, onClose, btnRef, colorMode, toggleColorMode }) => {
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
                        <Link href="/">Home</Link>
                        <Link href="/">Tournaments</Link>
                        <Link href="/">Teams</Link>
                        <Link href="/">Players</Link>
                    </Flex>
                </DrawerBody>
                <DrawerFooter>
                    <Text fontWeight="semibold" mr="1rem">SafinTheShip</Text>
                    <MenuComponent colorMode={colorMode} toggleColorMode={toggleColorMode} />
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};