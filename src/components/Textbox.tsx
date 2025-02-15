import TextField from "@mui/material/TextField";

function Textbox(props: any) {
    return (
        <TextField
            {...props}
            id="filled-basic"
            variant="filled"
            label="Name"
            color="secondary"
            fullWidth
            size="small"
            sx={{
                input: { color: "text.primary", fontSize: 24 },
                backgroundColor: "secondary.main",
            }}
        />
    );
}

export default Textbox;
