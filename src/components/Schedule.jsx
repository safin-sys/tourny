import { Container, Flex, Heading, Text, Grid } from "@chakra-ui/layout"
import { Avatar, Button, useDisclosure } from "@chakra-ui/react"
import { EditDate } from "./Modals"

export const Schedule = ({ matchDate }) => {
    const { date, format, matches } = matchDate
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Container maxW="100%" padding="0" mb="4rem">
            <Flex justifyContent="space-between" alignItems="center">
                <Heading fontSize="1.5rem">{date}</Heading>
                <Heading fontSize="1.5rem" display="flex" alignItems="center">
                    {format}
                    <Button ml="1rem" onClick={onOpen}>Edit</Button>
                </Heading>
            </Flex>
            <Container maxW="100%" padding="0">
                {matches.map((match, i) => {
                    return <Match key={i} match={match} />
                })}
            </Container>
            <EditDate isOpen={isOpen} onClose={onClose} matchDate={matchDate} />
        </Container>
    )
}

export const Match = ({ match }) => {
    const { time, t1, t1Logo, t2, t2Logo, result } = match
    return (
        <Grid alignItems="center" marginY="1.5rem" templateColumns="1fr 1fr 1fr">
            <Heading fontSize="1.5rem">{time[0]}<Heading as="p" fontSize="1rem" display="inline-block">pm</Heading></Heading>
            <Flex justifyContent="space-between" w="400px" alignItems="center">
                <Team team={{ name: t1, logo: t1Logo }} size="sm" />
                <Text>vs</Text>
                <Team team={{ name: t2, logo: t2Logo }} flip size="sm" />
            </Flex>
            <Heading fontSize="1rem" justifySelf="end">{result}</Heading>
        </Grid>
    )
}

const Team = ({ team, flip, size }) => {
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