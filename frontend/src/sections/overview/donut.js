import { Card, CardContent } from "@mui/material";
import { Chart } from "src/components/chart";
import { useContext } from "react";
import { ExpenseContext } from "src/contexts/expenses";
import categoryInfo from "./categories";

export const Donut = () => {
  const { categories, filter, updateFilter } = useContext(ExpenseContext);
  const useChartOptions = (labels) => {
    return {
      chart: {
        background: "transparent",
        events: {
          dataPointSelection: function (_, __, config) {
            const index = config.selectedDataPoints?.[0]?.[0];
            if (index != undefined) {
              updateFilter({...filter, category: categories[index].category})
            } else {
              updateFilter({...filter, category: undefined})
            }
          },
        },
      },
      dataLabels: {
        minAngleToShowLabel: 10,
        formatter: function (_, opts) {
          return opts.w.config.series[opts.seriesIndex];
        },
      },
      labels,
      colors: categories.map(category => categoryInfo[category?.category]?.color),
      legend: {
        position: "bottom",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "50%"
          }
          // expandOnClick: false
        },
      },
      states: {
        active: {
          filter: {
            type: "none",
          },
        },
        hover: {
          filter: {
            type: "none",
          },
        },
      },
      stroke: {
        width: 0,
      },
      tooltip: {
        fillSeriesColor: false,
      },
    };
  };
  const chartSeries = [];
  const labels = [];
  categories.forEach((category) => {
    chartSeries.push(category.total);
    labels.push(category.category);
  });
  const chartOptions = useChartOptions(labels);

  return (
    <Card>
      <CardContent>
        <Chart options={chartOptions} series={chartSeries} type="donut" />
      </CardContent>
    </Card>
  );
};