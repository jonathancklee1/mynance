import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import EditModal from "../EditModal";
import { useState } from "react";
import Textbox from "../Textbox";

function CapitalBlock() {
    const [open, setOpen] = useState(false);
    const [capital, setCapital] = useState("30000");
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
                    color={"secondary.contrastText"}
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        cursor: "pointer",
                    }}
                >
                    {"$" +
                        (!Number.isNaN(parseInt(capital))
                            ? parseInt(capital)
                                  .toFixed(2)
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                            : "0.00")}
                </Typography>
            </Box>
            <EditModal open={open} setClose={handleClose}>
                <EditCapitalBlock
                    capital={capital}
                    setCapital={setCapital}
                ></EditCapitalBlock>
            </EditModal>
        </>
    );
}
function EditCapitalBlock({
    capital,
    setCapital,
}: {
    capital: string;
    setCapital: (newCapital: string) => void;
}) {
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
                Edit your capital
            </Typography>
            <Textbox
                colourVariant="primary"
                type="number"
                placeholder="Enter your capital"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
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
