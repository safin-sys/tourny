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
import { auth } from "../../../libs/firebase";
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
                        <ChakraLink>
                            <Heading fontSize="title.lg">Home</Heading>
                        </ChakraLink>
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
            <Link href="/profile" passHref>
                <ChakraLink _hover={{ textDecor: "none", bgColor: "gray.800" }}>
                    <Flex alignItems="center" gap=".5rem">
                        <Avatar
                            name={user.displayName}
                            src={
                                user.photoURL
                                    ? user.photoURL
                                    : "https://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/69.png"
                            }
                        />
                        <Box>
                            <Text>{user.displayName}</Text>
                            <Text>{user.email}</Text>
                        </Box>
                    </Flex>
                </ChakraLink>
            </Link>
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
