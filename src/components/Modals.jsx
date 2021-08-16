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
    useToast,
    useDisclosure,
} from "@chakra-ui/react"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Grid } from "@chakra-ui/layout"
import { useRef, useState } from "react"
import dayjs from "dayjs"
import { auth, db } from "../helper/base"
import { useRouter } from "next/router"
import SelectChampion from "./SelectChampion"

const champions = ['Katarina', 'Gwen', 'Jhin']
const teams = ['Afreeca Freeks', 'Dragon X', 'DAMWON KIA', 'Fredit BRION', 'Gen.G', 'Hanwha Life', 'KT Rolster', 'Liiv SANDBOX', 'Nongshim RedForce', 'T1', 'Fnatic', 'G2']
const roles = ['Top', 'Jungle', 'Mid', 'ADC', 'Support']
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
    const [email, setEmail] = useState('')
    const toast = useToast()
    const sendVerificationEmail = () => {
        auth.sendPasswordResetEmail(email)
            .then(() => {
                toast({
                    title: "Password Recovery Email Sent.",
                    description: "Check your email address for a recovery email.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
            })
            .catch(err => {
                console.log(err);
                toast({
                    title: "Password Recovery Email Sending Failed.",
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
            })
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Password Recovery</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Enter Your Email</FormLabel>
                        <Input type="email" required onChange={e => setEmail(e.target.value)} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={3}>Cancel</Button>
                    <Button colorScheme="twitter" onClick={sendVerificationEmail}>
                        Send Verification Email
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export const EditPlayer = ({ isOpen, onClose, player }) => {
    const { username } = player
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Flex alignItems="center">
                        <Avatar name={username} mr=".5rem" />
                        <Heading ml=".5rem" fontSize="1rem" fontWeight="semibold">{username}</Heading>
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

export const EditProfile = ({ isOpen, onClose, player, handleEditPlayer, selectedChamp, setSelectedChamp, selectedSkin, setSelectedSkin, offset, setOffset }) => {
    const [username, setUsername] = useState('')
    const [dp, setDP] = useState('')
    const [fb, setFB] = useState('')
    const [phone, setPhone] = useState('')
    const [upload, setUpload] = useState('')
    const [role, setRole] = useState('')

    const editedProfile = {
        username,
        dp,
        fb,
        phone,
        upload,
        role,
        cover: {
            champion: selectedChamp,
            skin: selectedSkin,
            offset: offset
        }
    }
    const hiddenInput = useRef()
    const handleUpload = () => {
        setUpload(hiddenInput.current?.files)
    }
    const { isOpen: isYouOpen, onOpen: onYouOpen, onClose: onYouClose } = useDisclosure()
    const toast = useToast()
    const router = useRouter()
    const handleDeleteProfile = () => {
        auth.currentUser.delete()
            .then(() => {
                toast({
                    title: "Profile deleted.",
                    description: "We've deleted your profile for you.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
                router.push("/")
            })
            .catch(err => {
                console.log(err);
                toast({
                    title: "Profile not deleted.",
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left"
                })
            })
    }

    const handleEdit = () => {
        handleEditPlayer(editedProfile)
        onClose()
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mr="1rem">
                        <FormLabel>Edit Name</FormLabel>
                        <Input placeholder={player?.username} onChange={e => setUsername(e.target.value)} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Edit DP URL</FormLabel>
                        <Input placeholder={player?.dp} onChange={e => setDP(e.target.value)} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Change Cover</FormLabel>
                        <SelectChampion selectedChamp={selectedChamp} setSelectedChamp={setSelectedChamp} selectedSkin={selectedSkin} setSelectedSkin={setSelectedSkin} offset={offset} setOffset={setOffset} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Edit Role</FormLabel>
                        <Select placeholder={player?.role ? player?.role : "Select a role"} onChange={e => setRole(e.target.value)}>
                            {roles.map((role, i) => {
                                return <option key={i} value={role}>{role}</option>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Edit Facebook</FormLabel>
                        <Input placeholder={player?.fb} onChange={e => setFB(e.target.value)} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Edit Phone</FormLabel>
                        <Input placeholder={player?.phone} type="phone" onChange={e => setPhone(e.target.value)} />
                    </FormControl>
                </ModalBody>
                <ModalFooter display="flex" justifyContent="space-between">
                    <Button colorScheme="red" onClick={onYouOpen}>Delete Profile</Button>
                    <AreYouSure isYouOpen={isYouOpen} onYouClose={onYouClose} externalFunction={handleDeleteProfile} />
                    <Box>
                        <Button onClick={onClose} mr={3}>Cancel</Button>
                        <Button colorScheme="twitter" onClick={handleEdit}>
                            Save
                        </Button>
                    </Box>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const AreYouSure = ({ isYouOpen, onYouClose, externalFunction }) => {
    const handleCloseAndExternalFunction = () => {
        externalFunction()
        onYouClose()
    }
    return (
        <Modal isOpen={isYouOpen} onClose={onYouClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are you sure you want to do this?</ModalHeader>
                <ModalCloseButton />
                <ModalFooter>
                    <Button onClick={handleCloseAndExternalFunction} mr={3} colorScheme="red">Yes</Button>
                    <Button colorScheme="twitter">
                        No
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}