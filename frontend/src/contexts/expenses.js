import { createContext, useContext, useEffect, useReducer, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import api from 'src/utils/api';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  GET_EXPENSES: 'GET_EXPENSES',
};

const initialState = {
  categories: {},
  expenses: [],
  fromTime: null,
  toTime: null
};

// The role of this context is to propagate authentication state through the App tree.

export const ExpenseContext = createContext({ undefined });

export const ExpenseProvider = (props) => {
  const { children } = props;
  const [state, setState] = useState(initialState);
  const initialized = useRef(false);

  const getCategorized = ((expenses) => {
    const categories = {}
    expenses.forEach(expense => {
      const category = expense.category
      if (!categories[category]) {
        categories[category] = {total: 0, expenses: [], category: expense.category}
      }
      categories[category].expenses.push(expense);
      categories[category].total += Math.floor(expense.amount);
    })
    return categories
  });

  const getExpenses = async (fromTime = null, toTime = null) => {
    return api.get('/expense').then(response => {
      const categories = getCategorized(response.data);
      setState({
        ...state,
        fromTime,
        toTime,
        categories,
        expenses: response.data
      })
    }).catch(err => {
        setState(initialState);
        console.error(err);
      });
  };

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }
    getExpenses();
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <ExpenseContext.Provider
      value={{
        ...state,
        getExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

ExpenseProvider.propTypes = {
  children: PropTypes.node
};

export const ExpenseConsumer = ExpenseContext.Consumer;

export const useExpenseContext = () => useContext(ExpenseContext);