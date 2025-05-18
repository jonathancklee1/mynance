import {
    Autocomplete,
    Box,
    List,
    ListItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import useInvestmentStore from "../../stores/InvestmentStore";
import { useEffect, useState } from "react";
import { investmentItem, HoldingsItem } from "../types/interfaces";
import useConvertToDollar from "../../hooks/useConvertToDollar";
import useApi from "../../hooks/useApi";
import useGetPercentColour from "../../hooks/useGetPercentColour";

function StocksBlock() {
    const { investments, getHoldings } = useInvestmentStore();
    const [filterValue, setFilterValue] = useState<string>("");
    const filteredInvestments = getHoldings().filter(
        (investment: HoldingsItem) => {
            if (!filterValue) return true;
            return (
                investment.ticker?.toLowerCase() === filterValue.toLowerCase()
            );
        }
    );

    const mappedHoldings = investments.map(
        (investment: investmentItem) => investment.ticker
    );
    const filteredHoldings = [...new Set(mappedHoldings)];
    return (
        <>
            <Autocomplete
                disablePortal
                fullWidth
                options={filteredHoldings}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Stocks"
                        sx={{
                            borderRadius: 7,
                            backgroundColor: "secondary.main",
                        }}
                    />
                )}
                onChange={(_, value) => setFilterValue(value as string)}
                sx={{
                    mb: 2,
                    "& .MuiAutocomplete-root": {
                        backgroundColor: "secondary.main !important",
                        scale: 1.5 + " !important",
                    },
                    "& label": {
                        color: "text.secondary",
                    },
                }}
            />
            {filteredInvestments.length === 0 && (
                <Typography
                    sx={{
                        height: "100%",
                    }}
                >
                    No holdings found
                </Typography>
            )}
            <List
                sx={{
                    width: "100%",
                    maxHeight: 420,
                    overflowY: "auto",
                    flexGrow: 1,
                }}
            >
                {filteredInvestments.map((investment, index: number) => {
                    return (
                        <HoldingItem
                            investment={investment}
                            index={index}
                            key={index}
                        />
                    );
                })}
            </List>
        </>
    );
}

function HoldingItem({
    investment,
    index,
}: {
    investment: HoldingsItem;
    index: number;
}) {
    const { setStocksCurrentValueObj } = useInvestmentStore();
    const endpoint = `https://finnhub.io/api/v1/quote?symbol=${investment.ticker}`;
    const { data, isPending } = useApi(endpoint, investment.ticker);
    const currentPrice = data?.c;
    const currentValue = useConvertToDollar(investment.amount * currentPrice);
    const [previousPrice, setPreviousPrice] = useState<number | null>(null);

    useEffect(() => {
        if (currentPrice !== previousPrice) {
            setStocksCurrentValueObj({
                [investment.ticker]: currentPrice,
            });
            setPreviousPrice(currentPrice);
        }
    }, [
        investment,
        data,
        setStocksCurrentValueObj,
        currentPrice,
        isPending,
        previousPrice,
    ]);

    const netValue = Number(currentValue) - investment.value;
    function getPercentChange(oldValue: number, currentValue: number) {
        return ((currentValue - oldValue) / oldValue) * 100;
    }
    return (
        <ListItem
            key={index}
            sx={{
                display: "flex",
                flexDirection: "column",

                width: "100%",
                py: 2,
                borderBottom: "2px solid",
                borderColor: "primary.light",
            }}
        >
            <Typography
                sx={{
                    fontWeight: "bold",
                    fontSize: 22,
                    mb: 2,
                }}
            >
                {investment.ticker}
            </Typography>{" "}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                <Stack gap={2} sx={{ width: "100%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                        }}
                    >
                        <Typography>
                            <em> {investment.amount} </em>shares
                        </Typography>
                        <Typography>
                            @ ${useConvertToDollar(investment.avgCost)} avg
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <Typography>Profit/Loss</Typography>
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: 20,
                                color:
                                    netValue > 0
                                        ? "success.main"
                                        : "error.main",
                            }}
                        >
                            {netValue > 0 ? "+" : ""}$
                            {useConvertToDollar(netValue)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography>Cost</Typography>
                        <Typography>${investment.value}</Typography>
                    </Box>
                </Stack>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography>Value</Typography>
                    <Typography sx={{ fontWeight: "bold", fontSize: 22 }}>
                        ${currentValue}
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: 22,
                            color: useGetPercentColour(netValue),
                        }}
                    >
                        {getPercentChange(
                            investment.value,
                            Number(currentValue)
                        ) > 0 && "+"}
                        {getPercentChange(
                            investment.value,
                            Number(currentValue)
                        ).toFixed(2)}
                        %
                    </Typography>
                </Box>
            </Box>
        </ListItem>
    );
}
export default StocksBlock;
