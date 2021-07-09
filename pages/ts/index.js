import Head from "next/head"
import { Footer } from "../../src/components/Footer"
import { Nav } from "../../src/components/Nav"
import { Banner } from "../../src/components/Banner"
import { Flex, Container, Heading, Grid } from "@chakra-ui/layout"
import NextLink from "next/link"
import { Button, useDisclosure } from "@chakra-ui/react"
import { CreateTournamentModal } from "../../src/components/Modals"

const list = [
    {
        name: 'Teamwork Tournament 2020',
        date: '24 June - 15 July',
        champion: 'LeeSin'
    },
    {
        name: 'LEC Spring 2020',
        date: '24 June - 15 July',
        champion: 'Gwen'
    },
    {
        name: 'LEC Summer 2020',
        date: '24 June - 15 July',
        champion: 'Jhin'
    }
]

export default function Tournaments() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Head>
                <title>Tournaments | Tourny</title>
            </Head>
            <Nav />
            <Container maxW="75vw" marginY="1rem">
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading fontSize="1.5rem">Tournaments</Heading>
                    <Button colorScheme="twitter" onClick={onOpen}>Create Tournament</Button>
                </Flex>
                {list?.map((item, i) => {
                    return <NextLink key={i} href={'/ts/t?id=' + i}>
                        <Container maxW="75vw" marginY="2rem" padding="0" cursor="pointer">
                            <Banner champion={item.champion} tournamentName={item.name} date={item.date} />
                        </Container>
                    </NextLink>
                })}
            </Container>
            <CreateTournamentModal isOpen={isOpen} onClose={onClose} />
            <Footer />
        </>
    )
}