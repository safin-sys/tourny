import { color, Flex, Heading, IconButton, useColorMode, useDisclosure } from "@chakra-ui/react";
import { LoggedInNavLinks } from "./LoggedInNavLinks";
import { LoggedOutNavLinks } from "./LoggedOutNavLinks";
import { AiOutlineMenu } from "react-icons/ai";
import { useRef } from "react";
import { LoggedInDrawer } from "./LoggedInDrawer";
import { LoggedOutDrawer } from "./LoggedOutDrawer";

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isLogged = false;
    const btnRef = useRef();
    return (
        <Flex h="4rem" alignItems="center" justifyContent="space-between">
            <Heading fontFamily="pacifico" fontSize="1.5rem" fontWeight="medium">Tourny</Heading>
            <Flex gap="1rem" fontWeight="medium" alignItems="center" display={['none', 'none', 'flex']}>
                {
                    isLogged ? <LoggedInNavLinks colorMode={colorMode} toggleColorMode={toggleColorMode} /> : <LoggedOutNavLinks colorMode={colorMode} toggleColorMode={toggleColorMode} />
                }
            </Flex>
            <IconButton
                icon={<AiOutlineMenu />}
                aria-label="Open drawer"
                ref={btnRef}
                onClick={onOpen}
                display={['inherit', 'inherit', 'none']}
            />
            {
                isLogged ? <LoggedInDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} colorMode={colorMode} toggleColorMode={toggleColorMode} /> : <LoggedOutDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} colorMode={colorMode} toggleColorMode={toggleColorMode} />
            }
        </Flex>
    )
}