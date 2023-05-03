import * as React from 'react';
import Radio from '@mui/material/Radio';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import LaptopIcon from '@mui/icons-material/Laptop';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const label = { inputProps: { 'aria-label': 'Radio demo' } };

export default function IconRadios({ selectedIcon, setSelectedIcon }) {
  const handleIconChange = (event) => {
    setSelectedIcon(event.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Radio
          {...label}
          checked={selectedIcon === 'AutoStoriesIcon'}
          onChange={handleIconChange}
          value="AutoStoriesIcon"
          name="icon-radio"
          icon={<AutoStoriesIcon />}
          checkedIcon={<AutoStoriesIcon />}
        />
        <Radio
          {...label}
          checked={selectedIcon === 'laptop'}
          onChange={handleIconChange}
          value="laptop"
          name="icon-radio"
          icon={<LaptopIcon />}
          checkedIcon={<LaptopIcon />}
        />
        <Radio
          {...label}
          checked={selectedIcon === 'sport'}
          onChange={handleIconChange}
          value="sport"
          name="icon-radio"
          icon={<SportsHandballIcon />}
          checkedIcon={<SportsHandballIcon />}
        />
        <Radio
          {...label}
          checked={selectedIcon === 'alarm'}
          onChange={handleIconChange}
          value="alarm"
          name="icon-radio"
          icon={<AccessAlarmIcon />}
          checkedIcon={<AccessAlarmIcon />}
        />
        <Radio
          {...label}
          checked={selectedIcon === 'sleep'}
          onChange={handleIconChange}
          value="sleep"
          name="icon-radio"
          icon={<LocalHotelIcon />}
          checkedIcon={<LocalHotelIcon />}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Radio
          {...label}
          checked={selectedIcon === 'music'}
          onChange={handleIconChange}
          value="music"
          name="icon-radio"
          icon={<LibraryMusicIcon />}
          checkedIcon={<LibraryMusicIcon />}
        />

        <Radio
          {...label}
          checked={selectedIcon === 'food'}
          onChange={handleIconChange}
          value="food"
          name="icon-radio"
          icon={<RestaurantIcon />}
          checkedIcon={<RestaurantIcon />}
        />

        <Radio
          {...label}
          checked={selectedIcon === 'cross'}
          onChange={handleIconChange}
          value="cross"
          name="icon-radio"
          icon={<CloseIcon />}
          checkedIcon={<CloseIcon />}
        />
        <Radio
          {...label}
          checked={selectedIcon === 'add'}
          onChange={handleIconChange}
          value="add"
          name="icon-radio"
          icon={<AddIcon />}
          checkedIcon={<AddIcon />}
        />

        <Radio
          {...label}
          checked={selectedIcon === 'star'}
          onChange={handleIconChange}
          value="star"
          name="icon-radio"
          icon={<AutoAwesomeIcon />}
          checkedIcon={<AutoAwesomeIcon />}
        />
      </div>
    </div>
  );
}
