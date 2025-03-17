import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
    Button,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditModal from "../EditModal";
import { useState } from "react";
import Textbox from "../Textbox";
import { recurringExpenseItem } from "../types/interfaces";
import useExpenseStore from "../../stores/ExpenseStore";

function RecurringExpenseBlock() {
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
        <>
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
                                    color: "white",
                                    minWidth: 20,
                                    marginRight: 2,
                                }}
                            >
                                <AttachMoneyIcon
                                    sx={{ color: "white", width: 20 }}
                                />
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
                fullWidth
                sx={{ backgroundColor: "primary.main" }}
                onClick={() => {
                    handleAddOpen();
                }}
            >
                Add Recurring Expense
            </Button>
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
    setRecurringExpenses: React.Dispatch<
        React.SetStateAction<recurringExpenseItem[]>
    >;
    handleClose: () => void;
    deleteRecurringExpense: (expenseItem: recurringExpenseItem) => void;
}) {
    return (
        <>
            <Typography
                variant="h5"
                color={"secondary.contrastText"}
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
                    colourVariant={"primary"}
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
                        console.log("expense changes");
                    }}
                ></Textbox>
                <Textbox
                    label={"Amount ($)"}
                    variant={"outlined"}
                    colourVariant={"primary"}
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
                                            amount: parseInt(e.target.value),
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
                    onClick={handleClose}
                    sx={{ backgroundColor: "primary.main" }}
                >
                    Save Expense
                </Button>
                <Button
                    variant="text"
                    color="error"
                    sx={{ backgroundColor: "primary.main" }}
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
                color={"secondary.contrastText"}
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
                    colourVariant={"primary"}
                    value={newRecurringExpense.name}
                    onChange={(e) => {
                        setNewRecurringExpense((prev) => {
                            return {
                                ...prev,
                                name: e.target.value,
                            };
                        });
                        console.log("expense changes");
                    }}
                ></Textbox>
                <Textbox
                    label={"Amount ($)"}
                    variant={"outlined"}
                    colourVariant={"primary"}
                    type="number"
                    value={newRecurringExpense.amount}
                    onChange={(e) => {
                        setNewRecurringExpense((prev) => {
                            return {
                                ...prev,
                                amount: parseInt(e.target.value),
                            };
                        });
                        console.log("expense changes");
                    }}
                ></Textbox>
                <Button
                    variant="text"
                    onClick={() => {
                        addRecurringExpense(newRecurringExpense);
                        handleClose();
                    }}
                    sx={{ backgroundColor: "primary.main" }}
                >
                    Add Expense
                </Button>
            </Stack>
        </>
    );
}

export default RecurringExpenseBlock;
