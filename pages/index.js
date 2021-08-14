import { Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head'
import { MVP } from '../src/components/MVP'
import { Ongoing } from '../src/components/Ongoing';

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
			{MVPInfo ? <MVP MVPInfo={MVPInfo} /> : <Welcome />}
			<Ongoing OngoingInfo={OngoingInfo} />
		</>
	)
}

const Welcome = () => {
	return (
		<Container maxW="75vw" pos="relative" overflow="hidden">
			<Flex ml="1rem" justifyContent="center" h="calc(100vh - 128px)" flexDir="column">
				<Heading>Welcome to <Heading display="inline" fontWeight="normal" fontFamily="Pacifico">Tourny</Heading></Heading>
				<Text maxW="50ch" mt={4}>Make and Join League of Legends tournaments, connect with your teammates and get information about ongoing or past tournaments.</Text>
				<Button colorScheme="twitter" mt={5} w="fit-content">Join Now!</Button>
			</Flex>
		</Container>
	)
}