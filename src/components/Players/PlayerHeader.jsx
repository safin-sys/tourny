import {
    AspectRatio,
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    Skeleton,
    useDisclosure,
} from "@chakra-ui/react";
import { auth } from "@utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";

const PlayerHeader = ({ player }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [coverLoading, setCoverLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { ign, email, photo, cover, phone } = player || {};

    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && user.uid === router.query.id) {
                setIsLoggedIn(true);
            }
        });
    }, [router.query]);
    return (
        <>
            <Box>
                <Flex flexDir="column" pos="relative" h="196px">
                    <AspectRatio
                        pos="relative"
                        ratio={2.2 / 1}
                        w="100%"
                        h="150px"
                        borderRadius="8px"
                        overflow="hidden"
                    >
                        <Image
                            src={
                                cover
                                    ? cover
                                    : "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lucian_6.jpg"
                            }
                            alt="Lucian"
                            fill
                            sizes="100%"
                            priority
                            onLoadingComplete={() => setCoverLoading(false)}
                            style={{
                                filter: coverLoading
                                    ? "grayscale(50%) blur(5px)"
                                    : "none",
                                transform: coverLoading
                                    ? "scale(1.1)"
                                    : "scale(1)",
                                transition: "all 0.7s",
                                objectFit: "cover",
                                objectPosition: "0 0",
                            }}
                        />
                    </AspectRatio>
                    <Skeleton
                        isLoaded={photo || photo === null}
                        pos="absolute"
                        top="54%"
                        ml="1rem"
                        borderRadius="full"
                    >
                        <Avatar
                            size="xl"
                            name={ign}
                            border="2px solid #3182ce"
                            src={
                                photo
                                    ? photo
                                    : "https://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/0.png"
                            }
                        />
                    </Skeleton>
                    {isLoggedIn && (
                        <Button
                            m="1rem 0 0 auto"
                            variant="outline"
                            colorScheme="twitter"
                            p="8px"
                            lineHeight="3"
                            h="auto"
                            borderRadius="4px"
                            onClick={onOpen}
                        >
                            Edit Profile
                        </Button>
                    )}
                </Flex>
                <Box m="1.5rem 0 0 1rem">
                    <Skeleton isLoaded={ign}>
                        <Flex alignItems="center" gap=".25rem">
                            <Heading fontSize="1rem">{ign}</Heading>
                            <Heading
                                fontSize="1rem"
                                h="5px"
                                lineHeight="0"
                                color="gray.500"
                            >
                                .
                            </Heading>
                            <Heading fontSize="1rem" color="gray.500">
                                Player
                            </Heading>
                        </Flex>
                    </Skeleton>
                    <Skeleton isLoaded={email}>
                        <Heading fontSize="1rem" color="gray.500" mt=".25rem">
                            {email} {phone ? `| ${phone}` : null}
                        </Heading>
                    </Skeleton>
                </Box>
            </Box>
            <EditProfileModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default PlayerHeader;
