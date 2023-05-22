import {
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { Chart } from 'src/components/chart';
import { useContext } from 'react';
import { ExpenseContext } from 'src/contexts/expenses';

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

export const Donut = () => {
  const { categories } = useContext(ExpenseContext)
  const chartSeries = []
  const labels = []
  categories.forEach(category => {
    chartSeries.push(category.total)
    labels.push(category.category)
  })
  const chartOptions = useChartOptions(labels);

  return (
    <Card>
      <CardHeader title="CATEGORIES" />
      <CardContent>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="donut"
        />
      </CardContent>
    </Card>
  );
};