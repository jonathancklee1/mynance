import Grid from "@mui/material/Grid2";
import React from "react";
import BottomNav from "../components/BottomNav";
import NavBar from "../components/NavBar";

function Investments() {
    return (
        <>
            <NavBar></NavBar>
            <Grid
                container
                spacing={2}
                minHeight={"100vh"}
                marginBottom={"100px"}
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

export default Investments;
