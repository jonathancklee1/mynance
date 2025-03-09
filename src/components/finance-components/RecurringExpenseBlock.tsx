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

interface recurringExpenseItem {
    id: number;
    name: string;
    amount: number;
}
function RecurringExpenseBlock() {
    const [recurringExpenses, setRecurringExpenses] = useState([
        { id: 0, name: "Groceries", amount: 50 },
        { id: 1, name: "Utilities", amount: 100 },
        { id: 2, name: "Entertainment", amount: 75 },
    ]);
    const [open, setOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] =
        useState<recurringExpenseItem>({
            id: 0,
            name: "",
            amount: 0,
        });
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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
                                ${expense.amount}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <EditModal open={open} setClose={handleClose}>
                <EditRecurringExpenseBlock
                    selectedExpense={selectedExpense}
                    setRecurringExpenses={setRecurringExpenses}
                    recurringExpenses={recurringExpenses}
                    handleClose={handleClose}
                ></EditRecurringExpenseBlock>
            </EditModal>
        </>
    );
}
function EditRecurringExpenseBlock({
    setRecurringExpenses,
    selectedExpense,
    recurringExpenses,
    handleClose,
}: {
    selectedExpense: recurringExpenseItem;
    recurringExpenses: recurringExpenseItem[];
    setRecurringExpenses: React.Dispatch<
        React.SetStateAction<recurringExpenseItem[]>
    >;
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
                    value={
                        recurringExpenses.find(
                            (expense: recurringExpenseItem) =>
                                expense.id === selectedExpense.id
                        )?.amount
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
                        console.log("expense changes");
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
                        handleClose();
                    }}
                >
                    Delete Expense
                </Button>
            </Stack>
        </>
    );
}

export default RecurringExpenseBlock;
