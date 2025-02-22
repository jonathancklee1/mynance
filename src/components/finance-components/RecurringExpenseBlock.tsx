import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function RecurringExpenseBlock() {
    const recurringExpenses = [
        { name: "Groceries", amount: 50 },
        { name: "Utilities", amount: 100 },
        { name: "Entertainment", amount: 75 },
    ];
    return (
        <List sx={{ width: "100%" }}>
            {recurringExpenses.map((expense) => (
                <ListItem disablePadding>
                    <ListItemButton sx={{ paddingBottom: 0 }}>
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
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            ${expense.amount}
                        </Typography>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}

export default RecurringExpenseBlock;
