import { Container } from "@chakra-ui/react";
import Nav from "@components/shared/Nav";
import Footer from "@components/shared/Footer";
import JoinForm from "@components/auth/join/JoinForm";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@utils/firebase";

export default function Join({ teams }) {
    return (
        <Container>
            <Nav />
            <JoinForm teams={teams} />
            <Footer />
        </Container>
    );
}

export const getServerSideProps = async () => {
    const teams = [];
    const querySnapshot = await getDocs(collection(db, "teams"));
    querySnapshot.forEach((doc) => {
        teams.push(doc.data().name);
    });
    teams.push("My team is not listed");

    return {
        props: {
            teams,
        },
    };
};
