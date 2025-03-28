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

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary[500],
      light: colors.primary[300],
      dark: colors.primary[700],
      contrastText: colors.common.white,
    },
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[300],
      dark: colors.secondary[700],
      contrastText: colors.common.white,
    },
    error: {
      main: colors.error.main,
      light: colors.error.light,
      dark: colors.error.dark,
      contrastText: colors.common.white,
    },
    warning: {
      main: colors.warning.main,
      light: colors.warning.light,
      dark: colors.warning.dark,
      contrastText: colors.common.black,
    },
    info: {
      main: colors.info.main,
      light: colors.info.light,
      dark: colors.info.dark,
      contrastText: colors.common.white,
    },
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
      contrastText: colors.common.white,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      disabled: colors.text.disabled,
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
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
          // Adicionar transição para hover
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
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
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default lightTheme; 