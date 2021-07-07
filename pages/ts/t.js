import { useRouter } from "next/router"
import Head from 'next/head'
import { Nav } from "../../src/components/Nav"
import { Footer } from "../../src/components/Footer"
import { Banner } from "../../src/components/Banner"
import { Container } from "@chakra-ui/layout"

const list = [
    {
        name: 'Teamwork Tournament 2020',
        date: '24 June - 15 July',
        champion: 'LeeSin',
    },
    {
        name: 'LEC Spring 2020',
        date: '24 June - 15 July',
        champion: 'Gwen',
    },
    {
        name: 'LEC Summer 2020',
        date: '24 June - 15 July',
        champion: 'Jhin',
    }
]

// const matches = [
//     {
//         date: '24 June',
//         format: 'Group Stage BO1',
//         matches: [
//             {
//                 time: '2pm',
//                 t1: 'Nihilist',
//                 t2: 'Stoics',
//                 result: 'Nihilist Won'
//             },
//             {
//                 time: '3pm',
//                 t1: 'Nihilist',
//                 t2: 'Stoics',
//                 result: 'Stoics Won'
//             },
//             {
//                 time: '4pm',
//                 t1: 'Nihilist',
//                 t2: 'Stoics',
//                 result: 'Live'
//             },
//             {
//                 time: '5pm',
//                 t1: 'Nihilist',
//                 t2: 'Stoics',
//                 result: 'Match starts in 2 hours'
//             },
//             {
//                 time: '6pm',
//                 t1: 'Nihilist',
//                 t2: 'Stoics',
//                 result: ''
//             },
//             {
//                 time: '7pm',
//                 t1: 'Nihilist',
//                 t2: 'Stoics',
//                 result: 'Cancelled'
//             },
//         ]
//     },
//     {
//         date: '25 June',
//         format: 'Semi-Final BO3',
//         matches: [
//             {
//                 time: '2pm',
//                 t1: 'Nihilist',
//                 t2: 'Stoics',
//                 result: 'Nihilist Won'
//             },
//             {
//                 time: '3pm',
//                 t1: 'Nihilist',
//                 t2: 'Stoics',
//                 result: 'Stoics Won'
//             },
//             {
//                 time: '4pm',
//                 t1: 'Nihilist',
//                 t2: 'Stoics',
//                 result: 'Live'
//             },
//             {
//                 time: '5pm',
//                 t1: 'Nihilist',
//                 t2: 'Stoics',
//                 result: 'Match starts in 2 hours'
//             },
//             {
//                 time: '6pm',
//                 t1: 'Nihilist',
//                 t2: 'Stoics',
//                 result: ''
//             },
//             {
//                 time: '7pm',
//                 t1: 'Nihilist',
//                 t2: 'Stoics',
//                 result: 'Cancelled'
//             },
//         ]
//     },
// ]

export default function Tournament() {
    const router = useRouter()
    const { id } = router.query
    const {name, champion, date} = list[id] || {}
    return (
        <>
            <Head>
                <title>{`${name} | Tourny`}</title>
            </Head>
            <Nav />
            <Container maxW="75vw">
                <Banner champion={champion} tournamentName={name} date={date} />
            </Container>
            <Footer />
        </>
    )
}
