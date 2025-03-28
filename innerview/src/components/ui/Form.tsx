"use client";

import React, { ReactNode } from 'react';
import { Box, Button, Stack, AlertProps, Alert } from '@mui/material';

interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
  error?: string;
  errorSeverity?: AlertProps['severity'];
  successMessage?: string;
  resetLabel?: string | null;
  onReset?: () => void;
  spacing?: number;
  disableSubmit?: boolean;
}

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  submitLabel = 'Salvar',
  isSubmitting = false,
  error,
  errorSeverity = 'error',
  successMessage,
  resetLabel = 'Cancelar',
  onReset,
  spacing = 2,
  disableSubmit = false,
}) => {
  return (
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ width: '100%' }}>
      <Stack spacing={spacing}>
        {error && (
          <Alert severity={errorSeverity} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {children}

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
          {resetLabel && onReset && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={onReset}
              disabled={isSubmitting}
            >
              {resetLabel}
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || disableSubmit}
          >
            {isSubmitting ? 'Enviando...' : submitLabel}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Form; 