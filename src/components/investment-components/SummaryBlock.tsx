import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import useInvestmentStore from "../../stores/InvestmentStore";

function SummaryBlock() {
    const [isPositive, setIsPositive] = useState(true);
    const { getTotalCost } = useInvestmentStore();
    const investedValueObj = JSON.parse(
        localStorage.getItem("stocksCurrentValueObj") ?? "{}"
    );
    const totalInvestedValue: number = Object.values(investedValueObj).reduce(
        (acc, value) => Number(acc) + Number(value),
        0
    );
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: 34 }}>
                ${totalInvestedValue}
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
                        color: isPositive ? "success.main" : "error.main",
                    }}
                >
                    {isPositive ? "+" : "-"}$
                    {(totalInvestedValue - getTotalCost()).toFixed(2)}({" "}
                    {isPositive ? "+" : "-"}
                    {(
                        ((totalInvestedValue - getTotalCost()) /
                            getTotalCost()) *
                        100
                    ).toFixed(2)}
                    %)
                </Typography>
            </Box>
        </Box>
    );
}

export default SummaryBlock;
