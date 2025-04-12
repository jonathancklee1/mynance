import { useQuery } from "@tanstack/react-query";

function useApi(endpoint: string, key: string) {
    const url = `${endpoint}apiKey=${import.meta.env.VITE_STOCKS_API_KEY}`;
    async function fetchApi() {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    const { isPending, isError, data, error } = useQuery({
        queryKey: [key],
        queryFn: fetchApi,
    });
    return { isPending, isError, data, error };
}

export default useApi;
