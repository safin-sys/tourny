import { Container, Heading, Grid } from "@chakra-ui/layout"
import { Avatar, Button, Flex, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Head from 'next/head'
import { EditPlayer } from "../src/components/Modals"

export default function PlayersPage() {
    const [users, setUsers] = useState()

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
                <Heading fontSize="1.5rem">Our Players</Heading>
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
    return (
        <Grid alignItems="center" templateColumns="1fr 1fr 1fr 1fr" my="1.5rem">
            <Flex alignItems="center">
                <Avatar name={fullname} src={src} mr=".5rem" />
                <Heading ml=".5rem" fontSize="1rem" fontWeight="semibold">{fullname}</Heading>
            </Flex>
            <Heading fontSize="1rem" ml="5rem" fontWeight="semibold">{gender === 'male' ? 'Captain' : 'Player'}</Heading>
            <Heading fontSize="1rem" ml="5rem" fontWeight="semibold">{`${location.city}, ${nat}`}</Heading>
            <Button justifySelf="end" onClick={onOpen}>Edit</Button>
            <EditPlayer isOpen={isOpen} onClose={onClose} player={player} />
        </Grid>
    )
}