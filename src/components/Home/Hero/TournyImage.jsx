import Image from "next/image";
import { useState } from "react";
import getChampionImageUrl from "../../../utils/getChampionImageUrl";

const TournyImage = ({ championName, skinID, objectPosition }) => {
    const [loading, setLoading] = useState(true);
    return (
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
                position: "absolute",
            }}
        />
    );
};

export default TournyImage;