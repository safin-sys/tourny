import HeroImage from "./HeroImage";

const info = {
    player: "SafinTheShip",
    score: "15/2/9",
    date: "25/04/22",
    teams: {
        team1: "Nihilist",
        team2: "Stoics"
    },
    championName: "Akali",
    skinID: "5",
    objectPosition: "53% center"
}

const Hero = () => {
    return (
        <>
            <HeroImage {...info} />
        </>
    );
};

export default Hero;
