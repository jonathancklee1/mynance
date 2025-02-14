import { Box, Button, Container, Paper, Stack } from "@mui/material";
import NavBar from "../components/NavBar";
import Typography from "@mui/material/Typography";
import Textbox from "../components/Textbox";

function Landing() {
    return (
        <Container
            sx={{
                height: "100vh",
                p: 0,
                backgroundColor: "primary.main",
                color: "primary.contrastText",
            }}
        >
            <NavBar></NavBar>
            <Container
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
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
                <Box width={"100%"} marginBottom={12}>
                    <Typography
                        variant="h4"
                        component={"h2"}
                        fontWeight={"bold"}
                        textAlign={"center"}
                        marginBottom={3}
                    >
                        Enter your name
                    </Typography>
                    <Textbox />
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
                        <Paper>Paper 1</Paper>
                        <Paper>Paper 2</Paper>
                        <Paper>Item 3</Paper>
                    </Stack>
                </Box>
                <Button variant="contained" color="secondary">
                    Go to Dashboard
                </Button>
            </Container>
        </Container>
    );
}

export default Landing;
