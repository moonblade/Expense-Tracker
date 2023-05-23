import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { ExpenseContext } from "src/contexts/expenses";
import categories from "./categories";
import moment from "moment";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";

export const Spends = () => {
  const { expenses, updateExpense } = useContext(ExpenseContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(expenses[0] || null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedExpense(expenses[event.currentTarget.value]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const unignore = () => {
    selectedExpense.enabled = true;
    updateExpense(selectedExpense);
    handleClose();
  };

  const ignore = () => {
    selectedExpense.enabled = false;
    updateExpense(selectedExpense);
    handleClose();
  };

  return (
    <Card>
      <CardContent>
        <List>
          {expenses.map((expense, key) => (
            <ListItem key={key}>
              <ListItemAvatar>
                <Avatar>{categories[expense.category]?.icon}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    style={{ "text-decoration": expense.enabled == false ? "line-through" : "" }}
                  >
                    {expense.payee}
                  </Typography>
                }
                secondary={
                  <Fragment>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography component={"span"}>₹ {expense.amount}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          component={"span"}
                          varient="caption"
                          display="block"
                          fontSize={"0.6rem"}
                        >
                          {moment(expense.date.$date).format("MMMM D, h:mm A")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                }
              />
              <IconButton
                value={key}
                id={"basic-button" + key}
                aria-controls={open ? "basic-menu" + key : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
              <Menu
                id={"basic-menu" + key}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button" + key,
                }}
              >
                {selectedExpense?.enabled == false && (
                  <MenuItem onClick={unignore}>Unignore</MenuItem>
                )}
                {selectedExpense?.enabled != false && <MenuItem onClick={ignore}>Ignore</MenuItem>}
              </Menu>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};