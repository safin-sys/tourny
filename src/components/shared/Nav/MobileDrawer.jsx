import {
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    IconButton,
    useColorMode,
    Heading,
    DrawerBody,
    DrawerFooter,
    Button,
    Avatar,
    Box,
    Text,
    Grid,
    useToast,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { BsSun, BsMoon } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../../utils/firebase";
import { clearUser } from "../../../redux/slices/userSlice";

export const MobileDrawer = ({ isOpen, onClose }) => {
    const user = useSelector((state) => state.user);
    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody mt="4rem">
                    <Link href="/" passHref>
                        <Heading fontSize="title.lg">Home</Heading>
                    </Link>
                </DrawerBody>
                <DrawerFooter justifyContent="space-between" alignItems="end">
                    {user ? (
                        <LoggedInFooter user={user} />
                    ) : (
                        <LoggedOutFooter />
                    )}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

const LoggedOutFooter = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex gap="1rem" w="full">
            <Link href="/auth/join" passHref>
                <Button colorScheme="twitter">Join</Button>
            </Link>
            <Link href="/auth/login" passHref>
                <Button colorScheme="twitter" variant="outline">
                    Login
                </Button>
            </Link>
            <IconButton
                ml="auto"
                aria-label="Theme Toggle"
                onClick={toggleColorMode}
            >
                {colorMode === "light" ? <BsMoon /> : <BsSun />}
            </IconButton>
        </Flex>
    );
};

const LoggedInFooter = ({ user }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const handleLogout = () => {
        signOut(auth);
        dispatch(clearUser());
        toast({
            title: "Logged out",
            description: "You have been logged out",
            status: "success",
            duration: 9000,
            isClosable: true,
        });
    };
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Grid rowGap="1rem" w="full">
            <Link href={`/players/${user.uid}`} passHref>
                <Flex alignItems="center" gap=".5rem">
                    <Avatar name={user.displayName} src={user.photoURL} />
                    <Box>
                        <Text>{user.displayName}</Text>
                        <Text>{user.email}</Text>
                    </Box>
                </Flex>
            </Link>
            <Flex gap="1rem">
                <Link href={`/players/${user.uid}`} passHref>
                    <Button colorScheme="twitter">Profile</Button>
                </Link>
                <Button
                    colorScheme="twitter"
                    variant="outline"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
                <IconButton
                    ml="auto"
                    aria-label="Theme Toggle"
                    onClick={toggleColorMode}
                >
                    {colorMode === "light" ? <BsMoon /> : <BsSun />}
                </IconButton>
            </Flex>
        </Grid>
    );
};
