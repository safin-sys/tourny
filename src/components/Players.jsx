import { Container, Heading, Grid } from "@chakra-ui/layout"
import { Link } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Player } from "./AvatarContainer"

export const Players = () => {
    const [users, setUsers] = useState()

    useEffect(() => {
        const getUsers = async () => {
            const url = "https://randomuser.me/api/?results=12"
            const res = await fetch(url)
            const data = await res.json()
            setUsers(data.results)
        }
        getUsers()
    }, [])

    return (
        <Container maxW="75vw" marginY="4rem">
            <Heading fontSize="1.5rem" mb="1rem">Players</Heading>
            <Grid templateColumns="repeat(3, 1fr)" rowGap="1.5rem">
                {users?.map((user, i) => {
                    return <Link key={i}><Player player={user} /></Link>
                })}
            </Grid>
        </Container>
    )
}