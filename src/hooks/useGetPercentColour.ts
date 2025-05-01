function useGetPercentColour(percent: number) {
    if (percent > 0) return "success.main";
    if (percent < 0) return "error.main";
    return "primary.light";
}
export default useGetPercentColour;
