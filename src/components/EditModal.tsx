import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
function EditModal({
    open,
    setClose,
    children,
}: {
    open: boolean;
    setClose: () => void;
    children: React.ReactNode;
}) {
    return (
        <>
            <Dialog
                open={open}
                fullWidth
                onClose={setClose}
                sx={{
                    "& .MuiDialog-paper": {
                        backgroundColor: "background.default",
                        borderRadius: 2,
                        overflowY: "visible",
                    },
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={() => {
                        setClose();
                    }}
                    sx={() => ({
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "primary.light",
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent
                    sx={{
                        px: 4,
                        py: 5,
                    }}
                >
                    {children}
                </DialogContent>
                {/* <DialogActions></DialogActions> */}
            </Dialog>
        </>
    );
}

export default EditModal;
