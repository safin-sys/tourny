import Head from "next/head"
import { Flex, Container, Heading } from "@chakra-ui/layout"
import NextLink from "next/link"
import { Avatar, Button, useColorMode, useDisclosure } from "@chakra-ui/react"
import { CreateTeam } from "../../src/components/Modals"

const teams = [
    { name: 'Astralis', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FAST-FullonDark.png', win: '5', lose: '6' },
    { name: 'Rogue', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FRogue_FullColor2.png', win: '8', lose: '3' },
    { name: 'Fnatic', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591295307_FnaticFNC-01-FullonDark.png', win: '8', lose: '3' },
    { name: 'Misfits Gaming', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591419157_MisfitsMSF-01-FullonDark.png', win: '8', lose: '4' },
    { name: 'MAD Lions', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591395339_MadLionsMAD-01-FullonDark.png', win: '7', lose: '4' },
    { name: 'G2 Esports', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FG2-FullonDark.png', win: '6', lose: '5' },
    { name: 'Team Vitality', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FVitality-logo-color-outline-rgb.png', win: '5', lose: '6' },
    { name: 'EXCEL', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FExcel_FullColor2.png', win: '4', lose: '8' },
    { name: 'Schalke 04', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FS04_Standard_Logo1.png', win: '3', lose: '8' },
    { name: 'SK Gaming', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FSK_FullColor.png', win: '2', lose: '9' }
].sort((a, b) => ('' + a.name).localeCompare(b.name));

export default function Teams() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode } = useColorMode()
    return (
        <>
            <Head>
                <title>Teams | Tourny</title>
            </Head>
            <Container maxW="75vw" marginY="1rem">
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading fontSize="1.5rem">Teams</Heading>
                    <Button colorScheme="twitter" onClick={onOpen}>Create a Team</Button>
                </Flex>
                <Container maxW="75vw" marginY="2rem" padding="0" display="grid" gridTemplateColumns="1fr 1fr" gridGap="0 1rem">
                    {teams?.map((team, i) => {
                        return (
                            <NextLink key={i} href={'/teams/team?id=' + team.name}>
                                <a>
                                    <Flex p="1rem" alignItems="center" _hover={{
                                        background: `${colorMode === "light" ? "gray.200" : "gray.900"}`
                                    }}>
                                        <Avatar name={team.name} mr="1.5rem" src={team.logo} bgColor="gray.800" />
                                        <Heading fontSize="1rem" textDecoration="none">{team.name}</Heading>
                                    </Flex>
                                </a>
                            </NextLink>

                        )
                    })}
                </Container>
            </Container >
            <CreateTeam isOpen={isOpen} onClose={onClose} />
        </>
    )
}