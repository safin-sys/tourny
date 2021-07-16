import { Button, Container, Flex, Grid, useDisclosure } from "@chakra-ui/react"
import { Team } from "./AvatarContainer"

export const TournamentTeams = ({ teams }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Grid templateColumns="1fr 1fr" gap="1.5rem">
            {teams.map((stand, i) => {
                return <Team key={i} team={{
                    name: stand.team,
                    logo: stand.logo
                }} />
            })}
        </Grid>
    )
}
