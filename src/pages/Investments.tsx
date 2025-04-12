import BottomNav from "../components/BottomNav";
import NavBar from "../components/NavBar";
import { Box, Typography } from "@mui/material";
import Card from "../components/Card";
import SummaryBlock from "../components/investment-components/SummaryBlock";
import PortfolioPieBlock from "../components/investment-components/PortfolioPieBlock";
import StocksBlock from "../components/investment-components/StocksBlock";
import MoversBlock from "../components/investment-components/MoversBlock";

function Investments() {
    return (
        <>
            <NavBar></NavBar>
            <Box
                sx={{
                    px: 2,
                    py: 2,
                    backgroundColor: "primary.main",
                    paddingBottom: 8,
                    gridTemplateRows: "auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gap: 2,
                    marginBottom: 8,
                    "@media (min-width: 1024px)": {
                        gridTemplateRows: "span 3 auto",
                        gap: 4,
                        px: 4,
                        py: 6,
                    },
                }}
            >
                <Box
                    sx={{
                        gridColumn: "span 12",
                        gridRow: "span 1",
                        "@media (min-width: 1024px)": {
                            gridColumn: "span 4",
                            gridRow: "span 3",
                            gridRowStart: 1,
                        },
                    }}
                >
                    <Card isEditable>
                        <Typography
                            variant="h5"
                            color={"primary.contrastText"}
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                            marginBottom={2}
                        >
                            My Investment Summary
                        </Typography>
                        <SummaryBlock></SummaryBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        gridRow: "span 1",
                        "@media (min-width: 1024px)": {
                            gridColumn: "span 4",
                            gridRow: "span 3",
                            gridRowStart: 1,
                        },
                    }}
                >
                    <Card isEditable>
                        <Typography
                            variant="h5"
                            color={"primary.contrastText"}
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                            marginBottom={2}
                        >
                            My Portfolio
                        </Typography>
                        <PortfolioPieBlock></PortfolioPieBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        gridRow: "span 1",
                        "@media (min-width: 1024px)": {
                            gridColumn: "span 4",
                            gridRow: "span 3",
                            gridRowStart: 1,
                        },
                    }}
                >
                    <Card isEditable>
                        <Typography
                            variant="h5"
                            color={"primary.contrastText"}
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                            marginBottom={2}
                        >
                            My Holdings
                        </Typography>
                        <StocksBlock></StocksBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        gridRow: "span 1",
                        "@media (min-width: 1024px)": {
                            gridColumn: "span 4",
                            gridRow: "span 3",
                            gridRowStart: 1,
                        },
                    }}
                >
                    <Card isEditable>
                        <Typography
                            variant="h5"
                            color={"primary.contrastText"}
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                            marginBottom={2}
                        >
                            My Daily Movers
                        </Typography>
                        <MoversBlock></MoversBlock>
                    </Card>
                </Box>
            </Box>
            <BottomNav></BottomNav>
        </>
    );
}

export default Investments;
