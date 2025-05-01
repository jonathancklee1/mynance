import { Box, Paper, Typography, useTheme } from "@mui/material";
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
    const theme = useTheme();
    return (
        <Paper
            sx={{
                backgroundColor: `${theme.palette.secondary.light}CC`, // 80% opacity// 80% opacity
                p: 3,
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                borderRadius: 5,
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
                        color: "primary.light",
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
