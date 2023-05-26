import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
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
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { ExpenseContext } from "src/contexts/expenses";
import categories from "./categories";
import moment from "moment";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { useLongPress } from "use-long-press";

export const Spends = () => {
  const { updateExpense, filteredExpenses: expenses } = useContext(ExpenseContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(expenses[0] || null);
  const [payee, setPayee] = useState("");
  const open = Boolean(anchorEl);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openPayeeModal, setOpenPayeeModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedExpense(expenses[event.currentTarget.value]);
    setPayee(expenses[event.currentTarget.value].payee);
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
    setOpenCategoryModal(false);
  };

  const updatePayee = () => {
    selectedExpense.payee = payee;
    updateExpense(selectedExpense);
    setOpenPayeeModal(false);
  };

  return (
    <>
      <Card>
        <CardContent style={{ "padding-left": "0", "padding-right": "0" }}>
          <List>
            {expenses.map((expense, key) => (
              <>
                {!expense.deleted && !(expense.amount == 0) && !expense.hide && (
                  <ListItem
                    key={key}
                    onClick={handleClick}
                    value={key}
                    id={"basic-button"}
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <ListItemAvatar>
                      {categories[expense.category] == undefined
                        ? categories["notFound"].icon
                        : categories[expense.category].icon}
                    </ListItemAvatar>
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
                            <Grid item xs={4}>
                              <Typography component={"span"}>₹ {expense.amount}</Typography>
                            </Grid>
                            <Grid item xs={8}>
                              <Typography
                                align="end"
                                style={{
                                  "margin-top": "3px",
                                }}
                                component={"span"}
                                varient="caption"
                                display="block"
                                fontSize={"0.6rem"}
                              >
                                ({expense.account}) {moment(expense.date.$date).format("MMMM D, h:mm A")} 
                              </Typography>
                            </Grid>
                          </Grid>
                        </Fragment>
                      }
                    />
                  </ListItem>
                )}
              </>
            ))}
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
            setOpenCategoryModal(true);
            handleClose();
          }}
        >
          Categorize
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenPayeeModal(true);
            handleClose();
          }}
        >
          Modify payee
        </MenuItem>
      </Menu>
      <Modal
        keepMounted
        open={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
        aria-labelledby="keep-mounted-modal-category-title"
        aria-describedby="keep-mounted-modal-category-description"
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
                {Object.values(categories)
                  .filter((category) => category.category != "notFound")
                  .map((category, key) => (
                    <Grid key={key} item xs={6} sx={{ p: 1 }} onClick={() => setCategory(category)}>
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
      <Modal
        keepMounted
        open={openPayeeModal}
        onClose={() => setOpenPayeeModal(false)}
        aria-labelledby="keep-mounted-modal-payee-title"
        aria-describedby="keep-mounted-modal-payee-description"
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
                label="Paye"
                variant="outlined"
                value={payee}
                onChange={(event) => {
                  setPayee(event.target.value);
                }}
              />
            </CardContent>
            <CardActions>
              <Button size="small" onClick={updatePayee}>
                Ok
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Modal>
    </>
  );
};