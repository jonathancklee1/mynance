import {
    Box,
    Button,
    Typography,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import EditModal from "../EditModal";
import { useState } from "react";
import Textbox from "../Textbox";

interface EditProgressBarProps {
    budget: number;
    setBudget: React.Dispatch<React.SetStateAction<number>>;
}
interface ProgressBarWithLabelProps {
    budget: number;
    expense: number;
}

function ProgressBlock() {
    const [open, setOpen] = useState(false);
    const [expense] = useState(400);
    const [budget, setBudget] = useState(1000);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Box sx={{ width: "100%", cursor: "pointer" }} onClick={handleOpen}>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 2,
                    }}
                >
                    You have{" "}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            display: "inline-block",
                            color: "primary.main",
                        }}
                    >
                        ${expense}
                    </Typography>{" "}
                    left out of your{" "}
                    <Button
                        variant="text"
                        color="primary"
                        sx={{ padding: 0, backgroundColor: "#bb2f", p: 0.5 }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                display: "inline-block",
                                color: "primary.main",
                            }}
                        >
                            ${budget}
                        </Typography>
                    </Button>{" "}
                    total expense budget
                </Typography>
                <ProgressBarWithLabel
                    expense={expense}
                    budget={budget}
                ></ProgressBarWithLabel>
                {/* <LinearProgress variant="determinate" value={80} /> */}
            </Box>
            <EditModal open={open} setClose={handleClose}>
                <EditProgressBar
                    budget={budget}
                    setBudget={setBudget}
                ></EditProgressBar>
            </EditModal>
        </>
    );
}

function ProgressBarWithLabel({ expense, budget }: ProgressBarWithLabelProps) {
    const expensePercentage = Math.round((expense / budget) * 100);
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 2,
                marginBottom: 1,
            }}
        >
            <LinearProgress
                variant="determinate"
                value={expensePercentage > 100 ? 100 : expensePercentage}
                sx={{
                    flex: 1,
                    "&.MuiLinearProgress-root": {
                        background: "#FFF",
                        height: 8,
                        borderRadius: 5,
                    },
                    "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                    },
                }}
                color="primary"
            />
            <Typography variant="body1">{expensePercentage}%</Typography>
        </Box>
    );
}

function EditProgressBar({ budget, setBudget }: EditProgressBarProps) {
    return (
        <>
            <Typography
                variant="h5"
                color={"secondary.contrastText"}
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    cursor: "pointer",
                    marginBottom: 2,
                }}
            >
                Enter your weekly budget
            </Typography>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel
                    htmlFor="standard-adornment-amount"
                    sx={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 18,
                        "&.Mui-focused": { color: "white" },
                    }}
                >
                    Amount
                </InputLabel>
                <Textbox
                    id="standard-adornment-amount"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            ),
                        },
                    }}
                    colourVariant="primary"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    type="number"
                />
            </FormControl>
        </>
    );
}
export default ProgressBlock;
