import { Avatar, Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";

export default function TeamMembers({ team }) {
    return (
        <Flex flexDirection="column">
            <Flex mt={4} flexDir="column">
                {team[0] ? team?.map((member, i) => {
                    return <MemberDetails key={i} member={member} />
                }) : <Text mx="auto">No Players</Text>}
            </Flex>
        </Flex>
    )
}

const MemberDetails = ({ member }) => {
    const { username, captain, role, dp } = member
    const { colorMode } = useColorMode()
    return (
        <Flex justifyContent="space-between" alignItems="center" w="100%" mb="1rem">
            <Flex alignItems="center">
                <Avatar src={dp} name={username} mr="1rem" />
                <Heading fontSize="1rem" mr=".5rem">{username}</Heading>
                {captain && <Box mt=".5rem"><Captain /></Box>}
            </Flex>
            <Text color={`${colorMode === "light" ? "#536471" : "#bebebe"}`}>{role}</Text>
        </Flex>
    )
}

const Captain = () => {
    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M404.7 79.78h-2.8c-7.5.26-15.8 1.73-24.8 4.3-18 5.16-38.4 14.56-59.3 25.78-41.9 22.4-85.8 52-121.5 68.6-26.4 12.4-59.3 20.4-89.8 27.5-30.5 7.1-58.95 13.4-74.36 20.6-7.13 3.4-10.9 6.9-12.71 9.9-1.8 2.9-2.1 5.2-1.44 8.4 1.32 6.4 8.57 15.4 18.49 21.9l3.29 2.1c162.63-2.3 289.43-13.7 387.73-52.6 2.1-17.6 6.7-34.7 16.5-48.5v-.1l.1-.1c24.5-32.2 8.9-72.58-22.4-84.89-5-1.95-10.7-2.91-17-2.93zm21.9 185.12c-44.2 25.1-103.8 37-169.2 41.2-68.7 4.4-143.7.1-213.52-7.8l1.89 14c31.19 3.2 98.53 11.8 172.83 11.5 77.2-.3 159.6-11.3 208.6-46.2-.2-4.1-.4-8.3-.6-12.7zm7.1 30.2c-46.9 31.5-113.8 42.9-179.9 45.8 44.7 39 89.3 55.1 127.3 59.1 45.2 4.8 81.5-8.7 94.8-19.8 13-10.8 17.5-19.5 18.3-26.2.7-6.8-2-13.3-8.2-20.5-11.3-13.4-33.5-26.4-52.3-38.4z"></path></svg>
    )
}