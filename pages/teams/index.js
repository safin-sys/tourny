import Head from "next/head"
import { Flex, Container, Heading } from "@chakra-ui/layout"
import NextLink from "next/link"
import { Avatar, Button, FormControl, FormLabel, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tooltip, useColorMode, useDisclosure, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { db } from "../../src/helper/base"
import { Field, FieldArray, Form, Formik, useFormik } from "formik"
import { useCollectionData } from "react-firebase-hooks/firestore"
import Loading from "../../src/components/Loading"
import SelectChampion from "../../src/components/SelectChampion"

export default function Teams() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [users, setUsers] = useState([])

    const [teams] = useCollectionData(db.collection('teams'))
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
                <title>Teams | Tourny</title>
            </Head>
            <Container maxW="75vw" marginY="1rem">
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading fontSize="1.5rem">Teams</Heading>
                    <Button colorScheme="twitter" onClick={onOpen}>Create a Team</Button>
                </Flex>
                {teams ? <Container maxW="75vw" marginY="2rem" padding="0" display="grid" gridTemplateColumns="1fr 1fr" gridGap="0 1rem">
                    {teams?.map((team, i) => {
                        return (
                            <Team key={i} team={team} />
                        )
                    })}
                </Container> : <Loading h />}
            </Container >
            <CreateTeam users={users} isOpen={isOpen} onClose={onClose} />
        </>
    )
}

const Team = ({ team }) => {
    const { name, logo } = team
    const { colorMode } = useColorMode()
    return (
        <NextLink href={'/teams/team?id=' + name}>
            <a>
                <Flex p="1rem" alignItems="center" _hover={{
                    background: `${colorMode === "light" ? "gray.200" : "gray.900"}`
                }}>
                    <Avatar name={name} mr="1.5rem" src={logo} bgColor="gray.800" />
                    <Heading fontSize="1rem" textDecoration="none">{name}</Heading>
                </Flex>
            </a>
        </NextLink>
    )
}

export const CreateTeam = ({ isOpen, onClose, users }) => {
    const [cover, setCover] = useState()

    const initialValues = {
        name: '',
        logo: '',
        players: [''],
        captain: ''
    }
    const toast = useToast()
    const handleSubmit = formik => {
        const {name, logo, players, captain} = formik
        const {champion, skin, offset} = cover
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
                                                                    {users?.map((user, i) => {
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
                                        {users.map((user, i) => {
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