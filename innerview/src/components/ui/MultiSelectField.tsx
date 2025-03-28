"use client";

import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  SelectChangeEvent,
  OutlinedInput
} from '@mui/material';

interface MultiSelectFieldProps {
  name: string;
  label: string;
  value: string[];
  options: { value: string; label: string }[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
  error?: string;
  touched?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  maxSelections?: number;
}

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  name,
  label,
  value,
  options,
  onChange,
  error,
  touched,
  helperText,
  required = false,
  disabled = false,
  maxSelections,
}) => {
  const showError = touched && Boolean(error);
  const fieldHelperText = showError ? error : helperText;

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const newValue = event.target.value;
    
    // Se maxSelections está definido, limitar o número de seleções
    if (maxSelections && Array.isArray(newValue) && newValue.length > maxSelections) {
      return;
    }
    
    onChange(event);
  };

  return (
    <FormControl
      fullWidth
      margin="normal"
      error={showError}
      required={required}
      disabled={disabled}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        multiple
        name={name}
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {(selected as string[]).map((selectedValue) => {
              const option = options.find(opt => opt.value === selectedValue);
              return (
                <Chip key={selectedValue} label={option?.label || selectedValue} />
              );
            })}
          </Box>
        )}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={
              maxSelections
                ? value.length >= maxSelections && !value.includes(option.value)
                : false
            }
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {fieldHelperText && <FormHelperText>{fieldHelperText}</FormHelperText>}
      {maxSelections && value.length >= maxSelections && (
        <FormHelperText>
          Máximo de {maxSelections} seleções alcançado
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default MultiSelectField; 