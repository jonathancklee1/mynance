import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { PieChartData } from "../types/interfaces";
import useInvestmentStore from "../../stores/InvestmentStore";

function PortfolioPieBlock() {
    const { getHoldings } = useInvestmentStore();
    const investedValueObj = JSON.parse(
        localStorage.getItem("stocksCurrentValueObj") ?? "{}"
    );

    const randColour = () => {
        return (
            "#" +
            ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
        );
    };
    const investmentPieData = getHoldings().map((item) => {
        const stockValue = investedValueObj[item.ticker] * item.amount;
        return {
            id: crypto.randomUUID(),
            label: item.ticker,
            value: stockValue,
            color: randColour(),
        };
    });
    return (
        <>
            <PieChart
                series={[
                    {
                        data: investmentPieData,
                        cx: 150,
                        cy: 100,
                        valueFormatter: (params) => {
                            const percent = params.value / 100;
                            return `${(percent * 100).toFixed(0)}%`;
                        },
                    },
                ]}
                sx={{
                    "@media (min-width: 1024px)": { scale: "1.3" },
                    "& text": { textAnchor: "start" },
                }}
                width={300}
                height={200}
                slotProps={{
                    legend: { hidden: true },
                    popper: {
                        sx: {
                            "& .MuiChartsTooltip-paper": {
                                backgroundColor: "primary.main",
                                fontFamily: "Helvetica, Arial, sans-serif",
                            },
                        },
                    },
                }}
                margin={{ bottom: 40 }}
            />
            <Box style={{ width: "100%" }}>
                <Stack
                    spacing={2}
                    display={"flex"}
                    sx={{
                        maxHeight: 200,
                        overflow: "auto",
                        paddingRight: 1,
                        "&::-webkit-scrollbar": {
                            backgroundColor: "primary.light",
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "primary.light",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            borderRadius: "6px",
                            boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
                            backgroundColor: "primary.main",
                        },
                    }}
                >
                    {investmentPieData.map((asset: PieChartData) => (
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            gap={2}
                            key={asset.id}
                        >
                            <Box
                                borderRadius={"100%"}
                                width={20}
                                height={20}
                                bgcolor={asset.color}
                            ></Box>
                            <Typography
                                variant="body2"
                                color={"secondary.contrastText"}
                                flexGrow={1}
                            >
                                {asset.label}
                            </Typography>
                            <Typography variant="body1">
                                ${asset.value}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </>
    );
}

export default PortfolioPieBlock;
