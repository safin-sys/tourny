import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Select,
    Checkbox,
    CheckboxGroup,
} from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Grid } from "@chakra-ui/layout"
import { useState } from "react"
import dayjs from "dayjs"

export const AddNewDate = ({ isOpen, onClose }) => {
    const [selectedDate, handleDateChange] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const match = {
        time: dayjs(new Date()).format('HH:mm'),
        team1: undefined,
        team2: undefined
    }
    const [matches, setMatches] = useState([ match ])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="50vw">
                <ModalHeader>Add New Date</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Select Date & Time</FormLabel>
                        <Input type="date" required value={selectedDate} onChange={e => handleDateChange(e.target.value)} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Create Matches</FormLabel>
                        {matches.map((match, i) => {
                            return <CreatMatches key={i} index={i} matches={matches} setMatches={setMatches} />
                        })}
                    </FormControl>
                    <Button mt={4} onClick={() => setMatches(matches => [...matches, match])}>Add More Matches</Button>
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

const CreatMatches = ({ matches, setMatches, index }) => {
    const { time, team1, team2 } = matches[index]
    const handleTime = (e) => {
        const newMatches = [...matches]
        newMatches[index]['time'] = e.target.value
        setMatches(newMatches)
    }
    const handleTeam = (e, teamNumber) => {
        const newMatches = [...matches]
        newMatches[index]['team' + teamNumber] = e.target.value
        setMatches(newMatches)
    }
    const handleDelete = () => {
        const newMatches = [...matches]
        newMatches.splice(index, 1)
        setMatches(newMatches)
    }
    return (
        <Flex alignItems="center" mt={4}>
            <Flex justifyContent="space-between">
                <Input type="time" required value={time} onChange={e => handleTime(e)} mr="1rem" />
                <Select placeholder="Select Team 1" mr="1rem" value={team1} onChange={e => handleTeam(e, 1)}>
                    {teams.map((team, i) => {
                        return <option key={i} value={team}>{team}</option>
                    })}
                </Select>
                <Select placeholder="Select Team 2" value={team2} onChange={e => handleTeam(e, 2)}>
                    {teams.map((team, i) => {
                        return <option key={i} value={team}>{team}</option>
                    })}
                </Select>
            </Flex>
            <Button ml="1rem" colorScheme="red" onClick={handleDelete}>Delete</Button>
        </Flex>
    )
}

const champions = ['Katarina', 'Gwen', 'Jhin']
const teams = ['Afreeca Freeks', 'Dragon X', 'DAMWON KIA', 'Fredit BRION', 'Gen.G', 'Hanwha Life', 'KT Rolster', 'Liiv SANDBOX', 'Nongshim RedForce', 'T1', 'Fnatic', 'G2']

export const CreateTournamentModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="50vw">
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