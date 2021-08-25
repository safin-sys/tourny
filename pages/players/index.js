import { Container, Heading, Box } from "@chakra-ui/layout"
import { Avatar, Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useColorMode, useDisclosure, useToast } from "@chakra-ui/react"
import Head from 'next/head'
import { MVP } from "../../src/components/Modals"
import NextLink from 'next/link'
import Player from "../../src/components/Player"
import { db, fb } from "../../src/helper/base"
import { useEffect, useState } from "react"
import Loading from "../../src/components/Loading"
import { useCollectionDataOnce } from "react-firebase-hooks/firestore"
import { Field, Form, Formik } from "formik"

export default function PlayersPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [users, setUsers] = useState([])
    const [teams] = useCollectionDataOnce(db.collection("teams"))

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
    return (
        <>
            <Head>
                <title>Players | Tourny</title>
            </Head>
            {users.length > 0 ? <Container maxW="75vw" mt="1rem">
                <Flex justifyContent="space-between" alignItems="center" mb="1rem">
                    <Heading fontSize="1.5rem">Our Players</Heading>
                    <Button onClick={onOpen} colorScheme="twitter">MVP of The Week</Button>
                </Flex>
                <MVP isOpen={isOpen} onClose={onClose} />
                {users?.map((user, i) => {
                    return (
                        <Players key={i} player={user} teams={teams} />
                    )
                })}
            </Container> : <Loading h />}
        </>
    )
}

const Players = ({ player, teams }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode } = useColorMode()
    return (
        <Flex alignItems="center" pr="1rem" _hover={{
            background: `${colorMode === "light" ? "gray.200" : "gray.900"}`
        }}>
            <Box flexGrow="2">
                <NextLink href={`/players/player?id=${player.id}`}>
                    <a>
                        <Player player={player} role />
                    </a>
                </NextLink>
            </Box>
            <Button justifySelf="end" onClick={onOpen}>Edit</Button>
            <EditPlayer isOpen={isOpen} onClose={onClose} player={player} teams={teams} />
        </Flex>
    )
}

export const EditPlayer = ({ isOpen, onClose, player, teams }) => {
    const { username, team, captain, admin, id } = player
    const initialValues = {
        status: admin ? "Admin" : captain ? "Captain" : "Player",
        team
    }
    const handleClose = () => {
        onClose()
    }
    const toast = useToast()
    const handleSubmit = (values) => {
        db.collection("players").doc(id).update({
            admin: values?.status === "Admin" ? true : false,
            captain: values?.status === "Captain" ? true : false,
            team: values?.team ? values.team : ''
        })
            .then(() => {
                toast({
                    title: "Profile edited.",
                    description: "We've edited your profile for you.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
                handleClose()
            })
            .catch((err) => {
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
    return (
        <Formik
            initialValues={initialValues}>
            {props => (
                <Form>
                    <Modal isOpen={isOpen} onClose={onClose} size="xl">
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                <Heading fontSize="1.5rem" fontWeight="semibold">{username}</Heading>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody display="flex">
                                <FormControl mr="1rem">
                                    <FormLabel>Select Status</FormLabel>
                                    <Field type="select" name="status" as={Select}>
                                        <option>Admin</option>
                                        <option>Captain</option>
                                        <option>Player</option>
                                    </Field>
                                </FormControl>
                                <FormControl ml="1rem">
                                    <FormLabel>Select Team</FormLabel>
                                    <Field type="select" name="team" as={Select} placeholder="Select Team">
                                        {teams?.map((t, i) => {
                                            return <option key={i}>{t.name}</option>
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