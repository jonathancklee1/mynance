import { Toolbar, Typography } from "@mui/material";

function NavBar() {
    return (
        <Toolbar
            component={"nav"}
            sx={{
                backgroundColor: "primary.main",
                "@media (min-width: 0px)": {
                    paddingRight: 3,
                    paddingLeft: 3,
                    paddingBlock: 3,
                },
                "@media (min-width: 769px)": {
                    paddingRight: 6,
                    paddingLeft: 6,
                    paddingBlock: 4,
                },
                color: "primary.contrastText",
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                MYNANCE
            </Typography>
        </Toolbar>
    );
}

export default NavBar;
