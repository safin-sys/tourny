import { Flex, Heading, Text } from "@chakra-ui/layout"
import { Avatar } from "@chakra-ui/react"

export const Player = ({ player }) => {
    const { name, picture, location } = player

    const fullname = `${name.title} ${name.first} ${name.last}`
    const src = picture.thumbnail
    return (
        <Flex alignItems="center">
            <Avatar name={fullname} src={src} mr=".5rem" />
            <div>
                <Heading fontSize="1rem" fontWeight="semibold">{fullname}</Heading>
                <Text fontSize="1rem">{location.street.name}</Text>
            </div>
        </Flex>
    )
}

export const Team = ({ team, flip, size }) => {
    const { name, logo } = team
    return (
        <Flex alignItems="center" flexDirection={flip ? 'row-reverse' : 'row'}>
            <Avatar size={size} name={name} bgColor="gray.800" src={logo} marginX=".5rem" />
            <div>
                <Heading fontSize="1rem" fontWeight="semibold">{name}</Heading>
            </div>
        </Flex>
    )
}
