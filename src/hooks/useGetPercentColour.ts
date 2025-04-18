function useGetPercentColour(percent: number) {
    if (percent > 0) return "success.main";
    if (percent < 0) return "error.main";
    return "white";
}
export default useGetPercentColour;
