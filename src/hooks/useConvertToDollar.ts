function useConvertToDollar(value: number) {
    {
        if (!value) return "0.00";
        return value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
}

export default useConvertToDollar;
