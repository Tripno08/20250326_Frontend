"use client";

import React, { useState, useRef } from 'react';
import {
  FormControl,
  FormHelperText,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface FileUploadFieldProps {
  name: string;
  label: string;
  value: File[];
  onChange: (files: File[]) => void;
  error?: string;
  touched?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // em bytes
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  touched,
  helperText,
  required = false,
  disabled = false,
  accept,
  multiple = false,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB por padrão
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const showError = (touched && Boolean(error)) || Boolean(fileError);
  const fieldHelperText = showError ? (error || fileError || '') : helperText;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFiles = (files: FileList | File[]): File[] => {
    const fileArray = Array.from(files);
    
    // Verificar número máximo de arquivos
    if (multiple && fileArray.length + value.length > maxFiles) {
      setFileError(`Número máximo de ${maxFiles} arquivos excedido.`);
      return [];
    }
    
    // Verificar tamanho dos arquivos
    const oversizedFiles = fileArray.filter(file => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      setFileError(`Arquivo(s) maior(es) que ${maxSize / (1024 * 1024)}MB.`);
      return [];
    }
    
    // Verificar tipos de arquivo se accept for especificado
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const invalidFiles = fileArray.filter(file => {
        return !acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            // Extensão de arquivo (.pdf, .jpg, etc)
            return file.name.endsWith(type);
          } else {
            // Tipo MIME (image/*, application/pdf, etc)
            if (type.endsWith('/*')) {
              const mainType = type.split('/')[0];
              return file.type.startsWith(mainType);
            }
            return file.type === type;
          }
        });
      });
      
      if (invalidFiles.length > 0) {
        setFileError(`Tipo(s) de arquivo inválido(s). Aceitamos apenas: ${accept}`);
        return [];
      }
    }
    
    setFileError(null);
    return fileArray;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled) return;
    
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = validateFiles(e.dataTransfer.files);
      if (validFiles.length > 0) {
        if (multiple) {
          onChange([...value, ...validFiles]);
        } else {
          onChange(validFiles.slice(0, 1));
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const validFiles = validateFiles(e.target.files);
      if (validFiles.length > 0) {
        if (multiple) {
          onChange([...value, ...validFiles]);
        } else {
          onChange(validFiles.slice(0, 1));
        }
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  // Função para formatar tamanho de arquivo
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <FormControl
      fullWidth
      margin="normal"
      error={showError}
      required={required}
      disabled={disabled}
    >
      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        sx={{
          border: '2px dashed',
          borderColor: dragActive ? 'primary.main' : showError ? 'error.main' : 'divider',
          borderRadius: 1,
          p: 3,
          textAlign: 'center',
          bgcolor: dragActive ? 'primary.50' : 'background.paper',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.7 : 1,
          transition: 'all 0.2s',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          name={name}
          id={name}
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          aria-label={label}
          aria-required={required}
          aria-invalid={showError}
          aria-describedby={`${name}-helper-text`}
          style={{ display: 'none' }}
          disabled={disabled}
        />
        <Box sx={{ mb: 2 }}>
          <UploadIcon color="primary" sx={{ fontSize: 40 }} />
        </Box>
        <Typography variant="body1" gutterBottom>
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Arraste e solte arquivos aqui ou clique para selecionar
        </Typography>
        {accept && (
          <Typography variant="caption" color="text.secondary" display="block">
            Formatos aceitos: {accept}
          </Typography>
        )}
        <Typography variant="caption" color="text.secondary" display="block">
          Tamanho máximo: {maxSize / (1024 * 1024)}MB
        </Typography>
        {multiple && (
          <Typography variant="caption" color="text.secondary" display="block">
            Máximo de {maxFiles} arquivos
          </Typography>
        )}
        <Button
          variant="outlined"
          size="small"
          startIcon={<UploadIcon />}
          sx={{ mt: 2 }}
          disabled={disabled}
          tabIndex={-1}
        >
          Selecionar arquivos
        </Button>
      </Box>

      {fieldHelperText && (
        <FormHelperText id={`${name}-helper-text`}>{fieldHelperText}</FormHelperText>
      )}

      {value.length > 0 && (
        <Paper elevation={0} variant="outlined" sx={{ mt: 2 }}>
          <List dense sx={{ py: 0 }}>
            {value.map((file, index) => (
              <ListItem key={`${file.name}-${index}`} divider={index < value.length - 1}>
                <InsertDriveFileIcon color="primary" sx={{ mr: 1 }} />
                <ListItemText
                  primary={file.name}
                  secondary={formatFileSize(file.size)}
                  primaryTypographyProps={{ noWrap: true }}
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    onClick={() => handleRemove(index)}
                    disabled={disabled}
                    aria-label={`Remover arquivo ${file.name}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </FormControl>
  );
};

export default FileUploadField; 