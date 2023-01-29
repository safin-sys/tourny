import Nav from "@components/shared/Nav";
import { Container } from "@chakra-ui/react";
import Footer from "@components/shared/Footer";
import PlayerHeader from "@components/players/PlayerHeader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@utils/firebase";

export default function Player({ player }) {
    return (
        <Container>
            <Nav />
            <PlayerHeader player={player} />
            <Footer />
        </Container>
    );
}

export const getServerSideProps = async (ctx) => {
    const playerSnap = await getDoc(doc(db, "users", ctx.query.id));
    if (playerSnap.exists()) {
        return {
            props: {
                player: playerSnap.data(),
            },
        };
    } else {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }
};
