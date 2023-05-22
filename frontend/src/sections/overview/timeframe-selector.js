import {
  Card,
  CardContent,
  MenuItem,
  Select,
} from '@mui/material';
import { useContext, useState } from 'react';
import { ExpenseContext } from 'src/contexts/expenses';
import moment from "moment";

export const TimeframeSelector = () => {
  const { getExpenses } = useContext(ExpenseContext)

  const timeFrames = {"thismonth": {
    label: "This Month",
    key: "thismonth",
    value: {
      fromTime: moment().startOf('month').format('YYYY-MM-DD'),
      toTime: moment().format('YYYY-MM-DD')
    }
  }, "previousmonth": {
    label: "Previous Month",
    key: "previousmonth",
    value: {
      fromTime: moment().startOf('month').subtract(1, 'months').format('YYYY-MM-DD'),
      toTime: moment().endOf('month').subtract(1, 'months').format('YYYY-MM-DD')
    }
  }, "thisyear": {
    label: "This Year",
    key: "thisyear",
    value: {
      fromTime: moment().startOf('year').format('YYYY-MM-DD'),
      toTime: moment().endOf('month').format('YYYY-MM-DD')
    }
  }}

  const [timeFrame, setTimeFrame] = useState(timeFrames["thismonth"].key);

  const handleChange = (event) => {
    const value = timeFrames[event.target.value].value;
    getExpenses(value.fromTime, value.toTime);
    setTimeFrame(event.target.value);
  };

  return (
      <Select
        labelId="changeTimeFrame"
        id="changeTimeFrame"
        value={timeFrame}
        label="TimeFrame"
        onChange={handleChange}
        sx={{ width: '100%' }}
      >
        {
          Object.values(timeFrames).map((tFrame, key) => (
            <MenuItem value={tFrame.key} key={key}>{tFrame.label}</MenuItem>
          ))
        }
      </Select>
  );
};