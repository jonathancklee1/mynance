import React from "react";
import NavBar from "../components/NavBar";
import Grid from "@mui/material/Grid2";
import BottomNav from "../components/BottomNav";

function Finance() {
    return (
        <>
            <NavBar></NavBar>
            <Grid
                container
                spacing={2}
                minHeight={"100vh"}
                sx={{ p: 2, backgroundColor: "primary.main" }}
            >
                <Grid size={8}></Grid>
                <Grid size={4}></Grid>
                <Grid size={4}></Grid>
                <Grid size={8}></Grid>
            </Grid>
            <BottomNav></BottomNav>
        </>
    );
}

export default Finance;
