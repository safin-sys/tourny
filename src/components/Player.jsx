import { Avatar, Flex, Grid, Heading } from "@chakra-ui/react";

const statusList = ["Admin", "Captain", "Player"]
const roles = ["Top", "Jungle", "Mid", "ADC", "Support"]

export default function Player({ player, status, role }) {
    const { name, picture, location } = player
    const fullname = `${name.first} ${name.last}`
    const src = picture.thumbnail
    return (
        <Grid p="1rem" templateColumns={status && role ? "1fr 1fr 1fr 1fr" : "1fr 1fr 1fr"} alignItems="center">
            <Flex alignItems="center">
                <Avatar name={fullname} src={src} mr=".5rem" />
                <Heading ml=".5rem" fontSize="1rem" fontWeight="semibold">{fullname}</Heading>
            </Flex>
            {status ? <Heading fontSize="1rem" ml="5rem" fontWeight="semibold">{statusList[Math.floor(Math.random() * statusList.length)]}</Heading> : ''}
            {role ? <Heading fontSize="1rem" ml="5rem" fontWeight="semibold">{roles[Math.floor(Math.random() * roles.length)]}</Heading> : ''}
            <Heading fontSize="1rem" ml="5rem" fontWeight="semibold">{location.country}</Heading>
        </Grid>
    )
}
