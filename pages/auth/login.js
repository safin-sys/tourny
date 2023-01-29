import { Container } from "@chakra-ui/react";
import Nav from "@components/shared/Nav";
import Footer from "@components/shared/Footer";
import { LoginForm } from "@components/auth/LoginForm";

export default function Login() {
    return (
        <Container>
            <Nav />
            <LoginForm />
            <Footer />
        </Container>
    );
}
