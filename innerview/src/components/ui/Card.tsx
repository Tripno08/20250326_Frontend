"use client";

import React from 'react';
import { Card as MuiCard, CardContent, CardHeader, CardProps as MuiCardProps } from '@mui/material';

export interface CardProps extends MuiCardProps {
  title?: string;
  subheader?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subheader,
  action,
  ...props
}) => {
  return (
    <MuiCard {...props}>
      {title && (
        <CardHeader
          title={title}
          subheader={subheader}
          action={action}
        />
      )}
      <CardContent>
        {children}
      </CardContent>
    </MuiCard>
  );
};

export default Card; 