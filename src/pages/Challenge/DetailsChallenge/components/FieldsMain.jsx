import * as React from 'react';
import styled from 'styled-components';
import { TextField, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useGetFrequency } from '../../../../api/frequency/useGetFrequency';
import { useGetUnit } from '../../../../api/unit/useGetUnit';
import ToggleDays from './ToggleDays';

const visibility = [
  {
    id: 1,
    type: 'Only me',
  },
  {
    id: 2,
    type: 'Friends',
  },
  {
    id: 3,
    type: 'All users',
  },
];

const type = [
  {
    id: 1,
    type: 'Build a habit',
  },
  {
    id: 2,
    type: 'Quit a habit',
  },
];

export default function FieldsMain({
  challengeTitle,
  setChallengeTitle,
  challengeDescription,
  setChallengeDescription,
  challengeCountOfUnits,
  setChallengeCountOfUnits,
  unitSelected,
  setUnitSelected,
  toggleDays,
  setToggleDays,
  challenge,
  setChallenge,
}) {
  const [unit, setUnit] = React.useState([]);
  const [visibilitySelected, setVisibilitySelected] = React.useState('');
  const [typeSelected, setTypeSelected] = React.useState('');
  const [defaultDays, setDefaultDays] = React.useState('');

  const { getUnit } = useGetUnit({
    onSuccess: (data) => {
      setUnit(data);
    },
    onError: (error) => {
      console.error('Error getting unit:', error);
    },
  });

  React.useEffect(() => {
    getUnit();
  }, []);

  React.useEffect(() => {
    setDefaultDays(challenge.frequency);
  }, [challenge.frequency]);

  React.useEffect(() => {
    setUnitSelected(unit.find((item) => item.type === challenge.unitTitle)?.id);
  }, [unit, challenge.unitTitle]);

  React.useEffect(() => {
    setTypeSelected(challenge.challengeTypeId);
  }, [type, challenge.challengeTypeId]);

  React.useEffect(() => {
    setVisibilitySelected(visibility.find((item) => item.type === challenge.visibilityType)?.id);
  }, [visibility, challenge.visibilityType]);

  const handleTitleChange = (e) => {
    setChallengeTitle(e.target.value);
  };

  return (
    <DivMain>
      <DivInputs>
        <TextField
          label="Title"
          name="titleChallenge"
          id="outlined-size-small"
          placeholder="Title"
          size="small"
          value={challengeTitle}
          disabled
        />
        <TextField
          label="Description"
          name="description"
          id="outlined-size-small"
          placeholder="Description"
          size="small"
          value={challengeDescription}
          disabled
        />
        <DivDropdown>
          <TextField
            name="countUnitsChallenge"
            label="Units"
            id="outlined-size-small"
            placeholder="Units"
            size="small"
            value={challengeCountOfUnits}
            setChallengeCountOfUnits
            disabled
          />
          <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginLeft: 20 }}>
            {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              label="Unit"
              value={unitSelected}
              disabled
            >
              {unit.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DivDropdown>
        <DivMain>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Visibility</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={visibilitySelected}
              label="Visibility"
              onChange={(e) => {
                setVisibilitySelected(e.target.value);
                setChallenge({ ...challenge, visibilityType: e.target.value });
              }}
              disabled
            >
              {visibility.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginLeft: 20 }}>
            <InputLabel id="demo-select-small">Type</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={typeSelected}
              label="Type"
              onChange={(e) => {
                setTypeSelected(e.target.value);
                setChallenge({ ...challenge, challengeTypeId: e.target.value });
              }}
              disabled
            >
              {type.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DivMain>
        {challenge && <ToggleDays toggleDays={toggleDays} setToggleDays={setToggleDays} challenge={challenge} />}
      </DivInputs>
    </DivMain>
  );
}

const DivMain = styled.div({
  display: 'flex',
  width: 400,
});

const DivDropdown = styled.div({
  display: 'flex',
});

const DivInputs = styled.div({
  display: 'grid',
  gap: 16,
  marginTop: 20,
});
