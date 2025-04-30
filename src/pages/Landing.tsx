import { Box, Button, Container, Stack, styled } from "@mui/material";
import NavBar from "../components/NavBar";
import Typography from "@mui/material/Typography";
import Textbox from "../components/Textbox";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronRight } from "@mui/icons-material";

function Landing() {
    const [name, setName] = useState("");
    const [isError, setIsError] = useState(false);
    const [themeSelected, setThemeSelected] = useState("");
    const [height, setHeight] = useState(0);
    const themes = ["dark", "light", "custom"];
    const navigate = useNavigate();
    const ThemeButton = styled(Button)(() => {
        return {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        };
    });
    const componentRef = useRef(null);
    useEffect(() => {
        const height = componentRef.current?.offsetHeight;
        setHeight(height);
    }, []);

    return (
        <Container
            sx={{
                minHeight: "100vh",
                p: 0,
                backgroundColor: "primary.main",
                color: "primary.contrastText",
            }}
        >
            <NavBar ref={componentRef}></NavBar>
            <Container
                sx={{
                    minHeight: `calc(100vh - ${height}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBlock: 4,
                    backgroundColor: "primary.main",
                }}
            >
                <Typography
                    variant="h3"
                    component={"h1"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                    marginBottom={3}
                >
                    Welcome to MYNANCE!
                </Typography>
                <Typography
                    textAlign={"center"}
                    marginBottom={3}
                    variant="h6"
                    component={"h3"}
                >
                    Take control of your financial future with Mynance—the
                    smart, intuitive web app designed to help you manage your
                    money and grow your investments with confidence. Whether
                    you're budgeting, tracking expenses, or exploring new
                    investment opportunities, Mynance simplifies the process,
                    offering powerful tools and insights tailored to your
                    financial goals. Your path to financial success starts here.
                </Typography>
                <Box
                    width={"100%"}
                    marginBottom={8}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                >
                    <Typography
                        variant="h5"
                        component={"h2"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                        marginBottom={3}
                    >
                        Enter your name
                    </Typography>
                    <Textbox
                        error={isError}
                        onChange={(e: {
                            target: { value: SetStateAction<string> };
                        }) => {
                            setName(e.target.value);
                        }}
                        value={name}
                        label={"Name"}
                        colourVariant={"secondary"}
                        type={"text"}
                        sx={{ width: "40%" }}
                    />
                </Box>
                <Box width={"100%"} marginBottom={8}>
                    <Typography
                        variant="h5"
                        component={"h2"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                        marginBottom={3}
                    >
                        Choose your theme
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {themes.map((theme) => {
                            return (
                                <ThemeButton
                                    onClick={() => setThemeSelected(theme)}
                                    sx={{
                                        width: "100px",
                                        py: 2,
                                        background:
                                            theme === themeSelected
                                                ? "secondary.main"
                                                : "transparent",
                                    }}
                                >
                                    <Box
                                        width={50}
                                        height={50}
                                        bgcolor={"white"}
                                        borderRadius={"100%"}
                                        marginBottom={2}
                                    ></Box>
                                    <Typography
                                        variant="body1"
                                        fontWeight={"bold"}
                                    >
                                        {theme}
                                    </Typography>
                                </ThemeButton>
                            );
                        })}
                    </Stack>
                </Box>
                <Button
                    color="secondary"
                    onClick={() => {
                        if (
                            !name ||
                            name === "" ||
                            !themeSelected ||
                            themeSelected === ""
                        ) {
                            setIsError(true);
                            return;
                        } else {
                            setIsError(false);
                            localStorage.setItem("name", JSON.stringify(name));
                            localStorage.setItem(
                                "theme",
                                JSON.stringify(themeSelected)
                            );

                            navigate("/dashboard");
                        }
                    }}
                    variant="outlined"
                    sx={{
                        width: "60%",
                        fontWeight: "bold",
                        px: 4,
                        py: 2,
                        fontSize: "1.1rem",
                        borderRadius: 4,
                        "&:hover": {
                            backgroundColor: "primary.main",
                        },
                    }}
                >
                    Go to Dashboard
                    <ChevronRight sx={{ ml: 1 }} />
                </Button>
                {isError && (
                    <Typography sx={{ mt: 2, fontWeight: "bold" }}>
                        Please enter your name and select a theme!{" "}
                    </Typography>
                )}
            </Container>
        </Container>
    );
}

export default Landing;
