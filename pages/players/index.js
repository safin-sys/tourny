import { Container, Heading, Box } from "@chakra-ui/layout"
import { Button, Flex, useColorMode, useDisclosure } from "@chakra-ui/react"
import Head from 'next/head'
import { EditPlayer, MVP } from "../../src/components/Modals"
import NextLink from 'next/link'
import Player from "../../src/components/Player"
import { db } from "../../src/helper/base"
import { useEffect, useState } from "react"
import Loading from "../../src/components/Loading"

export default function PlayersPage() {
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
                <title>Players | Tourny</title>
            </Head>
            {users.length > 0 ? <Container maxW="75vw" mt="1rem">
                <Flex justifyContent="space-between" alignItems="center">
                    <Heading fontSize="1.5rem">Our Players</Heading>
                    <Button onClick={onOpen} colorScheme="twitter">MVP of The Week</Button>
                </Flex>
                <MVP isOpen={isOpen} onClose={onClose} />
                {users?.map((user, i) => {
                    return (
                        <Players key={i} player={user} />
                    )
                })}
            </Container> : <Loading h />}
        </>
    )
}

const Players = ({ player }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode } = useColorMode()
    return (
        <Flex alignItems="center" _hover={{
            background: `${colorMode === "light" ? "gray.200" : "gray.900"}`
        }}>
            <Box flexGrow="2">
                <NextLink href={`/players/player?id=${player.username}`}>
                    <a>
                        <Player player={player} role />
                    </a>
                </NextLink>
            </Box>
            <Button justifySelf="end" onClick={onOpen}>Edit</Button>
            <EditPlayer isOpen={isOpen} onClose={onClose} player={player} />
        </Flex>
    )
}