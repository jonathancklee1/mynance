import { Box, InputAdornment, Typography } from "@mui/material";
import EditModal from "../EditModal";
import { useState } from "react";
import Textbox from "../Textbox";
import useConvertToDollar from "../../hooks/useConvertToDollar";
import useExpenseStore from "../../stores/ExpenseStore";

function CapitalBlock({ isEditable }: { isEditable?: boolean }) {
    const [open, setOpen] = useState(false);
    const { capital, setCapital } = useExpenseStore();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box onClick={handleOpen}>
                <Typography
                    variant="h3"
                    color={"primary.light"}
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        cursor: "pointer",
                    }}
                >
                    {"$" + useConvertToDollar(capital)}
                </Typography>
            </Box>
            {isEditable && (
                <EditModal open={open} setClose={handleClose}>
                    <EditCapitalBlock
                        capital={capital}
                        setCapital={setCapital}
                    ></EditCapitalBlock>
                </EditModal>
            )}
        </>
    );
}
function EditCapitalBlock({
    capital,
    setCapital,
}: {
    capital: number;
    setCapital: (newCapital: number) => void;
}) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const capitalValue = e.target.value;
        if (!e.target.value || isNaN(parseInt(capitalValue))) setCapital(0);
        setCapital(parseInt(capitalValue));
    }
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
                Edit your capital
            </Typography>
            <Textbox
                colourVariant="secondary"
                type="number"
                placeholder="Enter your capital"
                value={capital}
                onChange={handleChange}
                fullWidth
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                        ),
                    },
                }}
            ></Textbox>
        </>
    );
}
export default CapitalBlock;
