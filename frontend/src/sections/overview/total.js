import CurrencyRupeeIcon from '@heroicons/react/24/solid/CurrencyRupeeIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import { ExpenseContext } from 'src/contexts/expenses';
import { useContext } from 'react';

export const Total = () => {
  const { total } = useContext(ExpenseContext);

  return (
    <Card>
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