import { Container } from "@chakra-ui/react";
import Nav from "../../src/components/shared/Nav";
import Footer from "../../src/components/shared/Footer";
import { LoginForm } from "../../src/components/Login/LoginForm";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
	const user = useSelector((state) => state.user);
	const router = useRouter()
	useEffect(() => {
		if (user?.email) {
			router.push("/");
		}
	}, [user])
	return (
		<Container>
			<Nav />
			<LoginForm />
			<Footer />
		</Container>
	)
}