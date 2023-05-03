import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { ListItemIcon } from '@mui/material';
import { useGetChallenge } from '../../../../api/challenge/useGetChallenge';
import EditModal from '../../EditChallenge/EditModal';
import DetailsModal from '../../DetailsChallenge/DetailsModal';

export default function LongMenu({
  setOpenDelete,
  openEdit,
  setOpenEdit,
  openDetails,
  setOpenDetails,
  selectedChallengeId,
  setSelectedChallengeId,
  id,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [challenge, setChallenge] = React.useState([]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDetails = () => {
    setAnchorEl(null);
    setOpenDetails(true);
    setSelectedChallengeId(id);
  };
  const handleDelete = () => {
    setAnchorEl(null);
    setOpenDelete(true);
    setSelectedChallengeId(id);
  };

  // const { getChallenge } = useGetChallenge({
  //   onSuccess: (data) => {
  //     setChallenge(data);
  //   },
  //   onError: (error) => {
  //     console.error('Error getting challenge:', error);
  //   },
  // });
  const handleEdit = () => {
    setAnchorEl(null);
    setOpenEdit(true);
    setSelectedChallengeId(id);
    // getChallenge({ id: +id });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="Open menu"
        sx={{ padding: '8px' }}
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ fontSize: '1.5rem' }} />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleDetails}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          Details
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <DetailsModal
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        selectedChallengeId={selectedChallengeId}
      />
      <EditModal
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        selectedChallengeId={selectedChallengeId}
      />
    </div>
  );
}
