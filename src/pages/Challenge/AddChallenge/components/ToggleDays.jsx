import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import sc from 'styled-components';
import { useFormContext } from 'react-hook-form';

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

const ToggleDays = ({ toggleDays, setToggleDays, errors, clearErrors, register }) => {
  const handleToggle = (event, value) => {
    const newDays = [...toggleDays];
    DAYS.forEach((day, index) => {
      newDays[index] = value.includes(index) ? 1 : 0;
    });
    setToggleDays(newDays);
  };

  return (
    <>
      <StyledToggleButtonGroup
        size="small"
        aria-label="Days of the week"
        value={toggleDays.map((value, index) => (value === 1 ? index : null)).filter((value) => value !== null)}
        onChange={handleToggle}
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

const ErrorMessage = sc.span({
  color: 'red',
  fontSize: '0.8rem',
  display: 'block',
});
