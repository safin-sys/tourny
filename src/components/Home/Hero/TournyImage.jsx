import Image from "next/image";
import { useState } from "react";
import getChampionImageUrl from "../../../utils/getChampionImageUrl";

const TournyImage = ({ championName, skinID, objectPosition }) => {
    const [loading, setLoading] = useState(true);
    return (
        <Image
            priority
            src={getChampionImageUrl(championName, skinID)}
            alt={championName}
            fill
            sizes="100%"
            onLoadingComplete={() => setLoading(false)}
            style={{
                filter: loading ? "grayscale(50%) blur(5px)" : "none",
                transform: loading ? "scale(1.1)" : "scale(1)",
                transition: "all 0.7s",
                objectFit: "cover",
                objectPosition: objectPosition || "center",
            }}
        />
    );
};

export default TournyImage;
