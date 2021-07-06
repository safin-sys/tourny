import Head from "next/head"
import { Footer } from "../../src/components/Footer"
import { Nav } from "../../src/components/Nav"
import { Banner } from "../../src/components/Banner"
import { Flex, Container, Heading, Grid } from "@chakra-ui/layout"
import NextLink from "next/link"
import { Button, Checkbox, CheckboxGroup, Select, useDisclosure } from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"

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
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Head>
                <title>Tournaments | Tourny</title>
            </Head>
            <Nav />
            <Container maxW="75vw" marginY="1rem">
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading fontSize="1.5rem">Tournaments</Heading>
                    <Button colorScheme="twitter" onClick={onOpen}>Create Tournament</Button>
                </Flex>
                {list?.map((item, i) => {
                    return <NextLink key={i} href={'/' + item.name}>
                        <Container maxW="75vw" marginY="2rem" padding="0" cursor="pointer">
                            <Banner champion={item.champion} tournamentName={item.name} date={item.date} />
                        </Container>
                    </NextLink>
                })}
            </Container>
            <CreateTournamentModal isOpen={isOpen} onClose={onClose} />
            <Footer />
        </>
    )
}

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"

const champions = ['Katarina', 'Gwen', 'Jhin']
const teams = ['G2', 'Fnatic', 'Misfits', 'T1', 'DAMWON KIA', 'Gen.G', 'TSM', 'Cloud9', 'Suning', 'Invictus Gaming', 'kt Rolster', 'Afreeca Freeks']

const CreateTournamentModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent colorScheme="whatsapp" maxW="50vw">
                <ModalHeader>Create Tournament</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Tournament Name</FormLabel>
                        <Input placeholder="Tournament Name" required />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Select Cover Champion</FormLabel>
                        <Select placeholder="Select a champion">
                            {champions.map((champ, i) => {
                                return <option key={i} value={champ}>{champ}</option>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Select Participating Teams</FormLabel>
                        <Grid templateColumns="1fr 1fr 1fr">
                            <CheckboxGroup>
                                {teams.map((team, i) => {
                                    return <Checkbox marginY=".5rem" value={team} key={i}>{team}</Checkbox>
                                })}
                            </CheckboxGroup>
                        </Grid>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose} mr={3}>Cancel</Button>
                    <Button colorScheme="twitter">
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}