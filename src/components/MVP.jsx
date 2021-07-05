import { Container, Text, Heading } from "@chakra-ui/layout"
import { Image } from "@chakra-ui/image"
import { Flex } from "@chakra-ui/react"

export const MVP = ({ MVPInfo }) => {
    return (
        <Container maxW="75vw">
            <Flex alignItems="center" justifyContent="center">
                <Heading fontSize="4rem" flex="1 1 0px" textAlign="right" mr="1rem">
                    MVP of <br /> the Week
                    <Text fontFamily="Pacifico, cursive" fontSize="3rem" fontWeight="normal">
                        {MVPInfo.playerName}
                    </Text>
                    <Text fontSize="1.5rem" display="inline-block">went</Text>
                    <Text fontFamily="Pacifico, cursive" fontSize="2.25rem" ml="1rem" fontWeight="normal" display="inline-block">
                        {MVPInfo.playerScore}
                    </Text>
                </Heading>

                <Image objectFit="cover" objectPosition="60% 0%" w="350px" h="500px" borderRadius="15px" src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${MVPInfo.champion}_0.jpg`} alt={MVPInfo.champion} />
                
                <Text flex="1 1 0px" fontWeight="bold" alignSelf="flex-end" fontStyle="italic" ml="1rem" mb="1rem">{MVPInfo.date} <br /> {MVPInfo.team1} <br /> vs <br /> {MVPInfo.team2}</Text>
            </Flex>
        </Container>
    )
}
