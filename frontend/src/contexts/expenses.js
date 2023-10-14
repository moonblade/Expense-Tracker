import { createContext, useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import api from "src/utils/api";
import moment from "moment";

const initialState = {
  categories: [],
  expenses: [],
  total: 0,
  fromTime: moment().startOf("month").format("YYYY-MM-DD"),
  toTime: moment().startOf("month").add(1, "months").format("YYYY-MM-DD"),
  filter: {},
  showOutlierCategory: false,
  filteredExpenses: [],
};

// The role of this context is to propagate authentication state through the App tree.

export const ExpenseContext = createContext({ undefined });

export const ExpenseProvider = (props) => {
  const { children } = props;
  const [state, setState] = useState(initialState);
  const initialized = useRef(false);

  const filterOutlier = (categories) => {
    if (state.showOutlierCategory) {
      return categories;
    }
    if (categories.length < 2) {
      return categories
    }
    const total = categories.reduce((sum, cur) => sum + cur.total, 0);
    if (categories[0].total > (total - categories[0].total) * 4) {
      return categories.slice(1)
    }
    return categories
  }

  const getCategorized = (expenses) => {
    let categories = {};
    expenses.forEach((expense) => {
      const category = expense.category;
      if (expense.enabled == false || expense.deleted || expense.amount == 0) return;
      if (!categories[category]) {
        categories[category] = { total: 0, expenses: [], category: expense.category };
      }
      categories[category].expenses.push(expense);
      categories[category].total += Math.floor(expense.amount);
    });
    categories = Object.values(categories);
    categories.sort((a, b) => b.total - a.total);
    return filterOutlier(categories);
  };

  const getFiltered = (expenses, filter) => {
    let filteredExpenses = [];
    expenses.forEach((expense) => {
      if (filter.category && filter.category != expense.category) {
        return;
      }
      if (
        filter.search &&
        !(
          expense.payee.toLowerCase().includes(filter.search.toLowerCase()) ||
          expense.account.toLowerCase().includes(filter.search.toLowerCase())
        )
      ) {
        return;
      }
      filteredExpenses.push(expense);
    });
    return filteredExpenses;
  };

  const getExpenses = async (fromTime = null, toTime = null) => {
    return api
      .get("/expense", {
        params: {
          fromTime,
          toTime,
        },
      })
      .then((response) => {
        const categories = getCategorized(response.data);
        const filteredExpenses = getFiltered(response.data, state.filter);
        const total = categories.reduce((total, item) => total + item.total, 0);
        setState({
          ...state,
          fromTime,
          toTime,
          total,
          categories,
          filteredExpenses,
          expenses: response.data,
        });
      })
      .catch((err) => {
        setState(initialState);
        console.error(err);
      });
  };

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }
    getExpenses(initialState.fromTime, initialState.toTime);
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(()=> {
    getExpenses()
  }, [state.showOutlierCategory]);

  const updateExpense = async (expense) => {
    return api
      .post("/expense/" + expense.transactionId, expense)
      .then((response) => {
        if (response.status == 200) getExpenses(state.fromTime, state.toTime);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateFilter = async (filter) => {
    setState({
      ...state,
      filter,
      filteredExpenses: getFiltered(state.expenses, filter),
    });
  };

  const toggleOutlier = () => {
    setState({
      ...state,
      showOutlierCategory: !state.showOutlierCategory
    });
  }

  const deleteExpense = async (expense) => {
    return api
      .delete("/expense/" + expense.transactionId)
      .then((response) => {
        if (response.status == 200) getExpenses(state.fromTime, state.toTime);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addExpense = async (expense) => {
    return api
      .put("/expense", expense)
      .then((response) => {
        if (response.status == 200) getExpenses(state.fromTime, state.toTime);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const refresh = async () => {
    return api.post("/refresh").then((response) => {
      if (response.status == 200) {
        getExpenses(state.fromTime, state.toTime);
      }
    });
  };

  return (
    <ExpenseContext.Provider
      value={{
        ...state,
        getExpenses,
        updateExpense,
        updateFilter,
        addExpense,
        deleteExpense,
        toggleOutlier,
        refresh,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

ExpenseProvider.propTypes = {
  children: PropTypes.node,
};

export const ExpenseConsumer = ExpenseContext.Consumer;

export const useExpenseContext = () => useContext(ExpenseContext);