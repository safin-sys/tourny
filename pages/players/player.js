import { Avatar, Box, Button, Container, Flex, Grid, Heading, Text, useColorMode, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router"
import { Banner } from "../../src/components/Banner";
import Head from "next/head"
import TeamMembers from "../../src/components/TeamMembers";
import { Schedule } from "../../src/components/Schedule"
import { EditProfile } from "../../src/components/Modals";

const player = {
    name: 'Tyler1',
    logo: 'https://scontent-del1-1.xx.fbcdn.net/v/t1.18169-9/20664503_217017485493222_9033074246486805287_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeHmcytccysf1Nf9umI-hx172_rpF16zL9Pb-ukXXrMv03_ddVF3K6Pf8Qaz3VRIsEA5eUr-POqvfFFusHutxypH&_nc_ohc=yKeV775FQ4IAX9Nh69G&_nc_ht=scontent-del1-1.xx&oh=699d574d4f284d3ccf5b9d9150a8b792&oe=613064C1',
    team: 'Meme Team',
    role: 'ADC',
    captain: true,
    email: 'tyler1@hotmail.com',
    phone: '+880 171-0110001'
}

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
                result: 'In 2 hours'
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
                result: 'In 2 hours'
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

export default function PlayerPage() {
    const router = useRouter()
    const { id } = router.query
    const { name, logo, team, role, captain, email, phone } = player
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Head>
                <title>{name} | Tourny</title>
            </Head>
            <Container maxW="75vw" display="flex" flexDirection="column">
                <Box pos="relative" mb="3rem">
                    <Banner mt="1rem" champion="Lux" skin="15" offset="8" />
                    <Flex w="60vw" alignItems="center" justifyContent="space-between" pos="absolute" top="75%" left="0" right="0" mx="auto">
                        <Avatar border="2px #111 solid" size="xl" name={name} src={logo} bgColor="gray.800" />
                        <Button alignSelf="flex-end" colorScheme="twitter" variant="outline" onClick={onOpen}>Edit Profile</Button>
                    </Flex>
                </Box>
                <EditProfile isOpen={isOpen} onClose={onClose} />
                <Container maxW="60vw" padding="0">
                    <Heading fontSize="1.5rem">{name}</Heading>
                    <Flex mt={2}>
                        <Text mr={2}>{role}{captain ? '/Captain' : ''}</Text>
                        <Text mr={2}>-</Text>
                        <Text mr={2}>fb/tyler1</Text>
                        <Text mr={2}>-</Text>
                        <Text mr={2}>{email}</Text>
                        <Text mr={2}>-</Text>
                        <Text mr={2}>{phone}</Text>
                    </Flex>
                </Container>
                <Grid templateColumns=".5fr 1fr" mt={8} textAlign="center">
                    <Text fontWeight="bold" borderBottom="2px solid" borderColor="#dedede" pb=".5rem">Members</Text>
                    <Text fontWeight="bold" borderBottom="2px solid" borderColor="twitter.600" pb=".5rem">Schedule</Text>
                </Grid>
                <Grid templateColumns=".5fr 1fr" mt={4} gap="2rem">
                    <Box>
                        <Heading fontSize="1.5rem" my=".4rem">{team}</Heading>
                        <TeamMembers />
                    </Box>
                    <Box>
                        {matchDates.map((matchDate, i) => {
                            return <Schedule key={i} matchDate={matchDate} />
                        })}
                    </Box>
                </Grid>
            </Container>
        </>
    )
}