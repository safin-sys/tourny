import { Container } from "@chakra-ui/react";
import Nav from "../../src/components/shared/Nav";
import Footer from "../../src/components/shared/Footer";
import ForgotForm from "../../src/components/Login/ForgotForm";

export default function Login() {
    return (
        <Container>
            <Nav />
            <ForgotForm />
            <Footer />
        </Container>
    )
}