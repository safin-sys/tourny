import { useRouter } from "next/router"
import Head from 'next/head'
import { Nav } from "../../src/components/Nav"
import { Footer } from "../../src/components/Footer"
import { Banner } from "../../src/components/Banner"
import { Container } from "@chakra-ui/layout"
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, useDisclosure, Grid } from "@chakra-ui/react"
import { Schedule } from "../../src/components/Schedule"
import { AddNewDate } from "../../src/components/Modals"
import { Standings } from "../../src/components/Standings"
import { Team } from "../../src/components/AvatarContainer"
import { TournamentTeams } from "../../src/components/TournamentTeams"

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

const matchDates = [
    {
        date: '24 June',
        format: 'Group Stage BO1',
        matches: [
            {
                time: '2pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Nihilist Won'
            },
            {
                time: '3pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Stoics Won'
            },
            {
                time: '4pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Live'
            },
            {
                time: '5pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Match starts in 2 hours'
            },
            {
                time: '6pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: ''
            },
            {
                time: '7pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Cancelled'
            },
        ]
    },
    {
        date: '25 June',
        format: 'Semi-Final BO3',
        matches: [
            {
                time: '2pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Nihilist Won'
            },
            {
                time: '3pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Stoics Won'
            },
            {
                time: '4pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Live'
            },
            {
                time: '5pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Match starts in 2 hours'
            },
            {
                time: '6pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: ''
            },
            {
                time: '7pm',
                t1: 'Nihilist',
                t1Logo: 'http://www.clker.com/cliparts/5/b/6/3/127641027259477234nihilism.png',
                t2: 'Stoics',
                t2Logo: 'http://1.bp.blogspot.com/_7aC-CR9P08U/SaAM0mVExyI/AAAAAAAAAc8/zJN6SrkpLHg/s200/Stoic+Emblem+black+only-lowres.jpg',
                result: 'Cancelled'
            },
        ]
    },
]

const standings = [
    { team: 'Astralis', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FAST-FullonDark.png', win: '5', lose: '6' },
    { team: 'Rogue', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FRogue_FullColor2.png', win: '8', lose: '3' },
    { team: 'Fnatic', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591295307_FnaticFNC-01-FullonDark.png', win: '8', lose: '3' },
    { team: 'Misfits Gaming', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591419157_MisfitsMSF-01-FullonDark.png', win: '8', lose: '4' },
    { team: 'MAD Lions', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591395339_MadLionsMAD-01-FullonDark.png', win: '7', lose: '4' },
    { team: 'G2 Esports', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FG2-FullonDark.png', win: '6', lose: '5' },
    { team: 'Team Vitality', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FVitality-logo-color-outline-rgb.png', win: '5', lose: '6' },
    { team: 'EXCEL', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FExcel_FullColor2.png', win: '4', lose: '8' },
    { team: 'Schalke 04', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FS04_Standard_Logo1.png', win: '3', lose: '8' },
    { team: 'SK Gaming', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FSK_FullColor.png', win: '2', lose: '9' }
].sort((a, b) => (b.win - b.lose) - (a.win - a.lose));

export default function Tournament() {
    const router = useRouter()
    const { id } = router.query
    const { name, champion, date } = list[id] || {}
    const {
        isOpen: isOpenAddNewDate,
        onOpen: onOpenAddNewDate,
        onClose: onCloseAddNewDate
    } = useDisclosure()
    return (
        <>
            <Head>
                <title>{`${name} | Tourny`}</title>
            </Head>
            <Nav />
            <Container maxW="75vw">
                <Banner champion={champion} tournamentName={name} date={date} />
                <Tabs mt="1rem" isFitted colorScheme="twitter">
                    <TabList>
                        <Tab>Schedule</Tab>
                        <Tab>Standings</Tab>
                        <Tab>Teams</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            {matchDates.map((matchDate, i) => {
                                return <Schedule key={i} matchDate={matchDate} />
                            })}
                            <Container display="flex" justifyContent="space-between" maxW="100%" padding="0">
                                <Button colorScheme="red">Delete Tournament</Button>
                                <Button onClick={onOpenAddNewDate} colorScheme="green">Add New Date</Button>
                            </Container>
                            <AddNewDate isOpen={isOpenAddNewDate} onClose={onCloseAddNewDate} />
                        </TabPanel>
                        <TabPanel>
                            <Standings standings={standings} />
                        </TabPanel>
                        <TabPanel>
                            <TournamentTeams teams={standings} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
            <Footer />
        </>
    )
}