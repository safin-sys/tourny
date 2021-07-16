import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import { Nav } from '../src/components/Nav'
import { Footer } from '../src/components/Footer'

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Nav />
			<Component {...pageProps} />
			<Footer />
		</ChakraProvider>
	)
}

export default MyApp
