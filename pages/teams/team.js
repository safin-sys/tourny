import { Avatar, Box, Button, Container, Flex, FormControl, FormLabel, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router"
import { Banner } from "../../src/components/Banner";
import Head from "next/head"
import TeamMembers from "../../src/components/TeamMembers";
import { Schedule } from "../../src/components/Schedule"
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../src/helper/base";
import { useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import SelectChampion from "../../src/components/SelectChampion";

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

export default function Team() {
    const [playersList, setPlayersList] = useState([])
    const [users, setUsers] = useState([])
    const router = useRouter()
    const { id } = router.query
    const [value] = useDocumentData(db.collection("teams").doc(id))
    const { name, logo, cover, titles } = value || {}

    const getUsers = () => {
        db.collection('players').get().then(data => {
            data.forEach(doc => {
                const user = {
                    id: doc.id,
                    ...doc.data()
                }
                setUsers(usrs => [...usrs, user])
            })
        })
    }

    useEffect(() => {
        if (users.length > 0) {
            setUsers([])
            getUsers()
        } else {
            getUsers()
        }
    }, [])

    useEffect(() => {
        if (!playersList[0] && name) {
            users.forEach((user) => {
                if (user.team === name) {
                    setPlayersList(playa => [...playa, user])
                }
            })
        }
    }, [name])

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Head>
                <title>{name} | Tourny</title>
            </Head>
            <Container maxW="75vw" display="flex" flexDirection="column">
                <Box pos="relative" mb="3rem">
                    <Banner mt="1rem" champion={cover?.champion} skin={cover?.skin} offset={cover?.offset} />
                    <Flex w="60vw" alignItems="center" justifyContent="space-between" pos="absolute" top="75%" left="0" right="0" mx="auto">
                        <Avatar border="2px #111 solid" size="xl" padding=".5rem" name={name} src={logo} bgColor="gray.800" />
                        <Button alignSelf="flex-end" colorScheme="twitter" variant="outline" onClick={onOpen}>Edit Team</Button>
                    </Flex>
                </Box>
                <EditTeam isOpen={isOpen} onClose={onClose} team={value} users={users} playersList={playersList} />
                <Container maxW="60vw" padding="0">
                    <Flex alignItems="center">
                        <Heading fontSize="1.5rem">{name}</Heading>
                        {titles && <Box mx=".25rem">.</Box>}
                        <Flex mt=".5rem">
                            {titles?.map((title, i) => {
                                return <Star key={i} />
                            })}
                        </Flex>
                    </Flex>
                    <Flex mt={2} alignItems="center" flexWrap="wrap">
                        {titles?.map((title, i) => {
                            return (
                                <Flex alignItems="center" key={i}>
                                    <Text>{title}</Text>
                                    {i + 1 != titles.length && <Text mx=".5rem"> - </Text>}
                                </Flex>
                            )
                        })}
                    </Flex>
                </Container>
                <Grid templateColumns=".5fr 1fr" mt={8} textAlign="center">
                    <Text fontWeight="bold" borderBottom="2px solid" borderColor="#dedede" pb=".5rem">Members</Text>
                    <Text fontWeight="bold" borderBottom="2px solid" borderColor="twitter.600" pb=".5rem">Schedule</Text>
                </Grid>
                <Grid templateColumns=".5fr 1fr" mt={4} gap="2rem">
                    <TeamMembers name={name} users={users} />
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

const Star = () => {
    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg" color="#FFD700"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
    )
}

export const EditTeam = ({ isOpen, onClose, team, users, playersList }) => {
    const [cover, setCover] = useState()
    const initialValues = {
        name: team?.name,
        logo: team?.logo,
        players: team?.players || [''],
        captain: team?.captain || ''
    }
    const toast = useToast()
    const handleSubmit = formik => {
        const { name, logo, players, captain } = formik
        const { champion, skin, offset } = cover
        const cleanInput = {
            ...(name ? { name } : {}),
            ...(logo ? { logo } : {}),
            ...(players ? { players } : {}),
            ...(captain ? { captain } : {}),
            ...(champion || skin || offset ? {
                cover: {
                    ...(champion ? { champion } : {}),
                    ...(skin ? { skin } : {}),
                    ...(offset ? { offset } : {})
                }
            } : {})
        }
        db.collection("teams").doc(name).update(cleanInput)
            .then(() => {
                toast({
                    title: "Team updated captain.",
                    description: `Your team ${name} was successfully updated.`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
                players.length >= 1 && players.forEach((id) => {
                    db.collection("players").doc(id).update({
                        team: name,
                        captain: captain === id ? true : false
                    })
                })
                onClose()
            })
            .catch(err => {
                console.log(err);
                toast({
                    title: "Team creation failed.",
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
            })
    }

    const handleClose = () => {
        onClose()
    }

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
        >
            {props => (
                <Form>
                    <Modal isOpen={isOpen} onClose={onClose} size="xl">
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Edit Team</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl>
                                    <FormLabel>Name</FormLabel>
                                    <Field name="name" as={Input} />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Logo URL</FormLabel>
                                    <Field name="logo" as={Input} />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Change Cover</FormLabel>
                                    <SelectChampion setCover={setCover} />
                                </FormControl>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={() => handleClose(props.resetForm())} mr={3}>Cancel</Button>
                                <Button colorScheme="twitter" onClick={() => handleSubmit(props.values)}>
                                    Save
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Form>
            )}
        </Formik>
    )
}