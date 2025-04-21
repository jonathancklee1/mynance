import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import BuildIcon from "@mui/icons-material/Build";
function Card({
    children,
    isEditable,
    cardHeader,
}: {
    children: React.ReactNode;
    isEditable?: boolean;
    cardHeader: string;
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
                "&:hover": {
                    "& >svg": {
                        scale: 1.25,
                    },
                },
                cursor: isEditable ? "pointer" : "default",
            }}
        >
            <Typography
                variant="h5"
                color={"primary.contrastText"}
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    "@media (min-width: 1024px)": {
                        fontSize: 28,
                    },
                }}
                marginBottom={2}
            >
                {cardHeader}
            </Typography>
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                {children}
            </Box>
            {isEditable && (
                <BuildIcon
                    sx={{
                        fontSize: 20,
                        color: "secondary.contrastText",
                        position: "absolute",
                        top: 20,
                        right: 20,
                        transition: "all 100ms ease-in-out",
                    }}
                />
            )}
        </Paper>
    );
}

export default Card;
