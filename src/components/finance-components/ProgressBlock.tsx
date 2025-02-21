import { Box, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

function ProgressBlock() {
    return (
        <Box sx={{ width: "100%" }}>
            <Typography
                variant="body1"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 2,
                }}
            >
                You have{" "}
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: "bold",
                        display: "inline-block",
                        color: "primary.main",
                    }}
                >
                    $400
                </Typography>{" "}
                left out of your $700 total expense budget
            </Typography>
            <ProgressBarWithLabel></ProgressBarWithLabel>
            {/* <LinearProgress variant="determinate" value={80} /> */}
        </Box>
    );
}

function ProgressBarWithLabel() {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 2,
                marginBottom: 1,
            }}
        >
            <LinearProgress
                variant="determinate"
                value={80}
                sx={{
                    flex: 1,
                    "&.MuiLinearProgress-root": {
                        background: "#FFF",
                        height: 8,
                        borderRadius: 5,
                    },
                    "& .MuiLinearProgress-bar": {
                        borderRadius: 5,
                    },
                }}
                color="primary"
            />
            <Typography variant="body1">80%</Typography>
        </Box>
    );
}
export default ProgressBlock;
