import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
    Button,
    Box,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditModal from "../EditModal";
import { useState } from "react";
import Textbox from "../Textbox";
import { recurringExpenseItem } from "../types/interfaces";
import useExpenseStore from "../../stores/ExpenseStore";

function RecurringExpenseBlock({ isEditable }: { isEditable?: boolean }) {
    const {
        recurringExpenses,
        setRecurringExpenses,
        addRecurringExpense,
        deleteRecurringExpense,
    } = useExpenseStore();
    const [open, setOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] =
        useState<recurringExpenseItem>({
            id: crypto.randomUUID(),
            name: "",
            cost: 0,
        });
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleAddOpen = () => {
        setAddOpen(true);
    };
    const handleAddClose = () => {
        setAddOpen(false);
    };
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
            }}
        >
            {recurringExpenses.length === 0 && (
                <Box
                    sx={{
                        width: "100%",
                        flexGrow: 1,
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        No Recurring Expenses
                    </Typography>
                </Box>
            )}

            <List sx={{ width: "100%" }}>
                {recurringExpenses.map((expense: recurringExpenseItem) => (
                    <ListItem
                        disablePadding
                        key={expense.id}
                        onClick={() => {
                            handleOpen();
                            setSelectedExpense(expense);
                        }}
                        sx={{
                            "&:hover": {
                                backgroundColor: "primary.main",
                                borderRadius: 2,
                            },
                        }}
                    >
                        <ListItemButton sx={{ px: 1 }}>
                            <ListItemIcon
                                sx={{
                                    color: "primary.light",
                                    minWidth: 20,
                                    marginRight: 2,
                                }}
                            >
                                <AttachMoneyIcon sx={{ width: 20 }} />
                            </ListItemIcon>
                            <ListItemText primary={expense.name} />
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "bold" }}
                            >
                                ${expense.cost}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Button
                variant="text"
                sx={{
                    backgroundColor: "primary.light",
                    color: "text.secondary",
                    fontWeight: "bold",
                    width: "100%",
                    "@media (min-width: 769px)": { width: "60%" },
                }}
                onClick={() => {
                    handleAddOpen();
                }}
            >
                Add Recurring Expense
            </Button>
            {isEditable && (
                <>
                    <EditModal open={open} setClose={handleClose}>
                        <EditRecurringExpenseBlock
                            selectedExpense={selectedExpense}
                            setRecurringExpenses={setRecurringExpenses}
                            recurringExpenses={recurringExpenses}
                            handleClose={handleClose}
                            deleteRecurringExpense={deleteRecurringExpense}
                        ></EditRecurringExpenseBlock>
                    </EditModal>
                    <EditModal open={addOpen} setClose={handleAddClose}>
                        <AddRecurringExpenseBlock
                            handleClose={handleAddClose}
                            addRecurringExpense={addRecurringExpense}
                        ></AddRecurringExpenseBlock>
                    </EditModal>
                </>
            )}
        </Box>
    );
}
function EditRecurringExpenseBlock({
    setRecurringExpenses,
    selectedExpense,
    recurringExpenses,
    handleClose,
    deleteRecurringExpense,
}: {
    selectedExpense: recurringExpenseItem;
    recurringExpenses: recurringExpenseItem[];
    setRecurringExpenses: (recurringExpenses: recurringExpenseItem[]) => void;
    handleClose: () => void;
    deleteRecurringExpense: (expenseItem: recurringExpenseItem) => void;
}) {
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
                Edit your recurring expenses
            </Typography>
            <Stack spacing={2}>
                <Textbox
                    label={"Name"}
                    variant={"outlined"}
                    colourVariant={"secondary"}
                    value={
                        recurringExpenses.find(
                            (expense: recurringExpenseItem) =>
                                expense.id === selectedExpense.id
                        )?.name
                    }
                    onChange={(e) => {
                        setRecurringExpenses(
                            recurringExpenses.map(
                                (expense: recurringExpenseItem) => {
                                    if (expense.id === selectedExpense.id) {
                                        return {
                                            ...expense,
                                            name: e.target.value,
                                        };
                                    }
                                    return expense;
                                }
                            )
                        );
                    }}
                ></Textbox>
                <Textbox
                    label={"Amount ($)"}
                    variant={"outlined"}
                    colourVariant={"secondary"}
                    value={
                        recurringExpenses.find(
                            (expense: recurringExpenseItem) =>
                                expense.id === selectedExpense.id
                        )?.cost
                    }
                    onChange={(e) => {
                        setRecurringExpenses(
                            recurringExpenses.map(
                                (expense: recurringExpenseItem) => {
                                    if (expense.id === selectedExpense.id) {
                                        return {
                                            ...expense,
                                            cost: Number(e.target.value),
                                        };
                                    }
                                    return expense;
                                }
                            )
                        );
                    }}
                ></Textbox>
                <Button
                    variant="text"
                    fullWidth
                    onClick={handleClose}
                    sx={{
                        backgroundColor: "primary.light",
                        fontWeight: "bold",
                    }}
                >
                    Save Expense
                </Button>
                <Button
                    variant="text"
                    sx={{
                        backgroundColor: "primary.light",
                        fontWeight: "bold",
                    }}
                    onClick={() => {
                        setRecurringExpenses(
                            recurringExpenses.filter(
                                (expense: recurringExpenseItem) => {
                                    return expense.id !== selectedExpense.id;
                                }
                            )
                        );
                        deleteRecurringExpense(selectedExpense);
                        handleClose();
                    }}
                >
                    Delete Expense
                </Button>
            </Stack>
        </>
    );
}
function AddRecurringExpenseBlock({
    handleClose,
    addRecurringExpense,
}: {
    handleClose: () => void;
    addRecurringExpense: (expenseItem: recurringExpenseItem) => void;
}) {
    const [newRecurringExpense, setNewRecurringExpense] = useState({
        id: crypto.randomUUID(),
        name: "",
        cost: 0,
    });
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
                Add your recurring expenses
            </Typography>
            <Stack spacing={2}>
                <Textbox
                    label={"Name"}
                    variant={"outlined"}
                    colourVariant={"secondary"}
                    value={newRecurringExpense.name}
                    onChange={(e) => {
                        setNewRecurringExpense((prev) => {
                            return {
                                ...prev,
                                name: e.target.value,
                            };
                        });
                    }}
                ></Textbox>
                <Textbox
                    label={"Amount ($)"}
                    variant={"outlined"}
                    colourVariant={"secondary"}
                    type="number"
                    value={newRecurringExpense.cost}
                    onChange={(e) => {
                        setNewRecurringExpense((prev) => {
                            return {
                                ...prev,
                                cost: parseInt(e.target.value),
                            };
                        });
                    }}
                ></Textbox>
                <Button
                    variant="text"
                    onClick={() => {
                        addRecurringExpense(newRecurringExpense);
                        handleClose();
                    }}
                    sx={{
                        backgroundColor: "primary.light",
                        fontWeight: "bold",
                    }}
                >
                    Add Expense
                </Button>
            </Stack>
        </>
    );
}

export default RecurringExpenseBlock;
