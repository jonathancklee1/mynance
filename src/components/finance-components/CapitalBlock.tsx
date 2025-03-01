import { TextField, Typography } from "@mui/material";
import EditModal from "../EditModal";
import { useState } from "react";

function CapitalBlock() {
    const [open, setOpen] = useState(false);
    const [capital, setCapital] = useState("30000");
    return (
        <>
            <Typography
                variant="h3"
                color={"secondary.contrastText"}
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    cursor: "pointer",
                }}
                onClick={() => setOpen(true)}
            >
                {"$" +
                    (!Number.isNaN(parseInt(capital))
                        ? parseInt(capital)
                              .toFixed(2)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                        : "0.00")}
            </Typography>
            <EditModal open={open} setOpen={setOpen}>
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
            <TextField
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    cursor: "pointer",
                }}
                fullWidth
                type="number"
                placeholder="Enter your capital"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
            ></TextField>
        </>
    );
}
export default CapitalBlock;
