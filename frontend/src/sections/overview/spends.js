import { Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useContext } from "react";
import { ExpenseContext } from "src/contexts/expenses";
import categories from "./categories";
import moment from "moment";

export const Spends = () => {
  const { expenses } = useContext(ExpenseContext);
  console.log(expenses)

  return (
    <Card>
      <CardContent>
        <List>
          {
            expenses.map(expense => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {
                      categories[expense.category]?.icon
                    }
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={expense.payee} secondary={moment(expense.date.$date).format('MMMM Do YYYY, h:mm:ss a')} />
              </ListItem>
            ))
          }
        </List>
      </CardContent>
    </Card>
  )
};
 