import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { randomId } from "@mui/x-data-grid-generator";
import EditModal from "../EditModal";

interface AssetDataItem {
    id: number;
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
        { id: 0, value: 100, name: "Savings", color: "#fd2" },
        { id: 1, value: 15, name: "Stocks", color: "#342" },
        { id: 2, value: 20, name: "Cypto", color: "#FFF" },
    ]);
    useEffect(() => {
        console.log(assetData);
    }, [assetData]);
    return (
        <>
            <Box onClick={handleOpen}>
                <PieChart
                    series={[
                        {
                            data: assetData,
                            cx: 150,
                            cy: 100,
                            // valueFormatter: (params) => {
                            //     const percent = params.value / 100;
                            //     return `${(percent * 100).toFixed(1)}%`;
                            // },
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
    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            width: 180,
            editable: true,
        },
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
            field: "color",
            headerName: "Color",
            width: 180,
            editable: true,
        },
    ];

    const rows: GridRowsProp = assetData.map((asset) => ({
        id: asset.id,
        name: asset.name,
        value: asset.value,
        color: asset.color,
    }));

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
            />
        </>
    );
}
export default AssetsBlock;
