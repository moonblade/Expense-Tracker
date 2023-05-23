import {
  Avatar,
  Card,
  CardContent,
  Item,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
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
  };

  const ignore = (value) => {
    console.log("ignore", value);
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
                  <Fragment>
                    <Grid container>
                      <Grid item xs={12} style={{ "font-size": "0.9rem", overflow: "hidden" }}>
                        {expense.payee}
                      </Grid>
                      <Grid item xs={0} style={{ "font-size": "0.6rem" }}>
                        {false && moment(expense.date.$date).format("MMMM D, h:mm A")}
                      </Grid>
                    </Grid>
                  </Fragment>
                }
                secondary={
                  <Fragment>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>₹ {expense.amount}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography varient="caption" display="block" fontSize={"0.6rem"}>
                          {moment(expense.date.$date).format("MMMM D, h:mm A")}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Fragment>
                }
              />
              <IconButton
                id={"basic-button" + key}
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
                  "aria-labelledby": "basic-button" + key,
                }}
              >
                {expense.enabled == false && (
                  <MenuItem
                    onClick={() => {
                      unignore(expense);
                    }}
                  >
                    Unignore
                  </MenuItem>
                )}
                {expense.enabled != false && (
                  <MenuItem
                    onClick={() => {
                      ignore(expense);
                    }}
                  >
                    Ignore
                  </MenuItem>
                )}
              </Menu>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};