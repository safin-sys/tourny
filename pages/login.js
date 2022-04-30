import { Container } from "@chakra-ui/react";
import Nav from "../src/components/shared/Nav";
import Footer from "../src/components/shared/Footer";
import { LoginForm } from "../src/components/Login/LoginForm";

export default function Login() {
	return (
		<Container>
			<Nav />
			<LoginForm />
			<Footer />
		</Container>
	)
}