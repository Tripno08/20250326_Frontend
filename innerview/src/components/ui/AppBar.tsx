"use client";

import React, { useState } from 'react';
import { 
  AppBar as MuiAppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Menu, 
  MenuItem, 
  Avatar, 
  Box,
  Button,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '@/lib/hooks/useAuth';
import { useTheme } from '@/lib/hooks/useTheme';
import { useRouter } from 'next/navigation';

interface AppBarProps {
  onDrawerToggle: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({ onDrawerToggle }) => {
  const { user, logout } = useAuth({ requireAuth: true });
  const { themeMode, toggleTheme } = useTheme();
  const router = useRouter();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    handleClose();
    logout();
    router.push('/login');
  };
  
  return (
    <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Innerview
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={toggleTheme}>
            {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          
          <Button
            id="profile-button"
            aria-controls={open ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            color="inherit"
            startIcon={
              user?.avatar ? (
                <Avatar 
                  src={user.avatar} 
                  alt={user.nome} 
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user?.nome.charAt(0)}
                </Avatar>
              )
            }
          >
            {user?.nome?.split(' ')[0] || 'Usuário'}
          </Button>
          
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'profile-button',
            }}
          >
            <MenuItem onClick={handleClose}>
              <PersonIcon fontSize="small" sx={{ mr: 1 }} />
              Perfil
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
              Configurações
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              Sair
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar; 