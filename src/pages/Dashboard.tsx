import NavBar from "../components/NavBar";
import BottomNav from "../components/BottomNav";
import { Box, Typography } from "@mui/material";
import CapitalBlock from "../components/finance-components/CapitalBlock";
import Card from "../components/Card";
import SummaryBlock from "../components/investment-components/SummaryBlock";
import ExpensesBlock from "../components/finance-components/ExpensesBlock";
import ProgressBlock from "../components/finance-components/ProgressBlock";
import PortfolioPieBlock from "../components/investment-components/PortfolioPieBlock";
import ExpensePieBlock from "../components/finance-components/ExpensePieBlock";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import useExpenseStore from "../stores/ExpenseStore";
import { useStore } from "zustand";

function Dashboard() {
    const [name, setName] = useState(
        JSON.parse(localStorage.getItem("name") ?? "Unknown User")
    );
    const [_, setRerender] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setRerender(true);
        }, 1000);
    }, []);
    const currentAuth = getAuth();
    onAuthStateChanged(currentAuth, (user) => {
        if (user) {
            console.log(user, "user");
            setName(currentAuth.currentUser?.displayName);
        }
    });
    const { expenses, recurringExpenses } = useStore(useExpenseStore);
    useEffect(() => {
        if (expenses && recurringExpenses) {
            console.log("dashboard refreshed");
        }
    }, [expenses, recurringExpenses]);
    return (
        <>
            <NavBar />
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
                    marginBottom: 8,
                    "@media (min-width: 1024px)": {
                        gridTemplateRows: "span 3 auto",
                        gap: 4,
                        px: 8,
                        py: 6,
                    },
                }}
            >
                <Typography
                    sx={{
                        fontWeight: "bold",
                        fontSize: 30,
                        color: "primary.contrastText",
                        gridColumn: "span 12",
                        "@media (min-width: 1024px)": {
                            fontSize: 40,
                        },
                    }}
                >
                    Welcome{" "}
                    <Typography
                        component={"span"}
                        sx={{
                            fontWeight: "bold",
                            fontSize: 30,
                            color: "primary.light",
                            gridColumn: "span 12",
                            "@media (min-width: 1024px)": {
                                fontSize: 40,
                            },
                        }}
                    >
                        {name}
                    </Typography>
                    !
                </Typography>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        "@media (min-width: 1024px)": {
                            gridColumnStart: 1,
                            gridColumn: "span 4",
                            gridRowStart: 1,
                            gridRow: "span 2",
                        },
                    }}
                >
                    <Card cardHeader="My Capital">
                        <CapitalBlock></CapitalBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        "@media (min-width: 1024px)": {
                            gridColumnStart: 4,
                            gridColumn: "span 8",
                            gridRowStart: 1,
                            gridRow: "span 2",
                        },
                    }}
                >
                    <Card cardHeader="My Investment Summary">
                        <SummaryBlock></SummaryBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        "@media (min-width: 1024px)": {
                            gridColumnStart: 4,
                            gridColumn: "span 8",
                            gridRowStart: 1,
                            gridRow: "span 2",
                        },
                    }}
                >
                    <Card cardHeader="My Expenses">
                        <ExpensesBlock></ExpensesBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        "@media (min-width: 1024px)": {
                            gridColumnStart: 4,
                            gridColumn: "span 4",
                            gridRowStart: 1,
                            gridRow: "span 2",
                        },
                    }}
                >
                    <Card cardHeader="Expense Breakdown">
                        <ExpensePieBlock></ExpensePieBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        "@media (min-width: 1024px)": {
                            gridColumnStart: 4,
                            gridColumn: "span 4",
                            gridRowStart: 1,
                            gridRow: "span 2",
                        },
                    }}
                >
                    <Card cardHeader="My Portfolio">
                        <PortfolioPieBlock></PortfolioPieBlock>
                    </Card>
                </Box>
                <Box
                    sx={{
                        gridColumn: "span 12",
                        "@media (min-width: 1024px)": {
                            gridColumnStart: 4,
                            gridColumn: "span 8",
                            gridRowStart: 1,
                            gridRow: "span 2",
                        },
                    }}
                >
                    <Card cardHeader="My Expense Progress">
                        <ProgressBlock></ProgressBlock>
                    </Card>
                </Box>
            </Box>
            <BottomNav></BottomNav>
        </>
    );
}

export default Dashboard;
