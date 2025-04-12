function useGetPercentMove(open: number, close: number) {
    return (
        (((Number(close) - Number(open)) / Number(open)) * 100).toFixed(2) + "%"
    );
}

export default useGetPercentMove;
