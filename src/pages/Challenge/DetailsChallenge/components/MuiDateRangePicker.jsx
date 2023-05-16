import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

export const MuiDateRangePicker = ({
  handleChangeStartDate,
  handleChangeEndDate,
  startDate,
  endDate,
  startDateError,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <div style={{ marginTop: 20, display: 'grid', gap: 10 }}>
          <DateTimePicker
            value={startDate}
            maxDateTime={endDate ? dayjs(endDate) : null}
            error={startDateError}
            label="Start date"
            disabled
          />
          <DateTimePicker
            value={endDate}
            onChange={handleChangeEndDate}
            minDateTime={startDate ? dayjs(startDate) : null}
            label="End date"
            disabled
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
};
