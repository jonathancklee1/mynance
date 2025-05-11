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
import { useEffect, useState } from "react";
import EditModal from "../EditModal";
import { AddCircleOutline } from "@mui/icons-material";
import useGetPercentColour from "../../hooks/useGetPercentColour";

function MoversBlock({ isEditable }: { isEditable?: boolean }) {
    const [moverTickers, setMoverTickers] = useState<string[]>(
        localStorage.getItem("daily-movers")
            ? JSON.parse(localStorage.getItem("daily-movers") ?? "")
            : []
    );
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
                sx={{
                    width: "100%",
                    height: "100%",
                }}
                onClick={handleOpen}
            >
                {moverTickers.length < 1 && (
                    <Typography sx={{ textAlign: "center", my: "auto" }}>
                        No Movers Selected
                    </Typography>
                )}
                {moverTickers.length > 0 && (
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
                )}
            </Stack>
            {isEditable && (
                <EditModal open={open} setClose={handleClose}>
                    <EditMoversBlock
                        moverTickers={moverTickers}
                        setMoverTickers={setMoverTickers}
                    ></EditMoversBlock>
                </EditModal>
            )}
        </>
    );
}

function MoversItem({ ticker }: { ticker: string }) {
    const endpoint = `https://finnhub.io/api/v1/quote?symbol=${ticker}`;
    const { data } = useApi(endpoint, ticker);
    let symbol: string = "No Stock Selected";
    let closePrice: number = 0;
    let openPrice: number = 0;
    if (data) {
        symbol = ticker;
        closePrice = data.c;
        openPrice = data.o;
    }
    const percent = useGetPercentMove(openPrice, closePrice);
    console.log(percent);
    return (
        <Box
            sx={{
                p: 4,
                backgroundColor: "primary.main",
                borderRadius: 4,
                width: "100%",
                height: "100%",
            }}
        >
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
                        color: useGetPercentColour(
                            Number(percent.split("%")[0])
                        ),
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
        localStorage.setItem("daily-movers", JSON.stringify(moverTickers));
    };

    function handleAddTicker(ticker: string) {
        if (moverTickers.includes(ticker.toUpperCase())) return;
        if (moverTickers.length >= 3) {
            setIsError(true);
            return;
        } else {
            setIsError(false);
            console.log(ticker);
            setMoverTickers((prev: string[]) => [
                ...prev,
                ticker.toUpperCase(),
            ]);
        }
    }
    useEffect(() => {
        localStorage.setItem("daily-movers", JSON.stringify(moverTickers));
    }, [moverTickers]);
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
                    textAlign: "center",
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
                    backgroundColor: "secondary.main",
                    color: "primary.light",
                }}
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const tickerInput = event.currentTarget
                        .elements[0] as HTMLInputElement;
                    handleAddTicker(tickerInput.value);
                }}
            >
                <InputBase
                    sx={{
                        ml: 1,
                        flex: 1,
                        backgroundColor: "secondary.main",
                        color: "text.secondary",
                    }}
                    placeholder="Add Tickers"
                />
                <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    aria-label="search"
                >
                    <AddCircleOutline sx={{ color: "primary.light" }} />
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
            <Box
                sx={{
                    width: "100%",
                    justifyContent: "center",
                    gap: 2,
                    display: "flex",
                    flexDirection: "column",
                    "@media (min-width: 1024px)": {
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3,
                        marginTop: 2,
                    },
                }}
            >
                {moverTickers.map((ticker) => {
                    return (
                        <Chip
                            key={ticker}
                            sx={{
                                fontWeight: "bold",
                                fontSize: 20,
                                p: 2,
                                width: "100%",
                                cursor: "pointer",
                            }}
                            label={ticker}
                            variant="outlined"
                            onDelete={() => handleDelete(ticker)}
                        ></Chip>
                    );
                })}
            </Box>
        </Box>
    );
}

export default MoversBlock;
