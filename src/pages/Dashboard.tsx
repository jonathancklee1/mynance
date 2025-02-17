import React from "react";
import NavBar from "../components/NavBar";
import BottomNav from "../components/BottomNav";
import Grid from "@mui/material/Grid2";
import { styled, Paper } from "@mui/material";

function Dashboard() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
        ...theme.applyStyles("dark", {
            backgroundColor: "#1A2027",
        }),
    }));
    return (
        <>
            <NavBar></NavBar>
            <Grid
                container
                spacing={2}
                minHeight={"100vh"}
                sx={{ p: 2, backgroundColor: "primary.main" }}
            >
                <Grid size={8}>
                    <Item>size=8</Item>
                </Grid>
                <Grid size={4}>
                    <Item>size=4</Item>
                </Grid>
                <Grid size={4}>
                    <Item>size=4</Item>
                </Grid>
                <Grid size={8}>
                    <Item>size=8</Item>
                </Grid>
            </Grid>
            <BottomNav></BottomNav>
        </>
    );
}

export default Dashboard;
