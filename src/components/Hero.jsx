import { AspectRatio, Box, Grid, Heading, Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/image";
import getChampionImageURL from "../libs/getChampionImageURL";

const Hero = ({ info }) => {
	return (
		<Grid templateColumns={["1fr", "1fr", "1fr 1fr 1fr"]} gap="0 1rem" pos="relative">
			<Box alignSelf={["flex-end", "center"]} justifySelf={["auto", "right"]} textAlign="right" lineHeight="4rem" pos={["absolute", "absolute", "static"]} zIndex="1" ml={["1rem", "1rem", "0"]}>
				<Text fontSize="1.5rem" display={["none", "block"]}>MVP of the week</Text>
				<Heading fontFamily="pacifico">{info.playerName}</Heading>
				<Text fontSize="1.5rem" display="inline-block">went</Text>
				<Text fontFamily="Pacifico, cursive" fontSize="2.25rem" ml="1rem" fontWeight="normal" display="inline-block">
					{info.playerScore}
				</Text>
			</Box>
			<AspectRatio ratio={331 / 500}>
				<Image
					src={getChampionImageURL(info.champion)}
					objectFit="cover"
					objectPosition="60% 0%"
					w="350px"
					h="500px"
					borderRadius="lg"
				/>
			</AspectRatio>
			<Text fontWeight="bold" alignSelf="flex-end" justifySelf={["right", "right", "auto"]} mr={["1rem", "1rem", "0"]} fontStyle="italic" mb="1rem" pos={["absolute", "absolute", "static"]}>{info.date} <br /> {info.team1} <br /> vs <br /> {info.team2}</Text>
		</Grid>
	);
};

export default Hero;