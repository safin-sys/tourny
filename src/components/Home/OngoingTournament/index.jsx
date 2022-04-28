import { AspectRatio, Box, Flex, Heading } from "@chakra-ui/react";
import TournamentBanner from "../../shared/TournamentBanner";
import Pill from "../../shared/Pill";

const OngoingTournament = () => {
    return (
        <Box pos="relative">
            <Heading fontSize="title.md" mt="2rem">
                Ongoing Tournaments
            </Heading>
            <AspectRatio
                ratio={3 / 1}
                mt=".5rem"
                borderRadius="8px"
                overflow="hidden"
            >
                <TournamentBanner
                    championName="LeeSin"
                    objectPosition="center -10px"
                />
            </AspectRatio>
            <Flex
                flexDir="column"
                gap="4px"
                pos="absolute"
                bottom="8px"
                left="8px"
            >
                <Pill>Lee Sin Championship 2022</Pill>
                <Pill>24 June - 15 July</Pill>
            </Flex>
        </Box>
    );
};

export default OngoingTournament;
