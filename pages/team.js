import { Avatar, Container } from "@chakra-ui/react";
import { useRouter } from "next/router"
import { Banner } from "../src/components/Banner";

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
].sort((a, b) => (b.win - b.lose) - (a.win - a.lose));

export default function TeamPage() {
    const router = useRouter()
    const { id } = router.query
    const { team, logo } = id ? standings[id] : standings[0]
    console.log(team);
    return (
        <Container maxW="75vw" position="relative">
            <Banner mt="1rem" champion="Akali" skin="32" />
            <Avatar size="xl" name={team} src={logo} bgColor="gray.800" position="absolute" top="75%" left="10%" />
        </Container>
    )
}