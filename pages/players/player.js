import { Avatar, Box, Button, Container, Flex, Grid, Heading, Spinner, Text, useColorMode, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router"
import { Banner } from "../../src/components/Banner";
import Head from "next/head"
import TeamMembers from "../../src/components/TeamMembers";
import { Schedule } from "../../src/components/Schedule"
import { EditProfile } from "../../src/components/Modals";
import { auth, db, stg } from "../../src/helper/base";
import { useDocumentData } from "react-firebase-hooks/firestore"
import { useDownloadURL } from "react-firebase-hooks/storage"
import { useAuthState } from "react-firebase-hooks/auth"

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

export default function Player() {
    const router = useRouter()
    const { id } = router.query

    const [value] = useDocumentData(db.collection('players').doc(id))
    return (
        value ? <PlayerPage value={value} id={id} /> :
            <Grid height="calc(100vh - 128px)" placeContent="center">
                <Spinner size="xl" />
            </Grid>
    )
}

function PlayerPage({ value, id }) {
    const { username, team, role, captain, phone, fb, email } = value

    const [user] = useAuthState(auth)
    const toast = useToast()
    const handleEditProfile = (e) => {
        const { username, fb, champion, phone, upload } = e
        const fucklife = {
            ...(username ? { username } : {}),
            ...(fb ? { fb } : {}),
            ...(champion ? { champion } : {}),
            ...(phone ? { phone } : {}),
        }
        const stgRefUpdate = stg.child(`dp/${user.uid}`)
        upload && stgRefUpdate.put(upload[0])
            .then(() => {
                toast({
                    title: "DP Changed.",
                    description: "We've updated your DP for you.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
            })
        db.collection("players").doc(user.uid).update(fucklife)
            .then(() => {
                toast({
                    title: "Profile edited.",
                    description: "We've edited your profile for you.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
            })
            .catch(err => {
                console.log(err);
                toast({
                    title: "Profile edit failed.",
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
            })
    }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [downloadUrl] = useDownloadURL(stg.child(`dp/${id}`));
    return (
        <>
            <Head>
                <title>{username} | Tourny</title>
            </Head>
            <Container maxW="75vw" display="flex" flexDirection="column">
                <Box pos="relative" mb="3rem">
                    <Banner mt="1rem" champion="Lux" skin="15" offset="8" />
                    <Flex w="60vw" alignItems="center" justifyContent="space-between" pos="absolute" top="75%" left="0" right="0" mx="auto">
                        <Avatar border="2px #111 solid" size="xl" name={username} src={downloadUrl} />
                        {user?.uid === id && <Button alignSelf="flex-end" colorScheme="twitter" variant="outline" onClick={onOpen}>Edit Profile</Button>}
                    </Flex>
                </Box>
                <EditProfile isOpen={isOpen} onClose={onClose} player={value} handleEditPlayer={handleEditProfile} />
                <Container maxW="60vw" padding="0">
                    <Heading fontSize="1.5rem">{username}</Heading>
                    <Flex mt={2}>
                        {role && <Text mr={2}>{role}{captain ? '/Captain' : ''} -</Text>}
                        {fb && <Text mr={2}>fb/{fb} -</Text>}
                        {email && <Text mr={2}>{email} -</Text>}
                        {phone && <Text mr={2}>{phone}</Text>}
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