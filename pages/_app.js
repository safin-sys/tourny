import { ChakraProvider } from '@chakra-ui/react'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Head from 'next/head'
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { auth, db } from '../src/libs/firebase';
import { store } from '../src/redux/store';
import theme from "../src/utils/theme";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		if (!store.getState().user) {
			onAuthStateChanged(auth, user => {
				if (user) {
					const userDoc = doc(db, 'users', user.uid);
					getDoc(userDoc).then(userDoc => {
						if (userDoc.exists()) {
							store.dispatch({
								type: 'user/setUser',
								payload: {
									email: userDoc.data().email,
									displayName: userDoc.data().name,
									uid: user.uid,
									photoURL: userDoc.data().profilePicture ? userDoc.data().profilePicture : "https://ddragon.leagueoflegends.com/cdn/12.8.1/img/profileicon/0.png"
								}
							})
						} else {
							return {
								email: user.email,
								displayName: user.displayName,
								uid: user.uid,
								photoURL: user.photoURL
							}
						}
					})
				}
			})
		}
	}, [])
	return (
		<>
			<Head>
				<title>{Component.title ? Component.title : "Tourny"}</title>
				<meta name="title" content="Tourny" />
				<meta name="description" content="League of Legends tournament manager" />

				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://metatags.io/" />
				<meta property="og:title" content="Tourny" />
				<meta property="og:description" content="League of Legends tournament manager" />
				<meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://metatags.io/" />
				<meta property="twitter:title" content="Tourny" />
				<meta property="twitter:description" content="League of Legends tournament manager" />
				<meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
			</Head>
			<Provider store={store}>
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</Provider>
		</>
	)
}

export default MyApp
