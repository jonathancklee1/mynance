export default function useGetDate() {
    const date = new Date().toDateString();
    return date;
}
