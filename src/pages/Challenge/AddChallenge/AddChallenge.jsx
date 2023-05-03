import * as React from 'react';
import { Box, Button, Typography, IconButton, Modal, Stack } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { CirclePicker } from 'react-color';
import dayjs from 'dayjs';
import { MuiDateRangePicker } from './components/MuiDateRangePicker';
import FieldsMain from './components/FieldsMain';
import { useCreateChallenge } from '../../../api/challenge/useCreateChallenge';
import IconRadios from './components/IconRadios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  borderRadius: 2,
  backgroundColor: 'background.paper',
  border: '2px solid #4143E5',
  boxShadow: 24,
  p: 4,
};

export default function AddChallenge({ open, setOpen }) {
  const [color, setColor] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [addSubtask, setAddSubtask] = React.useState([]);
  const [toggleDays, setToggleDays] = React.useState([]);
  const [selectedIcon, setSelectedIcon] = React.useState('');
  const [startDateError, setStartDateError] = React.useState(null);

  // const [days, setDays] = React.useState();

  // React.useEffect(() => {
  //   setDays(toggleDays.map((day, index) => (day === index ? 1 : 0)));
  // }, [toggleDays]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleClose = () => setOpen(false);

  const { createChallenge } = useCreateChallenge({
    onSuccess: (data) => {
      console.log('Challenge added:', data);
      setOpen(false);
      window.location.reload();
    },
    onError: (error) => {
      console.error('Error adding challenge:', error);
    },
  });

  const handleChangeColor = (selectedColor) => {
    setColor(selectedColor.hex);
  };

  const handleChangeStartDate = (selectedStartDate) => {
    // const newStartDate = dayjs(selectedStartDate.$d).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const newStartDate = dayjs(selectedStartDate.$d);
    if (!endDate || newStartDate.isBefore(endDate)) {
      setStartDate(newStartDate);
      setStartDateError(null);
    } else {
      setStartDateError("Start date can't be after end date.");
    }
  };

  const handleChangeEndDate = (selectedEndDate) => {
    // const newEndDate = dayjs(selectedEndDate.$d).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const newEndDate = dayjs(selectedEndDate.$d);
    if (!startDate || newEndDate.isAfter(startDate)) {
      setEndDate(newEndDate);
      setStartDateError(null);
    } else {
      setStartDateError("End date can't be before start date.");
    }
  };

  const onSubmit = (data) => {
    console.log(toggleDays.join(''));
    createChallenge({
      title: data.titleChallenge,
      description: data.description,
      countOfUnits: data.countUnitsChallenge,
      unitId: data.unitsChallenge,
      frequency: toggleDays.join(''),
      iconName: selectedIcon,
      challengeTypeId: data.type,
      visibilityId: data.visibility,
      color,
      startDate: startDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      endDate: endDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      subtaskDtos: addSubtask,
      // subtaskDtos: [
      //   {
      //     title: data.titleSubtask,
      //     unitId: data.unitsSubtask,
      //     countOfUnits: data.unitsSubtaskCount,
      //   },
      // ],
    });
  };

  const showPickedIcon = (icon) => {
    console.info(icon); // prints {name: "access_alarm", code: "e190"}
  };
  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={style}>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
            <Close />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add challenge
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'flex', gap: 20 }}>
              <FieldsMain
                toggleDays={toggleDays}
                setToggleDays={setToggleDays}
                register={register}
                watch={watch}
                clearErrors={clearErrors}
                addSubtask={addSubtask}
                setAddSubtask={setAddSubtask}
                errors={errors}
              />
              <div>
                <CirclePicker color={color} onChange={handleChangeColor} />
                <IconRadios selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
                <MuiDateRangePicker
                  handleChangeStartDate={handleChangeStartDate}
                  handleChangeEndDate={handleChangeEndDate}
                  startDate={startDate}
                  endDate={endDate}
                  startDateError={startDateError}
                />
              </div>
            </div>
            <div style={{ float: 'right' }}>
              <Stack direction="row" spacing={2} marginTop={2}>
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </Stack>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
