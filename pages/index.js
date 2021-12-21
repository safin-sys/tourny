import Hero from "../src/components/Hero";

const info = {
	playerName: 'SafinTheShip',
	playerScore: '14/5/6',
	champion: 'Yone',
	date: '29/02/2019',
	team1: 'Nihilists',
	team2: 'Stoics'
}

export default function Home() {
	return (
		<>
			<Hero info={info} />
		</>
	)
}