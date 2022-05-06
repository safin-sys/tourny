import {
    AspectRatio,
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
} from "@chakra-ui/react";
import Image from "next/image";

const PlayerHeader = ({ player }) => {
    console.log(player);
    const { name, email, profilePicture, coverPicture,  phoneNumber } =
        player ? player : {};
    return (
        <Box>
            <Flex flexDir="column" pos="relative">
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
                    />
                </AspectRatio>
                <Avatar
                    pos="absolute"
                    top="54%"
                    size="xl"
                    name="Faker"
                    ml="1rem"
                    border="2px solid #3182ce"
                    src={
                        profilePicture
                            ? profilePicture
                            : "https://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/0.png"
                    }
                />
                <Button
                    m="1rem 0 0 auto"
                    variant="outline"
                    colorScheme="twitter"
                    p="8px"
                    lineHeight="3"
                    h="auto"
                    borderRadius="4px"
                >
                    Edit Profile
                </Button>
            </Flex>
            <Box m="1.5rem 0 0 1rem">
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
                <Heading fontSize="1rem" color="gray.500" mt=".25rem">
                    {email} {phoneNumber ? `| ${phoneNumber}` : null}
                </Heading>
            </Box>
        </Box>
    );
};

export default PlayerHeader;
