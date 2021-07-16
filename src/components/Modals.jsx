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

const champions = ['Katarina', 'Gwen', 'Jhin']
const teams = ['Afreeca Freeks', 'Dragon X', 'DAMWON KIA', 'Fredit BRION', 'Gen.G', 'Hanwha Life', 'KT Rolster', 'Liiv SANDBOX', 'Nongshim RedForce', 'T1', 'Fnatic', 'G2']

export const CreateTournamentModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
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

export const AddNewDate = ({ isOpen, onClose }) => {
    const [selectedDate, handleDateChange] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const match = {
        time: dayjs(new Date()).format('HH:mm'),
        team1: undefined,
        team2: undefined
    }
    const [matches, setMatches] = useState([match])

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Date</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Select Date</FormLabel>
                        <Input type="date" required value={selectedDate} onChange={e => handleDateChange(e.target.value)} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Add Format</FormLabel>
                        <Input required />
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

const EditMatches = ({ match }) => {
    const matchStatus = ['Team 1 Won', 'Team 2 Won', 'Live', 'Match starts soon', 'Cancelled']
    const { time, t1, t2, result } = match
    return (
        <Flex alignItems="center" mt={4}>
            <Flex justifyContent="space-between">
                <Input type="time" required mr="1rem" value={`0${time[0]}:00`} />
                <Select placeholder={t1} mr="1rem">
                    {teams.map((team, i) => {
                        return <option key={i} value={team}>{team}</option>
                    })}
                </Select>
                <Select placeholder={t2} mr="1rem">
                    {teams.map((team, i) => {
                        return <option key={i} value={team}>{team}</option>
                    })}
                </Select>
                <Select placeholder={result}>
                    {matchStatus.map((status, i) => {
                        return <option key={i} value={status}>{status}</option>
                    })}
                </Select>
            </Flex>
            <Button ml="1rem" colorScheme="red">Delete</Button>
        </Flex>
    )
}

export const EditDate = ({ isOpen, onClose, matchDate }) => {
    const { date, format, matches } = matchDate
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit {date}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Edit Date</FormLabel>
                        <Input type="date" required value={dayjs(date).format('YYYY-MM-DD')} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Edit Format</FormLabel>
                        <Input required value={format} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Edit Matches</FormLabel>
                        {matches.map((match, i) => {
                            return <EditMatches key={i} match={match} />
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

export const ForgotPassword = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Password Recovery</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Enter Your Email</FormLabel>
                        <Input type="email" required />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={3}>Cancel</Button>
                    <Button colorScheme="twitter">
                        Send Verification Email
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}