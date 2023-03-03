import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { useEffect } from "react";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Stack } from "@mui/material";

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

function WeekTimeline() {
  const [today, setToday] = React.useState(new Date());
  const [activeStep, setActiveStep] = React.useState(today.getDay());
  const [currentWeek, setCurrentWeek] = React.useState([]);

  useEffect(() => {
    const newDate = new Date();
    setToday(newDate);
    setWeek(newDate);
    // const dayOfWeek = newDate.getDay();
    // const todayDate = newDate.getDate();
    // const month = newDate.getMonth();
  }, []);

  const setWeek = (date) => {
    const dayOfWeek = date.getDay();
    const week = []
    for (let i = 0; i < dayOfWeek; i += 1)
    {
      const day = new Date();
      day.setDate(date.getDate() - (dayOfWeek - i))
      week.push(day);
    }
    for (let i = 0; i <= 6 - dayOfWeek; i += 1)
    {
      const day = new Date();
      day.setDate(date.getDate() + i)
      week.push(day);
    }
    setCurrentWeek(week)
  }

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <Stack sx={{ flexDirection: "row"}}>
      <ArrowBackIosRoundedIcon color={"action"} sx={{mr: 5}}/>
      <Stepper sx={{width: "80%"}} nonLinear activeStep={activeStep} alternativeLabel>
        {currentWeek.map((label, index) => (
          <Step key={label}>
            <StepButton
              icon={label.getDate()}
              color="inherit"
              onClick={handleStep(index)}
              optional={daysOfWeek[label.getDay()]}
            >
              {months[label.getMonth()]}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <ArrowForwardIosRoundedIcon color={"action"} sx={{ml: 5}}/>
    </Stack>
  );
}
export default WeekTimeline;
