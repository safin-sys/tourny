import { Box, Container } from "@chakra-ui/react";
import Hero from "../src/components/Home/Hero";
import Nav from "../src/components/shared/Nav";
import OngoingTournament from "../src/components/Home/OngoingTournament";
import Footer from "../src/components/shared/Footer";

export default function Home() {
	return (
		<Container maxW="container.xl">
			<Nav />
			<Hero />
			<OngoingTournament />
			<Footer />
		</Container>
	)
}