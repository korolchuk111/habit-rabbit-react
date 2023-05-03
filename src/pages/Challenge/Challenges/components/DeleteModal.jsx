import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDeleteChallenge } from '../../../../api/challenge/useDeleteChallenge';

export default function DeleteModal({ openDelete, setOpenDelete, selectedChallengeId }) {
  const { deleteChallenge } = useDeleteChallenge({
    onSuccess: () => {
      console.log('Challenge deleted successfully!');
      window.location.reload();
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
        <DialogTitle id="alert-dialog-title">{'Видалити елемент?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ви дійсно хочете видалити елемент {selectedChallengeId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Відмінити</Button>
          <Button onClick={handleDelete} autoFocus>
            Видалити
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
