"use client";

import React from 'react';
import { 
  Drawer as MuiDrawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  Groups as GroupsIcon,
  Description as DescriptionIcon,
  Settings as SettingsIcon,
  Code as CodeIcon
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  drawerWidth: number;
}

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

export const Drawer: React.FC<DrawerProps> = ({ open, onClose, drawerWidth }) => {
  const pathname = usePathname();
  const router = useRouter();
  
  const menuItems: MenuItem[] = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Estudantes', icon: <PeopleIcon />, path: '/students' },
    { text: 'Intervenções', icon: <SchoolIcon />, path: '/interventions' },
    { text: 'Avaliações', icon: <AssessmentIcon />, path: '/assessments' },
    { text: 'Equipes', icon: <GroupsIcon />, path: '/teams' },
    { text: 'Relatórios', icon: <DescriptionIcon />, path: '/reports' },
  ];

  // Determine se estamos em ambiente de desenvolvimento
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Itens de documentação apenas para ambiente de desenvolvimento
  const documentationItems: MenuItem[] = isDevelopment 
    ? [{ text: 'Componentes UI', icon: <CodeIcon />, path: '/components-demo' }] 
    : [];

  const handleNavigation = (path: string) => {
    router.push(path);
    if (onClose && window.innerWidth < 1200) {
      onClose();
    }
  };

  // Versão para dispositivos móveis (temporária quando o drawer está aberto)
  const mobileDrawer = (
    <MuiDrawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', lg: 'none' },
        '& .MuiDrawer-paper': { 
          boxSizing: 'border-box', 
          width: drawerWidth,
        },
      }}
    >
      <DrawerContent 
        menuItems={menuItems} 
        documentationItems={documentationItems}
        pathname={pathname} 
        handleNavigation={handleNavigation} 
        isDevelopment={isDevelopment}
      />
    </MuiDrawer>
  );

  // Versão para desktop (permanentemente visível)
  const desktopDrawer = (
    <MuiDrawer
      variant="permanent"
      sx={{
        display: { xs: 'none', lg: 'block' },
        '& .MuiDrawer-paper': { 
          boxSizing: 'border-box', 
          width: drawerWidth,
        },
      }}
      open
    >
      <DrawerContent 
        menuItems={menuItems} 
        documentationItems={documentationItems}
        pathname={pathname} 
        handleNavigation={handleNavigation}
        isDevelopment={isDevelopment}
      />
    </MuiDrawer>
  );

  return (
    <>
      {mobileDrawer}
      {desktopDrawer}
    </>
  );
};

interface DrawerContentProps {
  menuItems: MenuItem[];
  documentationItems: MenuItem[];
  pathname: string;
  handleNavigation: (path: string) => void;
  isDevelopment: boolean;
}

const DrawerContent: React.FC<DrawerContentProps> = ({ 
  menuItems, 
  documentationItems,
  pathname, 
  handleNavigation,
  isDevelopment
}) => {
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'primary.main',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: pathname === item.path ? 'primary.contrastText' : 'inherit' 
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={pathname === '/settings'}
            onClick={() => handleNavigation('/settings')}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configurações" />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Links de documentação apenas em desenvolvimento */}
      {isDevelopment && documentationItems.length > 0 && (
        <>
          <Divider />
          <Box sx={{ px: 2, pt: 2, pb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Documentação (Apenas DEV)
            </Typography>
          </Box>
          <List>
            {documentationItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'secondary.light',
                      color: 'secondary.contrastText',
                      '& .MuiListItemIcon-root': {
                        color: 'secondary.contrastText',
                      },
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'secondary.main',
                    },
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </div>
  );
};

export default Drawer; 