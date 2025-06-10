import { Box, Button, Popper, Stack, Toolbar, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import useThemeStore from "../stores/ThemeStore";
import { useLocation } from "react-router";
import SignOutButton from "./SignOutButton";

const NavBar = forwardRef<HTMLDivElement>((_, ref) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    const { theme, setTheme } = useThemeStore();
    const location = useLocation();
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
                overflow: "hidden",
            }}
        >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                MYNANCE
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                    style={{
                        border: "2px solid white",
                        backgroundColor:
                            theme === "theme1"
                                ? "#FFA500"
                                : theme === "theme2"
                                ? "#ff595e"
                                : "#858ae3",
                        borderRadius: "100%",
                        height: 40,
                        width: 40,
                        minWidth: 40,
                        cursor: "pointer",
                    }}
                    aria-describedby={id}
                    type="button"
                    onClick={handleClick}
                ></Button>
                <Popper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    sx={{ zIndex: 1 }}
                    modifiers={[
                        {
                            name: "flip",
                            enabled: true,
                            options: {
                                altBoundary: true,
                                rootBoundary: "document",
                                padding: 8,
                            },
                        },
                        {
                            name: "preventOverflow",
                            enabled: true,
                            options: {
                                altAxis: true,
                                altBoundary: true,
                                tether: true,
                                rootBoundary: "document",
                                padding: 8,
                            },
                        },
                    ]}
                >
                    <Box
                        sx={{
                            p: 2,
                            bgcolor: "primary.light",
                            borderRadius: 3,
                            fontFamily: "Helvetica",
                            mt: 2,
                            mr: 2,
                        }}
                    >
                        <Stack spacing={2} direction={"row"}>
                            <Box
                                onClick={() => {
                                    setTheme("theme1");
                                }}
                                sx={{
                                    cursor: "pointer",
                                    p: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    transition: "all 0.3 ease",
                                    "&:hover": {
                                        bgcolor: "primary.main",
                                        borderRadius: 4,
                                        color: "primary.contrastText",
                                    },
                                }}
                            >
                                <Box
                                    width={50}
                                    height={50}
                                    borderRadius={"100%"}
                                    marginBottom={2}
                                    sx={{
                                        backgroundImage: `conic-gradient(#14213d 0deg, #FFA500 120deg,#48e5c2 270deg)`,
                                        cursor: "pointer",
                                    }}
                                ></Box>
                                <Typography variant="body1" fontWeight={"bold"}>
                                    Theme 1
                                </Typography>
                            </Box>
                            <Box
                                onClick={() => {
                                    setTheme("theme2");
                                }}
                                sx={{
                                    cursor: "pointer",
                                    p: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    transition: "all 0.3 ease",
                                    "&:hover": {
                                        bgcolor: "primary.main",
                                        borderRadius: 4,
                                        color: "primary.contrastText",
                                    },
                                }}
                            >
                                <Box
                                    width={50}
                                    height={50}
                                    borderRadius={"100%"}
                                    marginBottom={2}
                                    sx={{
                                        backgroundImage: `conic-gradient(#e1e5f2 0deg, #ff595e 120deg, #04052e 270deg)`,
                                        cursor: "pointer",
                                        color: "primary.contrastText",
                                    }}
                                ></Box>
                                <Typography variant="body1" fontWeight={"bold"}>
                                    Theme 2
                                </Typography>
                            </Box>
                            <Box
                                onClick={() => {
                                    setTheme("theme3");
                                }}
                                sx={{
                                    cursor: "pointer",
                                    p: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    transition: "all 0.3 ease",
                                    "&:hover": {
                                        bgcolor: "primary.main",
                                        borderRadius: 4,
                                        color: "primary.contrastText",
                                    },
                                }}
                            >
                                <Box
                                    width={50}
                                    height={50}
                                    borderRadius={"100%"}
                                    marginBottom={2}
                                    sx={{
                                        backgroundImage: `conic-gradient(#3d348b 0deg,#7dcfb6 120deg,#858ae3 270deg)`,
                                        cursor: "pointer",
                                    }}
                                ></Box>
                                <Typography variant="body1" fontWeight={"bold"}>
                                    Theme 3
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Popper>
                {location.pathname !== "/" && <SignOutButton />}
            </Box>
        </Toolbar>
    );
});

export default NavBar;
