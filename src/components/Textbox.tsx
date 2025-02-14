import TextField from "@mui/material/TextField";

function Textbox() {
    return (
        <TextField
            variant="filled"
            label="Name"
            color="secondary"
            fullWidth
            size="small"
            sx={{
                input: { color: "primary.contrastText" },
                backgroundColor: "secondary.main",
                "& .MuiFormLabel-root": {
                    color: "primary.contrastText",
                },
            }}
        />
    );
}

export default Textbox;
