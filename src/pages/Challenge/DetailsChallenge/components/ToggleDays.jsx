import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const DAYS = [
  {
    key: 'sunday',
    label: 'S',
  },
  {
    key: 'monday',
    label: 'M',
  },
  {
    key: 'tuesday',
    label: 'T',
  },
  {
    key: 'wednesday',
    label: 'W',
  },
  {
    key: 'thursday',
    label: 'T',
  },
  {
    key: 'friday',
    label: 'F',
  },
  {
    key: 'saturday',
    label: 'S',
  },
];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  margin: (theme) => theme.spacing(2),
  padding: (theme) => theme.spacing(0, 1),
  // '&:not(:first-child)': {
  //   // border: '1px solid',
  //   // borderColor: '#42a5f5',
  //   // borderRadius: '50%',
  // },
  // '&:first-child': {
  //   border: '1px solid',
  //   borderColor: '#42a5f5',
  //   // borderRadius: '50%',
  // },
});

const StyledToggle = styled(ToggleButton)(({ theme }) => ({
  color: '#2065d1',
  '&.Mui-selected': {
    color: 'white',
    background: '#2065d1',
  },
  '&:hover': {
    borderColor: '#6f9be1',
    background: '#6f9be1',
  },
  '&.Mui-selected:hover': {
    borderColor: '#2065d1',
    background: '#2065d1',
  },
  minWidth: 32,
  maxWidth: 32,
  height: 32,
  textTransform: 'unset',
  fontSize: '0.75rem',
}));

const ToggleDays = ({ toggleDays, setToggleDays, challenge }) => {
  const initialDays = challenge.frequency?.split('').map(val => parseInt(val, 2));

  return (
    <>
      <StyledToggleButtonGroup
        size="small"
        aria-label="Days of the week"
        value={initialDays.map((value, index) => (value === 1 ? index : null)).filter((value) => value !== null)}
      >
        {DAYS.map((day, index) => (
          <StyledToggle key={day.key} value={index} aria-label={day.key}>
            {day.label}
          </StyledToggle>
        ))}
      </StyledToggleButtonGroup>
    </>
  );
};

export default ToggleDays;
