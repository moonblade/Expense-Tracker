import PropTypes from 'prop-types';
import ComputerDesktopIcon from '@heroicons/react/24/solid/ComputerDesktopIcon';
import DeviceTabletIcon from '@heroicons/react/24/solid/DeviceTabletIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Chart } from 'src/components/chart';
import { useContext } from 'react';
import { ExpenseContext } from 'src/contexts/expenses';
import { Scrollbar } from 'src/components/scrollbar';

const useChartOptions = (labels) => {
  return {
    chart: {
      background: 'transparent'
    },
    dataLabels: {
      minAngleToShowLabel: 10,
      formatter: function (_, opts) {
            return opts.w.config.series[opts.seriesIndex]
      },
    },
    labels,
    legend: {
      position: 'bottom'
    },
    plotOptions: {
      pie: {
        // expandOnClick: false
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    stroke: {
      width: 0
    },
    tooltip: {
      fillSeriesColor: false
    }
  };
};

export const Categories = (props) => {
  const { sx } = props;
  const { categories } = useContext(ExpenseContext)
  const chartSeries = []
  const labels = []
  categories.forEach(category => {
    chartSeries.push(category.total)
    labels.push(category.category)
  })
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="Categories" />
      <CardContent>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="donut"
        />
        {
      //   <Scrollbar sx={{ flexGrow: 1 }}>
      //   <Box>
      //     <Table>
      //       <TableHead>
      //         <TableRow>
      //           <TableCell>
      //             Category
      //           </TableCell>
      //           <TableCell sortDirection="desc">
      //             Amount
      //           </TableCell>
      //         </TableRow>
      //       </TableHead>
      //       <TableBody>
      //         {
      //             
      //             categories.map((item, id) => {
      //           return (
      //             <TableRow
      //               hover
      //               key={id}
      //             >
      //               <TableCell>
      //                 {item.category}
      //               </TableCell>
      //               <TableCell>
      //                 {item.total}
      //               </TableCell>
      //             </TableRow>
      //           );
      //         })}
      //       </TableBody>
      //     </Table>
      //   </Box>
      // </Scrollbar>
        }
      </CardContent>
    </Card>
  );
};