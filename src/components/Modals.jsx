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
    Avatar,
    Heading,
    Box,
} from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Grid } from "@chakra-ui/layout"
import { useState } from "react"
import dayjs from "dayjs"

const champions = ['Katarina', 'Gwen', 'Jhin']
const teams = ['Afreeca Freeks', 'Dragon X', 'DAMWON KIA', 'Fredit BRION', 'Gen.G', 'Hanwha Life', 'KT Rolster', 'Liiv SANDBOX', 'Nongshim RedForce', 'T1', 'Fnatic', 'G2']
const roles = ['Top', 'Jungle', 'Mid', 'ADC', 'Support', 'Substitute']
const players = ['Wunder', 'Jankos', 'Caps', 'Perkz', 'Rekkless', 'Mikyx']

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
                <Input type="time" required mr="1rem" placeholder={`0${time[0]}:00`} />
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
                        <Input type="date" required placeholder={dayjs(date).format('YYYY-MM-DD')} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Edit Format</FormLabel>
                        <Input required placeholder={format} />
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

export const EditPlayer = ({ isOpen, onClose, player }) => {
    const { name, picture } = player
    const fullname = `${name.first} ${name.last}`
    const src = picture.thumbnail
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Flex alignItems="center">
                        <Avatar name={fullname} src={src} mr=".5rem" />
                        <Heading ml=".5rem" fontSize="1rem" fontWeight="semibold">{fullname}</Heading>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex">
                    <FormControl mr="1rem">
                        <FormLabel>Select Status</FormLabel>
                        <Select value="Player">
                            <option>Admin</option>
                            <option>Captain</option>
                            <option>Player</option>
                        </Select>
                    </FormControl>
                    <FormControl ml="1rem">
                        <FormLabel>Select Team</FormLabel>
                        <Select mr="1rem">
                            {teams.map((team, i) => {
                                return <option key={i} value={team}>{team}</option>
                            })}
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter display="flex" justifyContent="space-between">
                    <Button colorScheme="red" mr={3}>Delete Player</Button>
                    <Box>
                        <Button onClick={onClose} mr={3}>Cancel</Button>
                        <Button colorScheme="twitter">
                            Save
                        </Button>
                    </Box>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export const EditTeam = ({ isOpen, onClose, team }) => {
    const member = {
        name: undefined,
        role: undefined,
        captain: false
    }
    const [members, setMembers] = useState([member])
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Team</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex>
                        <FormControl mr="1rem">
                            <FormLabel>Edit Name</FormLabel>
                            <Input placeholder={team} />
                        </FormControl>
                        <FormControl w="auto">
                            <FormLabel>Change Logo</FormLabel>
                            <Button>
                                Click to Upload
                                <Input type="file" hidden />
                            </Button>
                        </FormControl>
                    </Flex>
                    <FormControl mt={4}>
                        <FormLabel>Change Cover</FormLabel>
                        <Select>
                            {champions.map((champ, i) => {
                                return <option key={i} value={champ}>{champ}</option>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Add Members</FormLabel>
                        {members.map((match, i) => {
                            return <CreatMembers key={i} index={i} members={members} setMembers={setMembers} />
                        })}
                    </FormControl>
                    <Button mt={4} onClick={() => setMembers(members => [...members, member])}>Add More Players</Button>
                    <FormControl mt={4}>
                        <FormLabel>Select Captain</FormLabel>
                        <Select placeholder="Select Captain">
                            {members.map((member, i) => {
                                if (member.name) {
                                    return <option key={i} value={member.name}>{member.name}</option>
                                } else if (members.length === 0) {
                                    return <option key={i} value={null}>No Player</option>
                                }
                            })}
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter display="flex" justifyContent="space-between">
                    <Button colorScheme="red" mr={3}>Delete Team</Button>
                    <Box>
                        <Button onClick={onClose} mr={3}>Cancel</Button>
                        <Button colorScheme="twitter">
                            Save
                        </Button>
                    </Box>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const CreatMembers = ({ members, setMembers, index }) => {
    const { name, role, captain } = members[index]
    const handleChange = (e, key) => {
        const newMember = [...members]
        newMember[index][key] = e.target.value
        setMembers(newMember)
    }
    const handleDelete = () => {
        const newMember = [...members]
        newMember.splice(index, 1)
        setMembers(newMember)
    }
    return (
        <Flex alignItems="center" mt={4}>
            <Flex justifyContent="space-between" w="100%">
                <Select placeholder="Select Player" mr="1rem" onChange={e => handleChange(e, 'name')}>
                    {players.map((player, i) => {
                        return <option key={i} value={player}>{player}</option>
                    })}
                </Select>
                <Select placeholder="Select Role" onChange={e => handleChange(e, 'role')}>
                    {roles.map((role, i) => {
                        return <option key={i} value={role}>{role}</option>
                    })}
                </Select>
            </Flex>
            <Button ml="1rem" colorScheme="red" onClick={handleDelete}>Delete</Button>
        </Flex>
    )
}

export const MVP = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>MVP of The Week</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Select MVP</FormLabel>
                        <Select placeholder="Select MVP">
                            {players.map((player, i) => {
                                return <option key={i} value={player}>{player}</option>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>MVP K/D/A</FormLabel>
                        <Input type="text" required placeholder="e.g. 14/5/9" />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Select Champion</FormLabel>
                        <Select placeholder="Select Champion">
                            {champions.map((player, i) => {
                                return <option key={i} value={player}>{player}</option>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Select The Match</FormLabel>
                        <Flex justifyContent="space-between">
                            <Input type="date" required mr="1rem" />
                            <Select placeholder="Select Team 1" mr="1rem">
                                {teams.map((team, i) => {
                                    return <option key={i} value={team}>{team}</option>
                                })}
                            </Select>
                            <Select placeholder="Select Team 2">
                                {teams.map((team, i) => {
                                    return <option key={i} value={team}>{team}</option>
                                })}
                            </Select>
                        </Flex>
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

export const CreateTeam = ({ isOpen, onClose }) => {
    const member = {
        name: undefined,
        role: undefined,
        captain: false
    }
    const [members, setMembers] = useState([member])
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Team</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex>
                        <FormControl mr="1rem">
                            <FormLabel>Edit Name</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl w="auto">
                            <FormLabel>Change Logo</FormLabel>
                            <Button>
                                Click to Upload
                                <Input type="file" hidden />
                            </Button>
                        </FormControl>
                    </Flex>
                    <FormControl mt={4}>
                        <FormLabel>Change Cover</FormLabel>
                        <Select>
                            {champions.map((champ, i) => {
                                return <option key={i} value={champ}>{champ}</option>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Add Members</FormLabel>
                        {members.map((match, i) => {
                            return <CreatMembers key={i} index={i} members={members} setMembers={setMembers} />
                        })}
                    </FormControl>
                    <Button mt={4} onClick={() => setMembers(members => [...members, member])}>Add More Players</Button>
                    <FormControl mt={4}>
                        <FormLabel>Select Captain</FormLabel>
                        <Select placeholder="Select Captain">
                            {members.map((member, i) => {
                                if (member.name) {
                                    return <option key={i} value={member.name}>{member.name}</option>
                                } else if (members.length === 0) {
                                    return <option key={i} value={null}>No Player</option>
                                }
                            })}
                        </Select>
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

export const EditProfile = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex>
                        <FormControl mr="1rem">
                            <FormLabel>Edit Name</FormLabel>
                            <Input />
                        </FormControl>
                        <FormControl w="auto">
                            <FormLabel>Change Logo</FormLabel>
                            <Button>
                                Click to Upload
                                <Input type="file" hidden />
                            </Button>
                        </FormControl>
                    </Flex>
                    <FormControl mt={4}>
                        <FormLabel>Change Cover</FormLabel>
                        <Select>
                            {champions.map((champ, i) => {
                                return <option key={i} value={champ}>{champ}</option>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Edit Facebook</FormLabel>
                        <Input />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Edit Email</FormLabel>
                        <Input type="email" />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Edit Phone</FormLabel>
                        <Input type="phone" />
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