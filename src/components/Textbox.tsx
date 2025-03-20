import TextField, {
    FilledTextFieldProps,
    OutlinedTextFieldProps,
    StandardTextFieldProps,
    TextFieldVariants,
} from "@mui/material/TextField";
import { JSX } from "react/jsx-runtime";

function Textbox(
    props: JSX.IntrinsicAttributes & {
        variant?: TextFieldVariants | undefined;
        label?: string;
        colourVariant: "secondary" | "primary";
    } & Omit<
            | FilledTextFieldProps
            | OutlinedTextFieldProps
            | StandardTextFieldProps,
            "variant"
        >
) {
    {
        return props.colourVariant === "secondary" ? (
            <TextField
                {...props}
                id="filled-basic"
                variant="filled"
                label={props.label}
                color="secondary"
                fullWidth
                size="small"
                sx={{
                    input: { color: "text.primary", fontSize: 24 },
                    backgroundColor: "secondary.main",
                }}
            />
        ) : (
            <TextField
                {...props}
                label={props.label}
                fullWidth
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    cursor: "pointer",
                }}
            />
        );
    }
}

export default Textbox;
