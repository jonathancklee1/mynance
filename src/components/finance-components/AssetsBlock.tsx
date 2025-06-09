import { Box, Button, Stack, Typography, ButtonGroup } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import {
    DataGrid,
    GridColDef,
    GridRowId,
    GridRowsProp,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { randomId } from "@mui/x-data-grid-generator";
import EditModal from "../EditModal";
import { useRandomColour } from "../../hooks/useRandomColour";
import useExpenseStore from "../../stores/ExpenseStore";
import { AssetDataItem } from "../../types/interfaces";

function AssetsBlock({ isEditable }: { isEditable?: boolean }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const { assets, setAssets } = useExpenseStore();

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
                                data: assets,
                                cx: "75%",
                                cy: "60%",
                            },
                        ]}
                        width={300}
                        height={200}
                        sx={{
                            scale: "1.2",
                            "& text": {
                                textAnchor: "unset",
                            },
                        }}
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
                        {assets?.map((asset) => (
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
                                <Typography variant="body2" flexGrow={1}>
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
            {isEditable && (
                <EditModal open={open} setClose={handleClose}>
                    <EditAssetBlock
                        assetData={assets}
                        setAssetData={setAssets}
                    ></EditAssetBlock>
                </EditModal>
            )}
        </>
    );
}
function EditAssetBlock({
    assetData,
    setAssetData,
}: {
    assetData: AssetDataItem[];
    setAssetData: (assetData: AssetDataItem[]) => void;
}) {
    const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
    useEffect(() => {
        localStorage.setItem("assets", JSON.stringify(assetData));
    }, [assetData]);
    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            width: 150,
            editable: true,
        },
        {
            field: "value",
            headerName: "Amount ($)",
            type: "number",
            width: 130,
            align: "left",
            headerAlign: "left",
            editable: true,
        },
        {
            field: "color",
            headerName: "Color",
            width: 150,
            editable: true,
        },
    ];

    const rows: GridRowsProp = assetData?.map((asset) => ({
        id: asset.id,
        value: asset.value,
        name: asset.name,
        color: asset.color,
    }));

    const colour = useRandomColour();
    const handleAddRow = () => {
        const id = randomId();
        setAssetData([
            { id: id, value: 0, name: "New Asset", color: colour },
            ...assetData,
        ]);
    };
    const handleDeleteRow = () => {
        setAssetData(
            assetData.filter((asset) => !selectedRows.includes(asset.id))
        );
    };
    return (
        <>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
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
                    color: "text.secondary",
                    backgroundColor: "secondary.main",
                    background: "secondary.main",
                    mb: 2,
                    "& div": {
                        backgroundColor: "secondary.light",
                        color: "text.primary",
                    },
                    "& .MuiDataGrid-row--editing .MuiDataGrid-cell": {
                        backgroundColor: "secondary.main",
                    },
                    "& span": {
                        color: "text.primary",
                    },
                    "& .Mui-checked": {
                        color: "primary.light",
                    },
                    "& .Mui-focused": {
                        backgroundColor: "secondary.main",
                        color: "text.secondary",
                    },
                }}
                processRowUpdate={(newRow, _, params) => {
                    const newArray = assetData?.map((asset) => {
                        if (asset.id === params.rowId) {
                            return newRow;
                        } else {
                            return asset;
                        }
                    });
                    setAssetData(newArray);
                    return newRow;
                }}
                onProcessRowUpdateError={(params) => {
                    console.error("processRowUpdateError", params);
                }}
                onRowSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);
                    const selectedIdArray = Array.from(selectedIDs);
                    setSelectedRows(selectedIdArray);
                }}
            />
            <ButtonGroup variant="text" fullWidth sx={{ gap: 2, ml: "auto" }}>
                <Button
                    onClick={handleAddRow}
                    variant="contained"
                    sx={{
                        backgroundColor: "primary.light",
                        color: "text.secondary",
                    }}
                >
                    Add Row
                </Button>
                <Button
                    onClick={handleDeleteRow}
                    variant="contained"
                    sx={{
                        backgroundColor: "primary.light",
                        color: "text.secondary",
                    }}
                >
                    Delete Row
                </Button>
            </ButtonGroup>
        </>
    );
}
export default AssetsBlock;
