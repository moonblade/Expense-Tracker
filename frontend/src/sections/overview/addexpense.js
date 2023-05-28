import { Box, Button, Card, CardActions, CardContent, Fab, Modal, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import { ExpenseContext } from "src/contexts/expenses";

export const AddExpense = () => {
  const showModal = () => {
    setOpenAddExpenseModal(true);
    setNewExpense({payee: "", amount: "", account: ""});
  };
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [newExpense, setNewExpense] = useState({});
  const { addExpense } = useContext(ExpenseContext);

  const addNewExpense = () => {
    if (newExpense.payee && newExpense.account && newExpense.amount)
      addExpense(newExpense).finally(() => {
        setOpenAddExpenseModal(false);
      });
    else setOpenAddExpenseModal(false);
  };

  return (
    <>
      <Fab
        style={{ position: "fixed", bottom: 16, right: 16 }}
        color="primary"
        aria-label="add"
        onClick={showModal}
      >
        <AddIcon />
      </Fab>
      <Modal
        keepMounted
        open={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        aria-labelledby="keep-mounted-modal-add-expense"
        aria-describedby="keep-mounted-modal-add-expense-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Card>
            <CardContent>
              <TextField
                id="payee-id"
                label="Payee"
                variant="outlined"
                value={newExpense.payee}
                onChange={(event) => {
                  setNewExpense({ ...newExpense, payee: event.target.value.toLowerCase() });
                }}
              />
              <TextField
                id="amount"
                label="amount"
                variant="outlined"
                value={newExpense.amount}
                onChange={(event) => {
                  setNewExpense({ ...newExpense, amount: event.target.value });
                }}
              />
              <TextField
                id="account"
                label="account"
                variant="outlined"
                value={newExpense.account}
                onChange={(event) => {
                  setNewExpense({ ...newExpense, account: event.target.value.toLowerCase() });
                }}
              />
            </CardContent>
            <CardActions>
              <Button size="small" onClick={addNewExpense}>
                Ok
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </>
  );
};