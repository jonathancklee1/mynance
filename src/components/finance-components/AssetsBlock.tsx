import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import React from "react";

function AssetsBlock() {
    const assetData = [
        { id: 0, value: 10, label: "series A", colour: "#FFF" },
        { id: 1, value: 15, label: "series B", colour: "#FFF" },
        { id: 2, value: 20, label: "series C", colour: "#FFF" },
    ];
    return (
        <>
            <PieChart
                series={[
                    {
                        data: assetData,
                        cx: 150,
                        cy: 100,
                        valueFormatter: (params) => {
                            const percent = params.value / 100;
                            return `${(percent * 100).toFixed(1)}%`;
                        },
                    },
                ]}
                width={300}
                height={200}
                slotProps={{
                    legend: { hidden: true },
                }}
                // slotProps={{
                //     legend: {
                //         direction: "row",
                //         position: {
                //             vertical: "bottom",
                //             horizontal: "middle",
                //         },
                //         padding: 0,
                //     },
                // }}

                margin={{ bottom: 40 }}
            />
            <Box sx={{ width: "100%" }}>
                <Stack spacing={2} display={"flex"}>
                    {assetData.map((asset) => (
                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            gap={2}
                            key={asset.id}
                        >
                            <Box
                                borderRadius={"100%"}
                                width={20}
                                height={20}
                                bgcolor={"black"}
                            ></Box>
                            <Typography
                                variant="body2"
                                color={"secondary.contrastText"}
                                flexGrow={1}
                            >
                                {asset.label}
                            </Typography>
                            <Typography variant="body1">
                                {asset.value}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </>
    );
}

export default AssetsBlock;
