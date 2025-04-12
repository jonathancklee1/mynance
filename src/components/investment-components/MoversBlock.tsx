import {
    Autocomplete,
    Box,
    Chip,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import useApi from "../../hooks/useApi";
import useConvertToDollar from "../../hooks/useConvertToDollar";
import useGetPercentMove from "../../hooks/useGetPercentMove";
import { useState } from "react";
import EditModal from "../EditModal";
function MoversBlock() {
    const [moverTickers, setMoverTickers] = useState<string[]>([
        "AAPL",
        "MSFT",
        "GOOG",
    ]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Stack
                sx={{ width: "100%", height: "100%" }}
                spacing={2}
                onClick={handleOpen}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        justifyContent: "space-between",
                    }}
                >
                    {moverTickers.map((ticker, index) => {
                        return <MoversItem key={index} ticker={ticker} />;
                    })}
                </Box>
            </Stack>
            <EditModal open={open} setClose={handleClose}>
                <EditMoversBlock
                    moverTickers={moverTickers}
                    setMoverTickers={setMoverTickers}
                ></EditMoversBlock>
            </EditModal>
        </>
    );
}

function MoversItem({ ticker }: { ticker: string }) {
    const endpoint = `https://api.polygon.io/v1/open-close/${ticker}/2024-01-09?`;
    const { data, isError, error } = useApi(endpoint, ticker);
    let symbol: string = "No Stock Selected";
    let closePrice: number = 0;
    let openPrice: number = 0;
    if (data) {
        symbol = data.symbol;
        closePrice = data.close;
        openPrice = data.open;
    }
    console.error(isError, error);
    return (
        <Box sx={{ p: 4, backgroundColor: "primary.main", borderRadius: 4 }}>
            <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                {symbol}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography>
                        Opened @ ${useConvertToDollar(openPrice)}
                    </Typography>
                    <Typography>
                        Closed @ ${useConvertToDollar(closePrice)}
                    </Typography>
                </Box>
                <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
                    {useGetPercentMove(openPrice, closePrice)}
                </Typography>
            </Box>
        </Box>
    );
}
function EditMoversBlock({
    moverTickers,
    setMoverTickers,
}: {
    moverTickers: string[];
    setMoverTickers: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const handleDelete = (ticker: string) => {
        setMoverTickers((prev: string[]) => {
            return prev.filter((item) => item !== ticker);
        });
    };
    const endpoint = `https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&order=asc&limit=1000&sort=ticker&`;
    const { data, isError, error } = useApi(endpoint, "allTickers");
    console.log(data);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
            }}
        >
            <Typography
                sx={{
                    fontWeight: "bold",
                    fontSize: 20,
                    p: 2,
                }}
            >
                Select your Daily Movers
            </Typography>
            <Autocomplete
                disablePortal
                options={data?.results?.map((item) => item.ticker) ?? []}
                sx={{
                    width: "100%",
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Movie"
                        sx={{
                            backgroundColor: "primary.main",
                        }}
                    />
                )}
            />
            <Stack
                direction="column"
                spacing={2}
                sx={{ width: "100%", justifyContent: "center" }}
            >
                {moverTickers.map((ticker) => {
                    return (
                        <Chip
                            key={ticker}
                            sx={{ fontWeight: "bold", fontSize: 20, p: 2 }}
                            label={ticker}
                            variant="outlined"
                            onDelete={() => handleDelete(ticker)}
                        ></Chip>
                    );
                })}
            </Stack>
        </Box>
    );
}

export default MoversBlock;
