import { createTheme } from '@mui/material/styles';
import { colors, typography } from '../tokens';

// Converter os estilos de tipografia dos tokens
const convertTypographyStyles = (style: Record<string, unknown>): Record<string, unknown> => {
  const { textTransform, ...rest } = style;
  return {
    ...rest,
    ...(textTransform ? { textTransform: textTransform as 'none' | 'capitalize' | 'uppercase' | 'lowercase' } : {})
  };
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary[200],
      light: colors.primary[100],
      dark: colors.primary[400],
      contrastText: colors.grey[900],
    },
    secondary: {
      main: colors.secondary[200],
      light: colors.secondary[100],
      dark: colors.secondary[400],
      contrastText: colors.grey[900],
    },
    error: {
      main: colors.error.light,
      light: '#ff8a80',
      dark: colors.error.main,
      contrastText: colors.grey[900],
    },
    warning: {
      main: colors.warning.light,
      light: '#ffe57f',
      dark: colors.warning.main,
      contrastText: colors.grey[900],
    },
    info: {
      main: colors.info.light,
      light: '#80d8ff',
      dark: colors.info.main,
      contrastText: colors.grey[900],
    },
    success: {
      main: colors.success.light,
      light: '#b9f6ca',
      dark: colors.success.main,
      contrastText: colors.grey[900],
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
      disabled: '#787878',
    },
    grey: colors.grey,
  },
  typography: {
    fontFamily: typography.fontFamily.primary,
    h1: convertTypographyStyles(typography.styles.h1),
    h2: convertTypographyStyles(typography.styles.h2),
    h3: convertTypographyStyles(typography.styles.h3),
    h4: convertTypographyStyles(typography.styles.h4),
    h5: convertTypographyStyles(typography.styles.h5),
    h6: convertTypographyStyles(typography.styles.h6),
    subtitle1: convertTypographyStyles(typography.styles.subtitle1),
    subtitle2: convertTypographyStyles(typography.styles.subtitle2),
    body1: convertTypographyStyles(typography.styles.body1),
    body2: convertTypographyStyles(typography.styles.body2),
    button: convertTypographyStyles(typography.styles.button),
    caption: convertTypographyStyles(typography.styles.caption),
    overline: convertTypographyStyles(typography.styles.overline),
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: typography.fontWeight.semiBold,
          borderRadius: '8px',
        },
        sizeLarge: {
          padding: '10px 22px',
          fontSize: typography.fontSize.md,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        },
        elevation2: {
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
        },
        elevation3: {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
});

export default darkTheme; 