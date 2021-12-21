import Head from 'next/head'
import '../styles/globals.css'
import { ChakraProvider, Container } from '@chakra-ui/react'
import Nav from '../src/components/Nav'

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Head>
				<title>Tourny</title>
			</Head>
			<Container maxW="container.lg">
				<Nav />
				<Component {...pageProps} />
			</Container>
		</ChakraProvider>
	)
}

export default MyApp
