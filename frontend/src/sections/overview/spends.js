import {
  Avatar,
  Box,
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
  Modal,
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
  const [openModal, setOpenModal] = useState(false);

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

  const setCategory = (category) => {
    selectedExpense.category = category.category;
    updateExpense(selectedExpense);
    setOpenModal(false);
  };

  return (
    <>
      <Card>
        <CardContent>
          <List>
            {expenses.map((expense, key) => (<>{
              !(expense.deleted) && !(expense.amount == 0) && (
                <ListItem key={key}>
                  <ListItemAvatar>{categories[expense.category] == undefined ? categories["notFound"].icon : categories[expense.category].icon}</ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        style={{
                          "text-decoration": expense.enabled == false ? "line-through" : "",
                        }}
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
                    id={"basic-button"}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <SvgIcon>
                      <EllipsisVerticalIcon />
                    </SvgIcon>
                  </IconButton>
                </ListItem>
              )
            }</>))}
          </List>
        </CardContent>
      </Card>
      <Menu
        id={"basic-menu"}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {selectedExpense?.enabled == false && <MenuItem onClick={unignore}>Unignore</MenuItem>}
        {selectedExpense?.enabled != false && <MenuItem onClick={ignore}>Ignore</MenuItem>}
        <MenuItem
          onClick={() => {
            setOpenModal(true);
            handleClose();
          }}
        >
          Categorize
        </MenuItem>
      </Menu>
      <Modal
        keepMounted
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
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
              <Grid container>
                {Object.values(categories).map((category) => (
                  <Grid item xs={6} sx={{ p: 1 }} onClick={() => setCategory(category)}>
                    <Box style={{ overflow: "hidden" }}>
                      {category.icon}
                      <Typography fontSize={"0.7rem"} overflow={"hidden"}>
                        {category.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
};