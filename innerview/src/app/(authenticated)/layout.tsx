"use client";

import React, { useState, useEffect } from 'react';
import { Box, Toolbar } from '@mui/material';
import AppBar from '@/components/ui/AppBar';
import Drawer from '@/components/ui/Drawer';
import { useAuth } from '@/lib/hooks/useAuth';

const DRAWER_WIDTH = 280;

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated } = useAuth({ requireAuth: true });
  
  // Forçar revalidação ao montar o componente
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
  }, [isAuthenticated]);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  if (!isAuthenticated) {
    // Mostrar nada enquanto o redirecionamento ocorre
    return null;
  }
  
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar onDrawerToggle={handleDrawerToggle} />
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerToggle}
        drawerWidth={DRAWER_WIDTH}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { lg: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
} 