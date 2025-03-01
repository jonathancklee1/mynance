import { Dialog, DialogActions, DialogContent } from "@mui/material";

function EditModal({
    open,
    setOpen,
    children,
}: {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
}) {
    return (
        <>
            <Dialog
                open={open}
                fullWidth
                onClose={() => setOpen(false)}
                sx={{
                    "& .MuiDialog-paper": {
                        backgroundColor: "secondary.main",
                        borderRadius: 2,
                    },
                }}
            >
                <DialogContent
                    sx={{
                        padding: 4,
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
