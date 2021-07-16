import { Avatar, Grid, Heading, Text } from "@chakra-ui/react"

export const Standings = ({ standings }) => {
    return (
        <div>
            <Grid templateColumns="repeat(5, 1fr)" justifyItems="center" mb="1.5rem">
                <Heading fontSize="1rem">Rank</Heading>
                <Heading fontSize="1rem" gridColumn="2/4">Team</Heading>
                <Heading fontSize="1rem">Wins</Heading>
                <Heading fontSize="1rem">Loses</Heading>
            </Grid>
            {standings.map((stand, i) => {
                return <TeamStandingAvatar key={i} rank={i} standing={stand} />
            })}
        </div>
    )
}

const TeamStandingAvatar = ({ standing, rank }) => {
    const { team, logo, win, lose } = standing
    return (
        <Grid alignItems="center" mb="1.5rem" templateColumns="1fr 1fr 1fr 1fr 1fr" justifyItems="center">
            <Heading fontSize="1.5rem">{rank + 1}</Heading>
            <Avatar mr="1rem" name={team} bgColor="gray.800" src={logo} />
            <Heading fontSize="1rem" justifySelf="left">{team}</Heading>
            <Text>{win}</Text>
            <Text>{lose}</Text>
        </Grid>
    )
}