import React from "react";
import NavBar from "../components/NavBar";
import Grid from "@mui/material/Grid2";
import BottomNav from "../components/BottomNav";
import Card from "../components/Card";
import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import AssetsBlock from "../components/finance-components/AssetsBlock";
import ExpensesBlock from "../components/finance-components/ExpensesBlock";
import ProgressBlock from "../components/finance-components/ProgressBlock";
import ExpensePieBlock from "../components/finance-components/ExpensePieBlock";
import RecurringExpenseBlock from "../components/finance-components/RecurringExpenseBlock";
function Finance() {
    return (
        <>
            <NavBar></NavBar>
            <Grid
                container
                spacing={2}
                marginBottom={"100px"}
                sx={{ p: 2, backgroundColor: "primary.main" }}
            >
                <Grid size={{ xs: 12, md: 6 }} sx={{}}>
                    <Card>
                        <Typography
                            variant="h5"
                            color={"primary.contrastText"}
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                            marginBottom={2}
                        >
                            My Capital
                        </Typography>
                        <Typography
                            variant="h3"
                            color={"secondary.contrastText"}
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                        >
                            $30,000
                        </Typography>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <Typography
                            variant="h5"
                            color={"primary.contrastText"}
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                            marginBottom={2}
                        >
                            My Assets
                        </Typography>
                        <AssetsBlock></AssetsBlock>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <Typography
                            variant="h5"
                            color={"primary.contrastText"}
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                            marginBottom={2}
                        >
                            My Weekly Expenses
                        </Typography>
                        <ExpensesBlock></ExpensesBlock>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <Typography
                            variant="h5"
                            color={"primary.contrastText"}
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                            marginBottom={2}
                        >
                            My Expense Progress
                        </Typography>
                        <ProgressBlock></ProgressBlock>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <Typography
                            variant="h5"
                            color={"primary.contrastText"}
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                            marginBottom={2}
                        >
                            Expense Diversity
                        </Typography>
                        <ExpensePieBlock></ExpensePieBlock>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <Typography
                            variant="h5"
                            color={"primary.contrastText"}
                            sx={{ fontWeight: "bold", textAlign: "center" }}
                            marginBottom={2}
                        >
                            Recurring Expenses
                        </Typography>
                        <RecurringExpenseBlock></RecurringExpenseBlock>
                    </Card>
                </Grid>
            </Grid>
            <BottomNav></BottomNav>
        </>
    );
}

export default Finance;
