import Head from "next/head"
import { Flex, Container, Heading } from "@chakra-ui/layout"
import NextLink from "next/link"
import { Avatar, Button, FormControl, FormLabel, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Tooltip, useColorMode, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { db } from "../../src/helper/base"
import { Field, FieldArray, Form, Formik, useFormik } from "formik"

const teams = [
    { name: 'Astralis', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FAST-FullonDark.png', win: '5', lose: '6' },
    { name: 'Rogue', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FRogue_FullColor2.png', win: '8', lose: '3' },
    { name: 'Fnatic', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591295307_FnaticFNC-01-FullonDark.png', win: '8', lose: '3' },
    { name: 'Misfits Gaming', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591419157_MisfitsMSF-01-FullonDark.png', win: '8', lose: '4' },
    { name: 'MAD Lions', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591395339_MadLionsMAD-01-FullonDark.png', win: '7', lose: '4' },
    { name: 'G2 Esports', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FG2-FullonDark.png', win: '6', lose: '5' },
    { name: 'Team Vitality', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FVitality-logo-color-outline-rgb.png', win: '5', lose: '6' },
    { name: 'EXCEL', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FExcel_FullColor2.png', win: '4', lose: '8' },
    { name: 'Schalke 04', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FS04_Standard_Logo1.png', win: '3', lose: '8' },
    { name: 'SK Gaming', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FSK_FullColor.png', win: '2', lose: '9' }
].sort((a, b) => ('' + a.name).localeCompare(b.name));

export default function Teams() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [users, setUsers] = useState([])

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
                <Container maxW="75vw" marginY="2rem" padding="0" display="grid" gridTemplateColumns="1fr 1fr" gridGap="0 1rem">
                    {teams?.map((team, i) => {
                        return (
                            <Team key={i} team={team} />
                        )
                    })}
                </Container>
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
        cover,
        players: [''],
        captain: ''
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
                                    <SelectChamp setCover={setCover} />
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
                                                                        return <option key={i} value={user.id}>
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
                                <Button onClick={onClose} mr={3}>Cancel</Button>
                                <Button colorScheme="twitter" onClick={() => console.log(props.values)}>
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

const SelectChamp = ({ setCover }) => {
    const [champions, setChampions] = useState()
    const [skins, setSkins] = useState()
    const formik = useFormik({
        initialValues: {
            champion: '',
            skin: 0,
            offset: 0,
        },
        enableReinitialize: true
    })
    useEffect(() => {
        setCover(formik.values)
    }, [formik.values])
    const { champion, skin, offset } = formik.values

    const skinURL = `http://ddragon.leagueoflegends.com/cdn/11.16.1/data/en_US/champion/${champion}.json`


    if (!champions) fetch("/championList.json")
        .then(res => res.json())
        .then(data => setChampions(data))

    useEffect(() => {
        if (champion) fetch(skinURL)
            .then(res => res.json())
            .then(data => setSkins(data.data[champion].skins))
    }, [champion])

    return (
        <Grid templateColumns="1fr 1fr 1fr" columnGap="1rem">
            <Select placeholder="Select Champion" name="champion" value={champion} onChange={formik.handleChange}>
                {champions?.map((champ, i) => {
                    return <option key={i} value={champ}>{champ}</option>
                })}
            </Select>
            <Select placeholder="Select Skin" name="skin" value={skin} onChange={formik.handleChange}>
                {skins?.map((champ, i) => {
                    return <option key={i} value={champ.num}>{champ.name === "default" ? "Default" : champ.name}</option>
                })}
            </Select>
            <Tooltip hasArrow label="Offset changes position of the cover picture. Higher the number lower the picture.">
                <Input as="input" type="number" max="100" min="0" name="offset" value={offset} onChange={formik.handleChange} />
            </Tooltip>
        </Grid>
    )
}