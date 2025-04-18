import {
    Box,
    Chip,
    IconButton,
    InputBase,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import useApi from "../../hooks/useApi";
import useConvertToDollar from "../../hooks/useConvertToDollar";
import useGetPercentMove from "../../hooks/useGetPercentMove";
import { useState } from "react";
import EditModal from "../EditModal";
import { AddCircleOutline } from "@mui/icons-material";
import useGetPercentColour from "../../hooks/useGetPercentColour";

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
    const { data } = useApi(endpoint, ticker);
    let symbol: string = "No Stock Selected";
    let closePrice: number = 0;
    let openPrice: number = 0;
    if (data) {
        symbol = data.symbol;
        closePrice = data.close;
        openPrice = data.open;
    }
    const percent = useGetPercentMove(openPrice, closePrice);
    const percentColour = useGetPercentColour(Number(percent));
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
                <Typography
                    sx={{
                        fontWeight: "bold",
                        fontSize: 20,
                        color: { percentColour },
                    }}
                >
                    {percent}
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
    const [isError, setIsError] = useState(false);
    const handleDelete = (ticker: string) => {
        setMoverTickers((prev: string[]) => {
            return prev.filter((item) => item !== ticker);
        });
    };

    function handleAddTicker(ticker: string) {
        if (moverTickers.length >= 3) {
            setIsError(true);
            return;
        } else {
            setIsError(false);
            setMoverTickers((prev: string[]) => [
                ...prev,
                ticker.toUpperCase(),
            ]);
        }
    }
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
                Select your 3 Daily Movers
            </Typography>

            <Paper
                component="form"
                sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    borderRadius: 4,
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAddTicker(e.target[0].value);
                }}
            >
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Add Tickers" />
                <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                >
                    <AddCircleOutline color="secondary" />
                </IconButton>
            </Paper>
            {isError && (
                <Typography
                    sx={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "error.main",
                    }}
                >
                    You can only select 3 tickers
                </Typography>
            )}
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
