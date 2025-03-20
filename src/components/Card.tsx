import { Paper } from "@mui/material";
import React from "react";
import BuildIcon from "@mui/icons-material/Build";
function Card({
    children,
    isEditable,
}: {
    children: React.ReactNode;
    isEditable?: boolean;
}) {
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
                height: "100%",
            }}
        >
            {children}
            {isEditable && (
                <BuildIcon
                    sx={{
                        fontSize: 20,
                        color: "secondary.contrastText",
                        position: "absolute",
                        top: 20,
                        right: 20,
                    }}
                />
            )}
        </Paper>
    );
}

export default Card;
