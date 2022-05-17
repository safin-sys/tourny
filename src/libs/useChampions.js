import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function useChampions() {
    const { data, error } = useSWR('/champions.json', fetcher);
    return {
        champions: data,
        isLoading: !error && !data,
        isError: error
    }
}