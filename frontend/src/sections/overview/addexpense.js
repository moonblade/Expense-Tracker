import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const AddExpense = () => {
  return (
    <Fab style={{ position: "fixed", bottom: 16, right: 16 }} color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  );
};