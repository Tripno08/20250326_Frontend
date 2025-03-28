"use client";

import React from 'react';
import { 
  FormControl,
  FormHelperText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

interface DateFieldProps {
  name: string;
  label: string;
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
  error?: string;
  touched?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  format?: string;
  views?: Array<'year' | 'month' | 'day'>;
  disableFuture?: boolean;
  disablePast?: boolean;
}

export const DateField: React.FC<DateFieldProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  touched,
  helperText,
  required = false,
  disabled = false,
  minDate,
  maxDate,
  format = 'DD/MM/YYYY',
  views = ['year', 'month', 'day'],
  disableFuture = false,
  disablePast = false
}) => {
  const showError = touched && Boolean(error);
  const fieldHelperText = showError ? error : helperText;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormControl 
        fullWidth 
        margin="normal" 
        error={showError}
        required={required}
        disabled={disabled}
      >
        <DatePicker
          label={label}
          value={value}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          disableFuture={disableFuture}
          disablePast={disablePast}
          format={format}
          views={views}
          slotProps={{
            textField: {
              name,
              error: showError,
              required,
              disabled,
              fullWidth: true,
              inputProps: {
                'aria-label': label,
                'aria-required': required,
              }
            },
          }}
        />
        {fieldHelperText && <FormHelperText>{fieldHelperText}</FormHelperText>}
      </FormControl>
    </LocalizationProvider>
  );
};

export default DateField; 