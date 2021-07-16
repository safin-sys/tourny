import { Avatar, Grid, Heading, Text } from "@chakra-ui/react"

const standings = [
    { team: 'Astralis', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FAST-FullonDark.png', win: '5', lose: '6' },
    { team: 'Rogue', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FRogue_FullColor2.png', win: '8', lose: '3' },
    { team: 'Fnatic', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591295307_FnaticFNC-01-FullonDark.png', win: '8', lose: '3' },
    { team: 'Misfits Gaming', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591419157_MisfitsMSF-01-FullonDark.png', win: '8', lose: '4' },
    { team: 'MAD Lions', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1592591395339_MadLionsMAD-01-FullonDark.png', win: '7', lose: '4' },
    { team: 'G2 Esports', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FG2-FullonDark.png', win: '6', lose: '5' },
    { team: 'Team Vitality', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FVitality-logo-color-outline-rgb.png', win: '5', lose: '6' },
    { team: 'EXCEL', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FExcel_FullColor2.png', win: '4', lose: '8' },
    { team: 'Schalke 04', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FS04_Standard_Logo1.png', win: '3', lose: '8' },
    { team: 'SK Gaming', logo: 'https://am-a.akamaihd.net/image?resize=70:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2FSK_FullColor.png', win: '2', lose: '9' }
]

standings.sort((a, b) => (b.win - b.lose) - (a.win - a.lose));

export const Standings = () => {
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