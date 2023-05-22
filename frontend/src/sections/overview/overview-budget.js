import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyRupeeIcon from '@heroicons/react/24/solid/CurrencyRupeeIcon';
import { Avatar, Card, CardContent, CardHeader, Stack, SvgIcon, Typography } from '@mui/material';
import { ExpenseContext } from 'src/contexts/expenses';
import { useContext } from 'react';

export const OverviewBudget = () => {
  const { total } = useContext(ExpenseContext);

  return (
    <Card>
      <CardHeader title="TOTAL" />
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
        >
          <Stack>
            <Typography variant="h4">
              ₹ {total}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
            }}
          >
            <SvgIcon>
              <CurrencyRupeeIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewBudget.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};