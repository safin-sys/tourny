import { Container } from "@chakra-ui/react";
import Nav from "@components/shared/Nav";
import Footer from "@components/shared/Footer";
import ResetForm from "@components/auth/ResetForm";

export default function Login() {
    return (
        <Container>
            <Nav />
            <ResetForm />
            <Footer />
        </Container>
    );
}
