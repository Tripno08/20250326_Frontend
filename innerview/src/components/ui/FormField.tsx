"use client";

import React from 'react';
import { 
  TextField, 
  TextFieldProps, 
  FormControl, 
  FormHelperText, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent,
  FormControlLabel, 
  Checkbox
} from '@mui/material';

interface FormFieldBaseProps {
  error?: string;
  touched?: boolean;
  helperText?: string;
}

interface TextFieldComponentProps extends FormFieldBaseProps {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  textFieldProps: Omit<TextFieldProps, 'error' | 'helperText'>;
}

interface SelectFieldComponentProps extends FormFieldBaseProps {
  type: 'select';
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (e: SelectChangeEvent) => void;
  required?: boolean;
  disabled?: boolean;
}

interface CheckboxFieldComponentProps extends FormFieldBaseProps {
  type: 'checkbox';
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

type FormFieldProps = 
  | TextFieldComponentProps 
  | SelectFieldComponentProps 
  | CheckboxFieldComponentProps;

export const FormField: React.FC<FormFieldProps> = (props) => {
  const showError = props.touched && Boolean(props.error);
  const fieldHelperText = showError ? props.error : props.helperText;

  switch (props.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'number':
    case 'tel':
    case 'url':
      return (
        <TextField
          type={props.type}
          error={showError}
          helperText={fieldHelperText}
          fullWidth
          margin="normal"
          {...props.textFieldProps}
        />
      );

    case 'select':
      return (
        <FormControl 
          fullWidth 
          margin="normal" 
          error={showError}
          required={props.required}
          disabled={props.disabled}
        >
          <InputLabel id={`${props.name}-label`}>{props.label}</InputLabel>
          <Select
            labelId={`${props.name}-label`}
            name={props.name}
            value={props.value}
            label={props.label}
            onChange={props.onChange}
          >
            {props.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {fieldHelperText && <FormHelperText>{fieldHelperText}</FormHelperText>}
        </FormControl>
      );

    case 'checkbox':
      return (
        <FormControl 
          fullWidth 
          margin="normal" 
          error={showError}
          disabled={props.disabled}
        >
          <FormControlLabel
            control={
              <Checkbox
                name={props.name}
                checked={props.checked}
                onChange={props.onChange}
              />
            }
            label={props.label}
          />
          {fieldHelperText && <FormHelperText>{fieldHelperText}</FormHelperText>}
        </FormControl>
      );
  }
};

export default FormField; 