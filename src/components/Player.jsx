import { Flex, Heading, Text } from "@chakra-ui/layout"
import { Avatar } from "@chakra-ui/react"

export const Player = ({ player }) => {
    const name = `${player.name.title} ${player.name.first} ${player.name.last}`
    const src = player.picture.thumbnail
    return (
        <Flex alignItems="center">
            <Avatar name={name} src={src} mr=".5rem" />
            <div>
                <Heading fontSize="1rem" fontWeight="semibold">{name}</Heading>
                <Text fontSize="1rem">{player.location.street.name}</Text>
            </div>
        </Flex>
    )
}