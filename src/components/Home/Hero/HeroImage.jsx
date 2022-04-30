import { Box, Flex, Heading } from "@chakra-ui/react";
import TournyImage from "./TournyImage";

const HeroImage = ({
    championName,
    skinID,
    objectPosition,
    player,
    score,
    teams,
    date,
}) => {
    return (
        <Box pos="relative" borderRadius="8px" overflow="hidden" fontSize="0">
            <Box h="80vh" pos="relative">
                <TournyImage
                    championName={championName}
                    skinID={skinID}
                    objectPosition={objectPosition}
                />
            </Box>
            <Box
                bgGradient="linear(to-b, transparent, rgba(0,0,0,0.5))"
                pos="absolute"
                w="100%"
                h="50%"
                bottom="0"
                zIndex="1"
            ></Box>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                pos="absolute"
                bottom="1rem"
                px="1rem"
                w="full"
                zIndex="2"
                color="white"
            >
                <Heading
                    fontSize="title.lg"
                    fontFamily="logo"
                    fontWeight="normal"
                >
                    {player} <br /> went {score}
                </Heading>
                <Heading fontSize="title.md" fontStyle="italic">
                    {date} <br />
                    {teams.team1} <br /> vs <br /> {teams.team2}
                </Heading>
            </Flex>
        </Box>
    );
};

export default HeroImage;
