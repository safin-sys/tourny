import { Container } from "@chakra-ui/react";
import Nav from "../../src/components/shared/Nav";
import Footer from "../../src/components/shared/Footer";
import PlayerHeader from "../../src/components/Players/PlayerHeader";
import { useEffect, useState } from "react";
import { getUserFromFirestore } from "../../src/libs/firebase/db";
import { useRouter } from "next/router";

export default function Player() {
	const [player, setPlayer] = useState(null);

	const router = useRouter()
	useEffect(() => {
		if (router.query.id && !player) {
			getUserFromFirestore(router.query.id).then((user) => {
				setPlayer(user);
			})
		}
	}, [player, router.isReady, router.query.id]);
	return (
		<Container>
			<Nav />
			<PlayerHeader player={player} />
			<Footer />
		</Container>
	)
}