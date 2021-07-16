import { Grid } from "@chakra-ui/react"
import { Team } from "./AvatarContainer"

export const TournamentTeams = ({ teams }) => {
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