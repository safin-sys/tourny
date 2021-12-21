import Head from 'next/head'
import '../styles/globals.css'
import { ChakraProvider, Container } from '@chakra-ui/react'
import Nav from '../src/components/Nav'

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Head>
				<title>Tourny</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
			</Head>
			<Container maxW="container.lg">
				<Nav />
				<Component {...pageProps} />
			</Container>
		</ChakraProvider>
	)
}

export default MyApp
