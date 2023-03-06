import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { useState } from "react";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Button, Stack } from "@mui/material";

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
  'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

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
  return week;
}

function WeekTimeline({onDayChange}) {
  const [today] = useState(new Date());
  const [activeStep, setActiveStep] = useState(today);
  const [currentWeek, setCurrentWeek] = useState(() => setWeek(today));
  const [isInWeek, setIsInWeek] = useState(true);

  const handleStep = (step) => () => {
    setActiveStep(step);
    onDayChange(step);
    setStep(currentWeek);
  };

  const nextWeek = () => {
    const next = []
    let lastDate = currentWeek[6];
    for (let i = 0; i <= 6; i += 1)
    {
      const date = new Date();
      date.setDate(lastDate.getDate() + 1);
      next.push(date);
      lastDate = date;
    }
    setCurrentWeek(next);
    setStep(next);
  }

  const prevWeek = () => {
    const previous = []
    const firstDate = currentWeek[0];
    for (let i = 7; i > 0; i -= 1)
    {
      const date = new Date();
      date.setDate(firstDate.getDate() - i)
      previous.push(date);
    }
    setCurrentWeek(previous);
    setStep(previous);
  }

  const setStep = (newWeek) => {
    try {
      const actDate = activeStep.getDate();
      const actMonth = activeStep.getMonth();
      const actYear = activeStep.getYear();
      const inWeekDay = newWeek[activeStep.getDay()];
      const weekDate = inWeekDay.getDate();
      const weekMonth = inWeekDay.getMonth();
      const weekYear = inWeekDay.getYear();
      if (actDate === weekDate && actMonth === weekMonth && actYear === weekYear)
      {
        setIsInWeek(true);
      }
      else {
        setIsInWeek(false);
      }

    } catch {
      setIsInWeek(false)
    }
  }
  return (
    <Stack sx={{ flexDirection: "row"}}>
      {currentWeek.length !== 0 && activeStep != null ?
        <>
          <Button size="small" onClick={() => prevWeek()}>
            <ArrowBackIosRoundedIcon color={"action"} sx={{mr: "15pt"}}/>
          </Button>
          <Stepper sx={{width: "75%"}} nonLinear
                   activeStep={isInWeek ? activeStep.getDay() : -1}
                   alternativeLabel
          >
            {currentWeek.map((label) => (
              <Step key={label}>
                <StepButton
                  icon={label.getDate()}
                  color="inherit"
                  onClick={handleStep(label)}
                  optional={daysOfWeek[label.getDay()]}
                >
                  {months[label.getMonth()]}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <Button size="small" onClick={() => nextWeek()}>
            <ArrowForwardIosRoundedIcon color={"action"} sx={{ml: "15pt"}}/>
          </Button>
        </> :
        <span>Loading...</span>}
    </Stack>
  );
}
export default WeekTimeline;
