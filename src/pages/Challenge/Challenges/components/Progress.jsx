import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';

function Progress({ startDate, endDate }) {
  function calculatePercentage(startDate, endDate) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const difference = end - start;

    const oneDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.floor(difference / oneDay);
    const remainingDays = Math.ceil((end - Date.now()) / oneDay);

    const percentage = 100 - ((remainingDays / totalDays) * 100).toFixed(2);

    return percentage;
  }


  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={30}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={30}
        thickness={4}
        value={calculatePercentage(startDate, endDate)}
      />
    </Box>
  );
}

export default function CustomizedProgressBars({ startDate, endDate }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Progress variant="determinate" startDate={startDate} endDate={endDate} />
    </Box>
  );
}
