import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDeleteChallenge } from '../../../../api/challenge/useDeleteChallenge';

export default function DeleteModal({ openDelete, setOpenDelete, selectedChallengeId, updateChallenges }) {
  const { deleteChallenge } = useDeleteChallenge({
    onSuccess: () => {
      console.log('Challenge deleted successfully!');
      updateChallenges(); // Оновити список челенджів після успішного видалення
    },
    onError: (error) => {
      console.error('Error deleting challenge:', error);
    },
  });

  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleDelete = () => {
    const challengeId = selectedChallengeId;
    setOpenDelete(false);
    deleteChallenge({ challengeId: selectedChallengeId });
  };

  return (
    <div>
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete this challenge?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this challenge?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
