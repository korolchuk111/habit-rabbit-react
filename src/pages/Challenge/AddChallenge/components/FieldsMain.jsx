import * as React from 'react';
import styled from 'styled-components';
import { TextField, InputLabel, MenuItem, FormControl, Select, Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useGetFrequency } from '../../../../api/frequency/useGetFrequency';
import { useGetUnit } from '../../../../api/unit/useGetUnit';
import ToggleDays from './ToggleDays';

export default function FieldsMain({
  toggleDays,
  setToggleDays,
  register,
  watch,
  clearErrors,
  addSubtask,
  setAddSubtask,
  errors,
}) {
  // const [frequency, setFrequency] = React.useState([]);
  const [unit, setUnit] = React.useState([]);
  const [unitSelected, setUnitSelected] = React.useState('');
  const [frequencySelected, setFrequencySelected] = React.useState('');
  const [visibilitySelected, setVisibilitySelected] = React.useState('');
  const [typeSelected, setTypeSelected] = React.useState('');
  const [subTaskUnitsSelected, setSubTaskUnitsSelected] = React.useState([]);

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

  const handleChangeUnit = ({ target: { value } }) => {
    setUnitSelected(value);
  };

 

  const handleChangeVisibility = ({ target: { value } }) => setVisibilitySelected(value);

  const handleChangeSubTaskUnits = ({ target: { value } }) => setSubTaskUnitsSelected(value);

  const handleChangeType = ({ target: { value } }) => setTypeSelected(value);

  const handleAddSubtask = () => {

    setAddSubtask([...addSubtask, { title: '', countOfUnits: '', unitId: null }]);

  };

  const handleDeleteSubtask = (index) => {
    const updatedSubtasks = [...addSubtask];
    updatedSubtasks.splice(index, 1);
    setAddSubtask(updatedSubtasks);
  };

  const handleChangeAddSubtask = (e, index) => {
    const { name, value } = e.target;
    const newSubTask = [...addSubtask];
    newSubTask[index] = { ...newSubTask[index], [name]: value };
    setAddSubtask(newSubTask);
  };

  const handleChangeSelect = (e, index) => {
    const { value } = e.target;
    const newSubTask = [...addSubtask];
    newSubTask[index] = { ...newSubTask[index], unitId: value };
    setAddSubtask(newSubTask);
  };

  console.log(addSubtask, 'data');
  return (
    <DivMain>
      <DivInputs>
        <div>
          <TextField
            {...register('titleChallenge', {
              required: 'This input is required.',
            })}
            label="Title"
            name="titleChallenge"
            id="outlined-size-small"
            placeholder="Tilte"
            size="small"
          />
          {errors.titleChallenge && <ErrorMessage>{errors.titleChallenge.message}</ErrorMessage>}{' '}
        </div>
        <TextField  style={{ marginTop: 10 }}
          {...register('description', {
            required: 'This input is required.',
          })}
          label="Description"
          name="description"
          id="outlined-size-small"
          placeholder="Description"
          size="small"
        />
        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}{' '}
        <DivDropdown  style={{ marginTop: 10 }}>
          <div>
            <TextField
              {...register('countUnitsChallenge', {
                required: 'This input is required.',
                pattern: {
                  value: /\d+/,
                  message: 'This input is number only.',
                },
              })}
              name="countUnitsChallenge"
              label="Units"
              id="outlined-size-small"
              placeholder="Units"
              size="small"
            />
            {errors.countUnitsChallenge && <ErrorMessage>{errors.countUnitsChallenge.message}</ErrorMessage>}{' '}
          </div>
          <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginLeft: 10 }}>
            {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
            <Select
              {...register('unitsChallenge', { required: true })}
              labelId="demo-select-small"
              id="demo-select-small"
              label="Unit"
              defaultValue={watch('unitsChallenge')}
              onChange={(e) => {
                handleChangeUnit(e);
                clearErrors('unitsChallenge');
              }}
              error={Boolean(errors.unitsChallenge)}
            >
              {unit.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.type}
                </MenuItem>
              ))}
            </Select>
            {errors.unitsChallenge && <ErrorMessage>This field is required</ErrorMessage>}{' '}
          </FormControl>
        </DivDropdown>
        <DivMain style={{ marginTop: 10, marginBottom: 10 }}>
         
          <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginLeft: 0 }}>
            <InputLabel id="demo-select-small">Type</InputLabel>
            <Select
              {...register('type', { required: true })}
              labelId="demo-select-small"
              id="demo-select-small"
              defaultValue={watch('type')}
              label="Type"
              onChange={(e) => {
                handleChangeType(e);
                clearErrors('type');
              }}
            >
              <MenuItem value={1}>Build a habit</MenuItem>
              <MenuItem value={2}>Quit a habit</MenuItem>
            </Select>
            {errors.type && <ErrorMessage>This field is required</ErrorMessage>}{' '}
          </FormControl>
        </DivMain>
        <ToggleDays style={{ marginTop: 10 }}
          toggleDays={toggleDays}
          setToggleDays={setToggleDays}
          errors={errors}
          clearErrors={clearErrors}
          register={register}
        />
        <div>
          <Button size="large" style={{ marginTop: 5, marginBottom: 5 }}
          onClick={() => handleAddSubtask()} startIcon={<AddCircleIcon sx={{ fontSize: 40 }} />}>
            Add subtask
          </Button>
          {addSubtask.map((item, index) => {
            return (
              <DivSubTask key={index}>
                <DivDropdown>
                  <TextField
                 
                    label="Title"
                    name="title"
                    id="outlined-size-small"
                    placeholder="Tilte"
                    size="small"
                    onChange={(e) => handleChangeAddSubtask(e, index)}
                  />
                  <TextField
                    // {...register('unitsSubtaskCount')}
                    name="countOfUnits"
                    label="Units"
                    id="outlined-size-small"
                    placeholder="Units"
                    size="small"
                    onChange={(e) => handleChangeAddSubtask(e, index)}
                  />
                  <FormControl sx={{ minWidth: 120 }} size="small" style={{ marginLeft: 20 }}>
                    {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
                    <Select
                      name="unitId"
                      labelId={`demo-select-small-${index}`}
                      id={`demo-select-small-${index}`}
                      value={item.unitId || ''}
                      label="SubtaskUnits"
                      onChange={(e) => handleChangeSelect(e, index)}
                    >
                      {unit.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton onClick={() => handleDeleteSubtask(index)}>
                    <ClearIcon />
                  </IconButton>
                </DivDropdown>
              </DivSubTask>
            );
          })}
        </div>
      </DivInputs>
    </DivMain>
  );
}

const DivMain = styled.div({
  display: 'flex',
  width: 400,
});

const DivSubTask = styled.div({
  display: 'flex',
  paddingBottom: 10,
});

const DivDropdown = styled.div({
  display: 'flex',
  gap: 10,
});

const DivInputs = styled.div({
  display: 'grid',
  marginTop: 20,
});

const ErrorMessage = styled.span({
  color: 'red',
  fontSize: '0.8rem',
  display: 'block',
});
