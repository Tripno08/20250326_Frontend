"use client";

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  disabled = false,
  ...props
}) => {
  return (
    <MuiButton
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? 'Carregando...' : children}
    </MuiButton>
  );
};

export default Button; 