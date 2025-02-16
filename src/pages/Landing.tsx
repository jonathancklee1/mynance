import { Box, Button, Container, Stack, styled } from "@mui/material";
import NavBar from "../components/NavBar";
import Typography from "@mui/material/Typography";
import Textbox from "../components/Textbox";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Link } from "react-router";

function Landing() {
    const [name, setName] = useState("");
    const [themeSelected, setThemeSelected] = useState("");
    const [height, setHeight] = useState(0);

    console.log(themeSelected);
    const ThemeButton = styled(Button)(() => {
        return {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "transparent",
        };
    });
    const componentRef = useRef(null);
    useEffect(() => {
        const height = componentRef.current.offsetHeight;
        console.log(height);
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
                    paddingBlock: 10,
                    backgroundColor: "primary.main",
                }}
            >
                <Typography
                    variant="h3"
                    component={"h1"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                    marginBottom={10}
                >
                    Welcome to MYNANCE!
                </Typography>
                <Box
                    width={"100%"}
                    marginBottom={12}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                >
                    <Typography
                        variant="h4"
                        component={"h2"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                        marginBottom={3}
                    >
                        Enter your name
                    </Typography>
                    <Textbox
                        onChange={(e: {
                            target: { value: SetStateAction<string> };
                        }) => {
                            setName(e.target.value);
                            console.log(e.target.value);
                        }}
                        value={name}
                    />
                </Box>
                <Box width={"100%"} marginBottom={12}>
                    <Typography
                        variant="h4"
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
                        <ThemeButton onClick={() => setThemeSelected("theme1")}>
                            <Box
                                width={32}
                                height={32}
                                bgcolor={"white"}
                                borderRadius={"100%"}
                                marginBottom={2}
                            ></Box>
                            <Typography variant="body1" fontWeight={"bold"}>
                                Theme 1
                            </Typography>
                        </ThemeButton>
                        <ThemeButton onClick={() => setThemeSelected("theme2")}>
                            <Box
                                width={32}
                                height={32}
                                bgcolor={"white"}
                                borderRadius={"100%"}
                                marginBottom={2}
                            ></Box>
                            <Typography variant="body1" fontWeight={"bold"}>
                                Theme 2
                            </Typography>
                        </ThemeButton>
                        <ThemeButton onClick={() => setThemeSelected("theme3")}>
                            <Box
                                width={32}
                                height={32}
                                bgcolor={"white"}
                                borderRadius={"100%"}
                                marginBottom={2}
                            ></Box>
                            <Typography variant="body1" fontWeight={"bold"}>
                                Theme 3
                            </Typography>
                        </ThemeButton>
                    </Stack>
                </Box>
                <Link to={"/dashboard"}>
                    <Button variant="contained" color="secondary">
                        Go to Dashboard
                    </Button>
                </Link>
            </Container>
        </Container>
    );
}

export default Landing;
