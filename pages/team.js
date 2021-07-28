import { Avatar, Box, Button, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router"
import { Banner } from "../src/components/Banner";
import Head from "next/head"

const standings = [
    { team: 'Astralis', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FAST-FullonDark.png', win: '5', lose: '6' },
    { team: 'Rogue', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FRogue_FullColor2.png', win: '8', lose: '3' },
    { team: 'Fnatic', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591295307_FnaticFNC-01-FullonDark.png', win: '8', lose: '3' },
    { team: 'Misfits Gaming', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591419157_MisfitsMSF-01-FullonDark.png', win: '8', lose: '4' },
    { team: 'MAD Lions', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591395339_MadLionsMAD-01-FullonDark.png', win: '7', lose: '4' },
    { team: 'G2 Esports', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FG2-FullonDark.png', win: '6', lose: '5' },
    { team: 'Team Vitality', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FVitality-logo-colo-rgb.png', win: '5', lose: '6' },
    { team: 'EXCEL', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FExcel_FullColor2.png', win: '4', lose: '8' },
    { team: 'Schalke 04', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FS04_Standard_Logo1.png', win: '3', lose: '8' },
    { team: 'SK Gaming', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FSK_FullColor.png', win: '2', lose: '9' }
].sort((a, b) => (b.win - b.lose) - (a.win - a.lose));

export default function TeamPage() {
    const router = useRouter()
    const { id } = router.query
    const { team, logo } = id ? standings[id] : standings[0]
    return (
        <>
            <Head>
                <title>{team} | Tourny</title>
            </Head>
            <Container maxW="75vw" display="flex" flexDirection="column">
                <Box pos="relative" mb="3rem">
                    <Banner mt="1rem" champion="Lux" skin="15" offset="8" />
                    <Flex w="60vw" alignItems="center" justifyContent="space-between" pos="absolute" top="75%" left="0" right="0" mx="auto">
                        <Avatar border="2px #111 solid" size="xl" padding=".5rem" name={team} src={logo} bgColor="gray.800" />
                        <Button alignSelf="flex-end" colorScheme="twitter" variant="outline">Edit Team</Button>
                    </Flex>
                </Box>
                <Container maxW="60vw" padding="0">
                    <Flex alignItems="center">
                        <Heading fontSize="1.5rem">{team}</Heading>
                        <Box mx=".25rem">.</Box>
                        <Flex mt=".5rem">
                            <Star />
                            <Star />
                            <Star />
                        </Flex>
                    </Flex>
                    <Text>Captain Rekkless</Text>
                </Container>
                <Grid templateColumns=".5fr 1fr" mt={8} textAlign="center">
                    <Text borderBottom="2px solid" borderColor="#dedede" pb=".5rem">Team</Text>
                    <Text borderBottom="2px solid" borderColor="twitter.600" pb=".5rem">Schedule</Text>
                </Grid>
            </Container>
        </>
    )
}

const Star = () => {
    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg" color="#FFD700"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
    )
}