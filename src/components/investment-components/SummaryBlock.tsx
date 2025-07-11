import { Box, Typography } from "@mui/material";
import useInvestmentStore from "../../stores/InvestmentStore";
import useGetPercentColour from "../../hooks/useGetPercentColour";
import useConvertToDollar from "../../hooks/useConvertToDollar";
import { useEffect } from "react";

function SummaryBlock() {
    const { getTotalCost, getHoldings, stocksCurrentValueObj } =
        useInvestmentStore();

    const holdings = getHoldings();
    useEffect(() => {}, [stocksCurrentValueObj]);
    const totalInvestedValue: number = holdings.reduce((acc, value) => {
        Object.keys(stocksCurrentValueObj).forEach((key) => {
            if (key === value.ticker) {
                acc += Number(stocksCurrentValueObj[key] * value.amount);
            }
        });
        return acc;
    }, 0);
    const netValue = totalInvestedValue - getTotalCost();
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: 40 }}>
                ${useConvertToDollar(totalInvestedValue)}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                    alignItems: "center",
                    mb: 2,
                    fontSize: 16,
                }}
            >
                <Typography>Invested</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                    ${getTotalCost()}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    alignItems: "center",
                }}
            >
                <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                    Gain/Loss
                </Typography>
                <Typography
                    sx={{
                        fontWeight: "bold",
                        fontSize: 22,
                        color: useGetPercentColour(netValue),
                    }}
                >
                    {netValue >= 0 && "+"}${netValue.toFixed(2)} ({" "}
                    {netValue >= 0 && "+"}
                    {netValue == 0
                        ? 0
                        : ((netValue / getTotalCost()) * 100).toFixed(2)}
                    %)
                </Typography>
            </Box>
        </Box>
    );
}

export default SummaryBlock;
