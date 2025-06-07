import {
    Box,
    Button,
    Typography,
    FormControl,
    InputAdornment,
    InputLabel,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import EditModal from "../EditModal";
import { useState } from "react";
import Textbox from "../Textbox";
import useExpenseStore from "../../stores/ExpenseStore";
import useGetPercentColour from "../../hooks/useGetPercentColour";

interface EditProgressBarProps {
    budget: number;
    setBudget: React.Dispatch<React.SetStateAction<number>>;
}
interface ProgressBarWithLabelProps {
    budget: number;
    expense: number;
}

function ProgressBlock({ isEditable }: { isEditable?: boolean }) {
    const { getTotalExpenses } = useExpenseStore();
    const [open, setOpen] = useState(false);
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
                        variant="body1"
                        sx={{
                            fontWeight: "bold",
                            display: "inline-block",
                            color: useGetPercentColour(
                                budget - getTotalExpenses()
                            ),

                            fontSize: 20,
                        }}
                    >
                        ${budget - getTotalExpenses()}
                    </Typography>{" "}
                    left out of your{" "}
                    <Button
                        variant="text"
                        color="primary"
                        sx={{
                            padding: 0,
                            backgroundColor: "primary.light",
                            p: 0.5,
                        }}
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
                    expense={getTotalExpenses()}
                    budget={budget}
                ></ProgressBarWithLabel>
            </Box>
            {isEditable && (
                <EditModal open={open} setClose={handleClose}>
                    <EditProgressBar
                        budget={budget}
                        setBudget={setBudget}
                    ></EditProgressBar>
                </EditModal>
            )}
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
                        background: "white",
                        border: "1px solid",
                        borderColor: "primary.dark",
                        height: 12,
                        borderRadius: 5,
                    },
                    "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                        backgroundColor: "primary.light",
                    },
                }}
            />
            <Typography variant="body1">
                {expensePercentage > 100 ? 100 : expensePercentage}%
            </Typography>
        </Box>
    );
}

function EditProgressBar({ budget, setBudget }: EditProgressBarProps) {
    return (
        <>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    cursor: "pointer",
                    marginBottom: 2,
                }}
            >
                Set Your Weekly Budget
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
                    colourVariant="secondary"
                    value={budget}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    type="number"
                />
            </FormControl>
        </>
    );
}
export default ProgressBlock;
