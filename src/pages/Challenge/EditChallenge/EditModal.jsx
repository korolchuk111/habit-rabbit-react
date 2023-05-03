import * as React from 'react';
import { useEffect } from 'react';
import { Box, Button, Typography, IconButton, Modal, Stack } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { CirclePicker } from 'react-color';
import dayjs from 'dayjs';
import { MuiDateRangePicker } from './components/MuiDateRangePicker';
import FieldsMain from './components/FieldsMain';
import { useGetChallenge } from '../../../api/challenge/useGetChallenge';
import { useUpdateChallenge } from '../../../api/challenge/useUpdateChallenge';

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

export default function EditModal({ openEdit, setOpenEdit, selectedChallengeId }) {
  const [challenge, setChallenge] = React.useState([]);
  const [challengeTitle, setChallengeTitle] = React.useState('');
  const [challengeDescription, setChallengeDescription] = React.useState('');
  const [challengeCountOfUnits, setChallengeCountOfUnits] = React.useState(null);
  const [unitSelected, setUnitSelected] = React.useState('');

  const [color, setColor] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [toggleDays, setToggleDays] = React.useState([]);
  const [startDateError, setStartDateError] = React.useState(null);

  const { register, handleSubmit, reset } = useForm();

  const { getChallenge } = useGetChallenge({
    onSuccess: (data) => {
      setChallenge(data);
    },
    onError: (error) => {
      console.error('Error getting challenge:', error);
    },
  });

  useEffect(() => {
    getChallenge({ id: +selectedChallengeId });
  }, [selectedChallengeId]);

  useEffect(() => {
    if (challenge.frequency) {
      setToggleDays(challenge.frequency);
    }
    if (challenge.startDate) {
      setStartDate(dayjs(challenge.startDate));
    }
    if (challenge.endDate) {
      setEndDate(dayjs(challenge.endDate));
    }
  }, [challenge]);

  useEffect(() => {
    if (challenge.countOfUnits) {
      setChallengeCountOfUnits(challenge.countOfUnits);
    }   
  }, [challenge.countOfUnits]);

  useEffect(() => {
    if (challenge.title) {
      setChallengeTitle(challenge.title);
    }
  }, [challenge.title]);

  useEffect(() => {
    if (challenge.description) {
      setChallengeDescription(challenge.description);
    }
  }, [challenge.description]);

  useEffect(() => {
    setColor(challenge.color);
  }, [challenge.color]);

  const handleClickOpen = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

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

  const { updateChallenge } = useUpdateChallenge({
    onSuccess: (data) => {
      console.log('Challenge updated:', data);
      setOpenEdit(false);
      window.location.reload();
    },
    onError: (error) => {
      console.error('Error updating challenge:', error);
    },
  });

  const onSubmit = (data) => {
    updateChallenge({
      id: selectedChallengeId,
      title: challengeTitle,
      description: challengeDescription,
      countOfUnits: challengeCountOfUnits,
      unitId: unitSelected,
      frequency: Array.isArray(toggleDays) ? toggleDays.join('') : toggleDays,
      iconName: 'mdiWaterCheck',
      color,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    });
  };

  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={style}>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
            <Close />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit challenge
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: 'flex', gap: 20 }}>
              <FieldsMain
                challengeTitle={challengeTitle}
                setChallengeTitle={setChallengeTitle}
                challengeDescription={challengeDescription}
                setChallengeDescription={setChallengeDescription}
                challengeCountOfUnits={challengeCountOfUnits}
                setChallengeCountOfUnits={setChallengeCountOfUnits}
                unitSelected={unitSelected}
                setUnitSelected={setUnitSelected}
                toggleDays={toggleDays}
                setToggleDays={setToggleDays}
                challenge={challenge}
                setChallenge={setChallenge}
                register={register}
              />
              <div>
                <CirclePicker color={color} onChange={handleChangeColor} />
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
