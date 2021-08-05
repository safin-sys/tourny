import { Container, Heading, Grid, Box } from "@chakra-ui/layout"
import { Avatar, Button, Flex, useColorMode, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Head from 'next/head'
import { EditPlayer, MVP } from "../../src/components/Modals"
import NextLink from 'next/link'

export default function PlayersPage() {
    const [users, setUsers] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        const getUsers = async () => {
            const url = "https://randomuser.me/api/?results=32"
            const res = await fetch(url)
            const data = await res.json()
            setUsers(data.results)
        }
        getUsers()
    }, [])
    return (
        <>
            <Head>
                <title>Players | Tourny</title>
            </Head>
            <Container maxW="75vw" mt="1rem">
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading fontSize="1.5rem">Our Players</Heading>
                    <Button onClick={onOpen} colorScheme="twitter">MVP of The Week</Button>
                </Flex>
                <MVP isOpen={isOpen} onClose={onClose} />
                {users?.map((user, i) => {
                    return <Player key={i} player={user} />
                })}
            </Container>
        </>
    )
}

const Player = ({ player }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { name, picture, location, gender, nat } = player
    const fullname = `${name.first} ${name.last}`
    const src = picture.thumbnail
    const { colorMode } = useColorMode()
    return (
        <Flex alignItems="center" p="1rem" _hover={{
            background: `${colorMode === "light" ? "gray.200" : "gray.900"}`
        }}>
            <Box flexGrow="2">
                <NextLink href={`/players/player?id=${name.first}`}>
                    <a>
                        <Grid templateColumns="1fr 1fr 1fr" alignItems="center">
                            <Flex alignItems="center">
                                <Avatar name={fullname} src={src} mr=".5rem" />
                                <Heading ml=".5rem" fontSize="1rem" fontWeight="semibold">{fullname}</Heading>
                            </Flex>
                            <Heading fontSize="1rem" ml="5rem" fontWeight="semibold">{gender === 'male' ? 'Captain' : 'Player'}</Heading>
                            <Heading fontSize="1rem" ml="5rem" fontWeight="semibold">{`${location.city}, ${nat}`}</Heading>
                        </Grid>
                    </a>
                </NextLink>
            </Box>
            <Button justifySelf="end" onClick={onOpen}>Edit</Button>
            <EditPlayer isOpen={isOpen} onClose={onClose} player={player} />
        </Flex>
    )
}