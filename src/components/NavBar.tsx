import { Box, Toolbar, Typography } from "@mui/material";
import { forwardRef } from "react";

const NavBar = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <Toolbar
            ref={ref}
            component={"nav"}
            sx={{
                backgroundColor: "primary.main",
                "@media (min-width: 0px)": {
                    paddingRight: 3,
                    paddingLeft: 3,
                    paddingBlock: 3,
                },
                "@media (min-width: 769px)": {
                    px: 8,
                    py: 4,
                },
                color: "primary.contrastText",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                MYNANCE
            </Typography>
            <Box
                borderRadius={"100%"}
                bgcolor={"white"}
                height={24}
                width={24}
            ></Box>
        </Toolbar>
    );
});

export default NavBar;
