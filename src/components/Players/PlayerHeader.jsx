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
import Image from "next/image";
import { useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import EditProfileModal from "./EditProfileModal";

const PlayerHeader = ({ player }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [coverLoading, setCoverLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { name, email, profilePicture, coverPicture, phoneNumber, uid } =
        player ? player : {};

    useEffect(() => {
        if (auth && auth.currentUser && auth.currentUser.uid === uid) {
            setIsLoggedIn(true);
        }
    }, [player, uid]);
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
                                coverPicture
                                    ? coverPicture
                                    : "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lucian_6.jpg"
                            }
                            alt="Lucian"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="0 0"
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
                            }}
                        />
                    </AspectRatio>
                    <Skeleton
                        isLoaded={profilePicture || profilePicture === null}
                        pos="absolute"
                        top="54%"
                        ml="1rem"
                        borderRadius="full"
                    >
                        <Avatar
                            size="xl"
                            name={name}
                            border="2px solid #3182ce"
                            src={
                                profilePicture
                                    ? profilePicture
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
                    <Skeleton isLoaded={name}>
                        <Flex alignItems="center" gap=".25rem">
                            <Heading fontSize="1rem">{name}</Heading>
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
                            {email} {phoneNumber ? `| ${phoneNumber}` : null}
                        </Heading>
                    </Skeleton>
                </Box>
            </Box>
            <EditProfileModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default PlayerHeader;
