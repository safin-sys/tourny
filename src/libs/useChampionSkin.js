import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function useChampionSkin(champion) {
    const { data, error } = useSWR(champion ? `https://ddragon.leagueoflegends.com/cdn/12.8.1/data/en_US/champion/${champion}.json` : null, fetcher);
    return {
        skins: data?.data[champion]?.skins,
        isLoading: !error && !data,
        isError: error
    }
}