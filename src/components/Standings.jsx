import { Avatar, Grid, Heading, Text, useColorMode } from "@chakra-ui/react"
import NextLink from 'next/link'

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
    const { colorMode } = useColorMode()
    return (
        <NextLink href={`/team?id=${rank}`}>
            <a style={{textDecoration: 'none'}}>
                <Grid alignItems="center" paddingY="1rem" templateColumns="1fr 1fr 1fr 1fr 1fr" justifyItems="center" cursor="pointer" _hover={{
                    background: `${colorMode === "light" ? "gray.200" : "gray.900"}`
                }}>
                    <Heading fontSize="1.5rem">{rank + 1}</Heading>
                    <Avatar mr="1rem" name={team} bgColor="gray.800" src={logo} />
                    <Heading fontSize="1rem" justifySelf="left">{team}</Heading>
                    <Text>{win}</Text>
                    <Text>{lose}</Text>
                </Grid>
            </a>
        </NextLink>
    )
}