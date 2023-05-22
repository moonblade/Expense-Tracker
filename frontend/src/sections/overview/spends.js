import {
  Avatar,
  Card,
  CardContent,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
} from "@mui/material";
import { useContext, useState } from "react";
import { ExpenseContext } from "src/contexts/expenses";
import categories from "./categories";
import moment from "moment";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

export const Spends = () => {
  const { expenses } = useContext(ExpenseContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const unignore = (value) => {
    console.log(value);
    handleClose();
  }

  const ignore = (value) => {
    console.log("ignore", value);
    handleClose();
  }

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
                primary={expense.payee}
                secondary={moment(expense.date.$date).format("MMMM Do YYYY, h:mm a")}
              />
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {expense.enabled == false && <MenuItem onClick={() => {unignore(expense)}}>Unignore</MenuItem>}
                {expense.enabled != false && <MenuItem onClick={() => {ignore(expense)}}>Ignore</MenuItem>}
              </Menu>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};