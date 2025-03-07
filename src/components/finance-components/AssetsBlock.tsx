import { Box, Button, Stack, Typography, ButtonGroup } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { randomId } from "@mui/x-data-grid-generator";
import EditModal from "../EditModal";

interface AssetDataItem {
    id: string;
    value: number;
    name: string;
    color: string;
}
function AssetsBlock() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [assetData, setAssetData] = useState<AssetDataItem[]>([
        { id: randomId(), value: 100, name: "Savings", color: "#fd2" },
        { id: randomId(), value: 15, name: "Stocks", color: "#342" },
        { id: randomId(), value: 20, name: "Cypto", color: "#FFF" },
    ]);
    useEffect(() => {
        console.log(assetData);
    }, [assetData]);

    return (
        <>
            <Box
                onClick={handleOpen}
                sx={{ width: "100%", height: "100%", cursor: "pointer" }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <PieChart
                        series={[
                            {
                                data: assetData,
                                cx: "75%",
                                cy: "60%",
                            },
                        ]}
                        width={300}
                        height={200}
                        sx={{ scale: "1.2" }}
                        slotProps={{
                            legend: {
                                hidden: true,
                            },
                        }}
                        margin={{ bottom: 40 }}
                    />
                </Box>
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
                                    bgcolor={asset.color}
                                ></Box>
                                <Typography
                                    variant="body2"
                                    color={"secondary.contrastText"}
                                    flexGrow={1}
                                >
                                    {asset.name}
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
                <EditAssetBlock
                    assetData={assetData}
                    setAssetData={setAssetData}
                ></EditAssetBlock>
            </EditModal>
        </>
    );
}
function EditAssetBlock({
    assetData,
    setAssetData,
}: {
    assetData: AssetDataItem[];
    setAssetData: React.Dispatch<React.SetStateAction<AssetDataItem[]>>;
}) {
    const [selectedRows, setSelectedRows] = useState([]);

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            width: 180,
            editable: true,
        },
        {
            field: "value",
            headerName: "Amount ($)",
            type: "number",
            width: 180,
            align: "left",
            headerAlign: "left",
            editable: true,
        },
        {
            field: "color",
            headerName: "Color",
            width: 180,
            editable: true,
        },
    ];

    const rows: GridRowsProp = assetData.map((asset) => ({
        id: asset.id,
        value: asset.value,
        name: asset.name,
        color: asset.color,
    }));

    const handleAddRow = () => {
        const id = randomId();
        setAssetData((prevAsset) => [
            { id: id, value: 0, name: "New Asset", color: "#FFF" },
            ...prevAsset,
        ]);
    };
    const handleDeleteRow = () => {
        setAssetData((prevAsset) =>
            prevAsset.filter((asset) => !selectedRows.includes(asset.id))
        );
    };
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
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                    color: "text.primary",
                    backgroundColor: "secondary.main",
                    background: "secondary.main",
                    mb: 2,
                    "& div": { backgroundColor: "secondary.main" },
                    "& .MuiDataGrid-row--editing .MuiDataGrid-cell": {
                        backgroundColor: "secondary.main",
                    },
                }}
                // rowModesModel={rowModesModel}
                // onRowModesModelChange={handleRowModesModelChange}

                processRowUpdate={(newRow, oldRow, params) => {
                    console.log("processRowUpdate", newRow, oldRow, params);
                    setAssetData((prevAsset) => {
                        const newArray = prevAsset.map((asset) => {
                            if (asset.id === params.rowId) {
                                return newRow;
                            } else {
                                return asset;
                            }
                        });
                        console.log("new array", newArray);
                        return newArray;
                    });
                    return newRow;
                }}
                onProcessRowUpdateError={(params) => {
                    console.error("processRowUpdateError", params);
                }}
                onRowSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);

                    const selectedIdArray = Array.from(selectedIDs);
                    console.log("selectedRows", selectedIdArray);
                    setSelectedRows(selectedIdArray);
                }}
            />
            <ButtonGroup
                variant="text"
                color="primary"
                fullWidth
                sx={{ gap: 2, ml: "auto" }}
            >
                <Button
                    onClick={handleAddRow}
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: "primary.main",
                    }}
                >
                    Add Row
                </Button>
                <Button
                    onClick={handleDeleteRow}
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: "primary.main",
                    }}
                >
                    Delete Row
                </Button>
            </ButtonGroup>
        </>
    );
}
export default AssetsBlock;
