import Head from 'next/head'
import { Nav } from '../src/components/Nav'

export default function Home() {
	return (
		<>
			<Head>
				<title>Tourny</title>
			</Head>
			<Nav />
		</>
	)
}
