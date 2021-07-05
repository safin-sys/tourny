import { Container } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/image"
import { Heading, Text } from "@chakra-ui/layout";

export const Banner = ({champion, tournamentName, date}) => {
    return (
        <Container maxW="75vw" position="relative" padding="0">
            <Container position="absolute" color="white" top="50%" left="5%" transform="translateY(-50%)">
                <Heading fontSize="2rem">{tournamentName}</Heading>
                <Text fontWeight="bold" fontStyle="italic">{date}</Text>
            </Container>
            <Image objectPosition="0% 25%" objectFit="cover" w="100%" h="200px" borderRadius="15px" src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_0.jpg`} />
        </Container>
    )
}
