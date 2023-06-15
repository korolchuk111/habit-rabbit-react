import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { BaseOptionChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

AppWebsiteTasks.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppWebsiteTasks({ chartLabels, chartData, ...other }) {
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '20%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    // xaxis: { type: 'datetime' },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: (value) => `${value}%`,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}%`;
          }
          return y;
        },
      },
    },
  });

  return (

     <Card {...other} sx={{width: '90%'}}>
       <CardHeader />

       <Box sx={{ p: 3, pb: 1}} dir="ltr">
         <ReactApexChart type="area" series={chartData} options={chartOptions} height={248} />
       </Box>
     </Card>

  );
}
