import { Box, Typography } from "@mui/material";
import React, { useState } from "react";

function SummaryBlock() {
    const [isPositive, setIsPositive] = useState(true);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 2,
                alignItems: "center",
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: 34 }}>
                $50,000
            </Typography>
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
                        fontSize: 24,
                        color: isPositive ? "success.main" : "error.main",
                    }}
                >
                    +$25,000 (+10%)
                </Typography>
            </Box>
            {/* <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    alignItems: "center",
                }}
            >
                <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                    Invested
                </Typography>
                <Typography
                    sx={{
                        fontWeight: "bold",
                        fontSize: 24,
                    }}
                >
                    $30,000
                </Typography>
            </Box> */}
        </Box>
    );
}

export default SummaryBlock;
