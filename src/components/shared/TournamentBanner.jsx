import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import getChampionImageUrl from "../../utils/getChampionImageUrl";

const TournamentBanner = ({ championName, skinID, objectPosition }) => {
    const [loading, setLoading] = useState(true);
    return (
        <Box>
            <Image
                src={getChampionImageUrl(championName, skinID)}
                alt={championName}
                objectFit="cover"
                layout="fill"
                onLoadingComplete={() => setLoading(false)}
                objectPosition={objectPosition ? objectPosition : "center"}
                style={{
                    filter: loading ? "grayscale(50%) blur(5px)" : "none",
                    transform: loading ? "scale(1.1)" : "scale(1)",
                    transition: "all 0.7s",
                }}
            />
        </Box>
    );
};

export default TournamentBanner;
