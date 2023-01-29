import axios from "axios";

const version = "13.1.1";
export const getChampions = async () => {
    try {
        const { data } = await axios(
            `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        );
        return Object.keys(data.data);
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getChampionSkins = async (champion: string | null) => {
    try {
        const { data } = await axios(
            `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${champion}.json`
        );
        return data?.data[champion]?.skins;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getChampionSplash = (champion: string, skin: string) => {
    return champion && skin
        ? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion}_${skin}.jpg`
        : "/images/404.webp";
};
