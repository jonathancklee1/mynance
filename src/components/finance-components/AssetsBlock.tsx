import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import { randomId } from "@mui/x-data-grid-generator";
import EditModal from "../EditModal";
function AssetsBlock() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const assetData = [
        { id: 0, value: 10, label: "series A", colour: "#FFF" },
        { id: 1, value: 15, label: "series B", colour: "#FFF" },
        { id: 2, value: 20, label: "series C", colour: "#FFF" },
    ];
    return (
        <>
            <Box onClick={handleOpen}>
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
            </Box>
            <EditModal open={open} setClose={handleClose}>
                <EditAssetBlock></EditAssetBlock>
            </EditModal>
        </>
    );
}
function EditAssetBlock() {
    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", width: 180, editable: true },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            width: 180,
            align: "left",
            headerAlign: "left",
            editable: true,
        },
        {
            field: "colour",
            headerName: "Colour",
            width: 180,
            editable: true,
        },
    ];
    const rows: GridRowsProp = [
        {
            id: randomId(),
            name: "Frozen yoghurt",
            amount: 159,
            colour: "#FFF",
        },
        {
            id: randomId(),
            name: "Stocks",
            amount: 159,
            colour: "#FFF",
        },
        {
            id: randomId(),
            name: "Savings",
            amount: 159,
            colour: "#FFF",
        },
    ];
    return (
        <>
            <Typography
                variant="h5"
                color={"secondary.contrastText"}
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    cursor: "pointer",
                    marginBottom: 2,
                }}
            >
                Edit your assets
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                sx={{
                    color: "text.primary",
                    backgroundColor: "secondary.main",
                    background: "secondary.main",
                    "& div": { backgroundColor: "secondary.main" },
                }}
                // rowModesModel={rowModesModel}
                // onRowModesModelChange={handleRowModesModelChange}
                // onRowEditStop={handleRowEditStop}
                // processRowUpdate={processRowUpdate}
            />
        </>
    );
}
export default AssetsBlock;
