import { Paper } from "@mui/material";
import React from "react";

function Card({ children }: { children: React.ReactNode }) {
    return (
        <Paper
            sx={{
                paddingInline: 3,
                paddingBlock: 2,
                backgroundColor: "secondary.main",
                color: "secondary.contrastText",
                borderRadius: 4,
                backdropFilter: "blur(5px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            {children}
        </Paper>
    );
}

export default Card;
