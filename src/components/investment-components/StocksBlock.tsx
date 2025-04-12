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
import { useState } from "react";
import { investmentItem } from "../types/interfaces";

function StocksBlock() {
    const { investments } = useInvestmentStore();
    const [filterValue, setFilterValue] = useState<string>("");
    const filteredInvestments = investments.filter(
        (investment: investmentItem) => {
            if (!filterValue) return true;
            return investment.name.toLowerCase() === filterValue.toLowerCase();
        }
    );
    return (
        <>
            <Autocomplete
                disablePortal
                fullWidth
                options={investments.map(
                    (investment: investmentItem) => investment.name
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Stocks"
                        sx={{
                            borderRadius: 7,
                            backgroundColor: "#0C0637 ",
                        }}
                    />
                )}
                onChange={(_, value) => setFilterValue(value as string)}
                sx={{
                    "& .MuiAutocomplete-root": {
                        backgroundColor: "#0C0637 !important",
                        scale: 1.5 + " !important",
                    },
                    "& label": {
                        color: "#fff !important",
                    },
                }}
            />
            <List
                sx={{
                    width: "100%",
                }}
            >
                {filteredInvestments.map(
                    (investment: investmentItem, index: number) => {
                        return (
                            <ListItem
                                key={index}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",

                                    width: "100%",
                                    py: 2,
                                    borderBottom: "2px solid #fff",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: 18,
                                        mb: 2,
                                    }}
                                >
                                    {" "}
                                    ({investment.ticker}) {investment.name}
                                </Typography>{" "}
                                <Stack gap={2} sx={{ width: "100%" }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                        }}
                                    >
                                        <Typography>
                                            {investment.amount} shares
                                        </Typography>
                                        <Typography>
                                            @ ${investment.cost} avg
                                        </Typography>
                                        <Typography>
                                            $
                                            {investment.amount *
                                                investment.cost}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <Typography>Profit/Loss</Typography>
                                        <Typography>+ $2222</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", gap: 1 }}>
                                        <Typography>Cost</Typography>
                                        <Typography>$2222</Typography>
                                        <Typography>Value</Typography>
                                        <Typography>$2342</Typography>
                                    </Box>
                                </Stack>
                                {/* Daily Movement Gains/Loss */}
                                <Stack></Stack>
                            </ListItem>
                        );
                    }
                )}
            </List>
        </>
    );
}

export default StocksBlock;
