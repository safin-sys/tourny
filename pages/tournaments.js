import Head from "next/head"
import { Footer } from "../src/components/Footer"
import { Nav } from "../src/components/Nav"
import { Banner } from "../src/components/Banner"
import { Container, Heading } from "@chakra-ui/layout"

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
    return (
        <>
            <Head>
                <title>Tournaments | Tourny</title>
            </Head>
            <Nav />
            <Container maxW="75vw" marginY="1rem">
                <Heading fontSize="1.5rem">Tournaments</Heading>
                {list?.map((item, i) => {
                    return <Container key={i} maxW="75vw" marginY="2rem" padding="0">
                        <Banner champion={item.champion} tournamentName={item.name} date={item.date} />
                    </Container>
                })}
            </Container>
            <Footer />
        </>
    )
}
