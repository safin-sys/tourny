import { Avatar, Box, Button, Container, Flex, FormControl, FormLabel, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router"
import { Banner } from "../../src/components/Banner";
import Head from "next/head"
import TeamMembers from "../../src/components/TeamMembers";
import { Schedule } from "../../src/components/Schedule"
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
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
    const router = useRouter()
    const { id } = router.query
    const [value] = useDocumentDataOnce(db.collection("teams").doc(id))
    const { name, logo, players, cover } = value || {}
    useEffect(() => {
        if (!playersList[0] && players) {
            players.forEach((player) => {
                player && db.collection("players").doc(player)
                .get()
                .then((doc) => {
                    setPlayersList(playa => [...playa, doc.data()])
                })
            })
        }
    }, [players])

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
                <EditTeam isOpen={isOpen} onClose={onClose} team={name} />
                <Container maxW="60vw" padding="0">
                    <Flex alignItems="center">
                        <Heading fontSize="1.5rem">{name}</Heading>
                        <Box mx=".25rem">.</Box>
                        <Flex mt=".5rem">
                            <Star />
                            <Star />
                            <Star />
                        </Flex>
                    </Flex>
                    <Flex mt={2}>
                        <Text mr={2}>LCK Spring 2020</Text>
                        <Text mr={2}>-</Text>
                        <Text mr={2}>LCK Summer 2021</Text>
                        <Text mr={2}>-</Text>
                        <Text mr={2}>LCK Fall 2021</Text>
                    </Flex>
                </Container>
                <Grid templateColumns=".5fr 1fr" mt={8} textAlign="center">
                    <Text fontWeight="bold" borderBottom="2px solid" borderColor="#dedede" pb=".5rem">Members</Text>
                    <Text fontWeight="bold" borderBottom="2px solid" borderColor="twitter.600" pb=".5rem">Schedule</Text>
                </Grid>
                <Grid templateColumns=".5fr 1fr" mt={4} gap="2rem">
                    <TeamMembers team={playersList} />
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

export const EditTeam = ({ isOpen, onClose, team, users }) => {
    const [cover, setCover] = useState()

    const initialValues = {
        name: '',
        logo: '',
        players: [''],
        captain: ''
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
            cover: {
                ...(champion ? { champion } : {}),
                ...(skin ? { skin } : {}),
                ...(offset ? { offset } : {})
            }
        }
        db.collection("teams").doc(name).set(cleanInput)
            .then(() => {
                toast({
                    title: "Team created captain.",
                    description: `Your team ${name} was successfully created.`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
                players.length > 1 && players.forEach((id) => {
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
                            <ModalHeader>Create Team</ModalHeader>
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
                                <FormControl mt={4}>
                                    <FormLabel>Add Members</FormLabel>
                                    <FieldArray name="players">
                                        {({ push, remove }) => {
                                            return (
                                                <>
                                                    {props.values.players.map((player, i) => {
                                                        return (
                                                            <Flex mt={4} key={i}>
                                                                <Field name={`players.${i}`} key={i} type="select" as={Select} placeholder="Select Player">
                                                                    {users && users[0] && users?.map((user, i) => {
                                                                        return !user.team && <option key={i} value={user.id}>
                                                                            {user.username}
                                                                            {" -> "}
                                                                            {user.role ? user.role : "No Role"}
                                                                        </option>
                                                                    })}
                                                                </Field>
                                                                <Button ml={4} colorScheme="red" onClick={() => remove(i)}>Delete</Button>
                                                            </Flex>
                                                        )
                                                    })}
                                                    <Button mt={4} onClick={() => push("")}>Add More Players</Button>
                                                </>
                                            )
                                        }}
                                    </FieldArray>
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Select Captain</FormLabel>
                                    <Field name="captain" type="select" as={Select} placeholder="Select Captain">
                                        {users && users[0] && users.map((user, i) => {
                                            return props.values.players.includes(user.id) && <option key={i} value={user.id}>{user.username}</option>
                                        })}
                                    </Field>
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