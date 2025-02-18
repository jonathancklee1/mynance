import React from "react";
import NavBar from "../components/NavBar";
import Grid from "@mui/material/Grid2";
import BottomNav from "../components/BottomNav";
import Card from "../components/Card";
import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import AssetsBlock from "../components/finance-components/AssetsBlock";
function Finance() {
    return (
        <>
            <NavBar></NavBar>
            <Grid
                container
                spacing={2}
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
                <Grid size={{ xs: 12, md: 6 }}></Grid>
                <Grid size={{ xs: 12, md: 6 }}></Grid>
            </Grid>
            <BottomNav></BottomNav>
        </>
    );
}

export default Finance;
