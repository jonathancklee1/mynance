import BottomNav from "../components/BottomNav";
import NavBar from "../components/NavBar";
import { Box } from "@mui/material";
import Card from "../components/Card";
import SummaryBlock from "../components/investment-components/SummaryBlock";
import PortfolioPieBlock from "../components/investment-components/PortfolioPieBlock";
import StocksBlock from "../components/investment-components/StocksBlock";
import MoversBlock from "../components/investment-components/MoversBlock";
import InvestmentTableBlock from "../components/investment-components/InvestmentTableBlock";

function Investments() {
    const gridItemClasses = {
        gridColumn: "span 12",
        gridRow: "span 1",
        "@media (min-width: 1024px)": {
            gridColumn: "span 4",
            gridRow: "span 3",
            gridRowStart: 1,
        },
    };
    return (
        <>
            <NavBar></NavBar>
            <Box
                sx={{
                    px: 2,
                    py: 2,
                    backgroundColor: "primary.main",
                    paddingBottom: 10,
                    gridTemplateRows: "auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gap: 2,
                    marginBottom: 10,

                    "@media (min-width: 1024px)": {
                        gridTemplateRows: "span 3 auto",
                        gap: 4,
                        px: 8,
                        py: 4,
                    },
                }}
            >
                <Box
                    sx={{
                        ...gridItemClasses,
                        "@media (min-width: 1024px)": {
                            gridColumn: "span 12",
                        },
                    }}
                >
                    <Card cardHeader="My Investment Summary">
                        <SummaryBlock></SummaryBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        ...gridItemClasses,
                        "@media (min-width: 1024px)": {
                            gridColumn: "span 4",
                        },
                    }}
                >
                    <Card cardHeader="My Portfolio">
                        <PortfolioPieBlock></PortfolioPieBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        ...gridItemClasses,
                        "@media (min-width: 1024px)": {
                            gridColumn: "span 4",
                        },
                    }}
                >
                    <Card cardHeader="My Holdings">
                        <StocksBlock />
                    </Card>
                </Box>
                <Box
                    sx={{
                        ...gridItemClasses,
                        "@media (min-width: 1024px)": {
                            gridColumn: "span 4",
                        },
                    }}
                >
                    <Card isEditable cardHeader="My Daily Movers">
                        <MoversBlock isEditable></MoversBlock>
                    </Card>
                </Box>
                <Box sx={{ gridColumn: "span 12" }}>
                    <InvestmentTableBlock></InvestmentTableBlock>
                </Box>
            </Box>
            <BottomNav></BottomNav>
        </>
    );
}

export default Investments;
