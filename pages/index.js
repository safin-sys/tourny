import Head from 'next/head'
import { Nav } from '../src/components/Nav'
import { MVP } from '../src/components/MVP'
import { Ongoing } from '../src/components/Ongoing';
import { Footer } from '../src/components/Footer';
import { Players } from '../src/components/Players';

const MVPInfo = { 
	playerName: 'SafinTheShip',
	playerScore: '14/5/6',
	champion: 'Yone',
	date: '29/02/2019',
	team1: 'Nihilists',
	team2: 'Stoics'
}

const OngoingInfo = {
	champion: 'LeeSin',
	tournamentName: 'Teamwork Tournament 2020',
	date: '25 June - 5 July'

}

export default function Home() {
	return (
		<>
			<Head>
				<title>Tourny</title>
			</Head>
			<Nav />
			<MVP MVPInfo={MVPInfo} />
			<Ongoing OngoingInfo={OngoingInfo} />
			<Players />
			<Footer />
		</>
	)
}
