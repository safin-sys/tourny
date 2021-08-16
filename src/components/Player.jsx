import { Avatar, Flex, Grid, Heading } from "@chakra-ui/react";

const statusList = ["Admin", "Captain", "Player"]
const roles = ["Top", "Jungle", "Mid", "ADC", "Support"]

export default function Player({ player, status, role }) {
    const { username, dp } = player
    return (
        <Grid p="1rem" templateColumns={status && role ? "1fr 1fr 1fr 1fr" : "1fr 1fr 1fr"} alignItems="center">
            <Flex alignItems="center">
                <Avatar name={username} src={dp} mr=".5rem" />
                <Heading ml=".5rem" fontSize="1rem" fontWeight="semibold">{username}</Heading>
            </Flex>
            {status ? <Heading fontSize="1rem" ml="5rem" fontWeight="semibold">{statusList[Math.floor(Math.random() * statusList.length)]}</Heading> : ''}
            {role ? <Heading fontSize="1rem" ml="5rem" fontWeight="semibold">{player && player?.role ? player.role : "No Role"}</Heading> : ''}
            <Heading fontSize="1rem" ml="5rem" fontWeight="semibold">{player && player?.team ? player.team : "No Team"}</Heading>
        </Grid>
    )
}
