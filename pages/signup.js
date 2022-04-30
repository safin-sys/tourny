import { Container } from "@chakra-ui/react";
import Nav from "../src/components/shared/Nav";
import Footer from "../src/components/shared/Footer";
import { SignupForm } from "../src/components/SignUp/SignupForm";

export default function Signup() {
	return (
		<Container>
			<Nav />
			<SignupForm />
			<Footer />
		</Container>
	)
}