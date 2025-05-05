import { Box, Button, Popper, Stack, Toolbar, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import useThemeStore from "../stores/ThemeStore";

const NavBar = forwardRef<HTMLDivElement>((_, ref) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    const { theme, setTheme } = useThemeStore();
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
                            <Typography
                                variant="body1"
                                fontWeight={"bold"}
                                sx={{
                                    color: "text.secondary",
                                }}
                            >
                                Theme 1
                            </Typography>
                        </Box>
                        <Box
                            onClick={() => {
                                setTheme("theme2");
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
                                }}
                            ></Box>
                            <Typography
                                variant="body1"
                                fontWeight={"bold"}
                                sx={{
                                    color: "text.secondary",
                                }}
                            >
                                Theme 2
                            </Typography>
                        </Box>
                        <Box
                            onClick={() => {
                                setTheme("theme3");
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
                            <Typography
                                variant="body1"
                                fontWeight={"bold"}
                                sx={{
                                    color: "text.secondary",
                                }}
                            >
                                Theme 3
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Popper>
        </Toolbar>
    );
});

export default NavBar;
