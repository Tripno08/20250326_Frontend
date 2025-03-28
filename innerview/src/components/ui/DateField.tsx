"use client";

import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { FormHelperText, FormControl } from '@mui/material';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

interface DateFieldProps {
  name: string;
  label: string;
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  format?: string;
  views?: Array<'year' | 'month' | 'day'>;
  disableFuture?: boolean;
  disablePast?: boolean;
}

const DateField: React.FC<DateFieldProps> = ({
  name,
  label,
  value,
  onChange,
  required = false,
  error = false,
  helperText,
  disabled = false,
  minDate,
  maxDate,
  format = 'DD/MM/YYYY',
  views = ['year', 'month', 'day'],
  disableFuture = false,
  disablePast = false
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <FormControl fullWidth error={error}>
        <DatePicker
          label={label + (required ? ' *' : '')}
          value={value}
          onChange={onChange}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          disableFuture={disableFuture}
          disablePast={disablePast}
          format={format}
          views={views}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: 'outlined',
              error: error,
              name: name,
              InputLabelProps: {
                shrink: true,
              },
            },
          }}
        />
        {helperText && (
          <FormHelperText>{helperText}</FormHelperText>
        )}
      </FormControl>
    </LocalizationProvider>
  );
};

export default DateField; 