import { CssBaseline, createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material';
import { useAppSelector } from '../redux/hooks';

interface AppProviderProps {
  children: React.ReactNode;
}

const FONT = 'Outfit';
export const themeLight = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },

  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '*::-webkit-scrollbar': {
            width: '5px'
          },
          '*::-webkit-scrollbar-track': {
            background: '#FF0000'
          },
          '*::-webkit-scrollbar-thumb': {
            background: '#FF0000',
            borderRadius: '2px'
          }
        }
      }
    }
  },

  // Color palette //

  palette: {
    mode: 'light',

    primary: {
      main: '#174891'
    },
    secondary: {
      main: '#698095'
    },
    error: {
      main: '#CB4335'
    },
    background: {
      paper: '#FFFFFF',
      default: '#F8F8F8'
    },
    whiteTwo: {
      main: '#F0F0F0'
    },
    border: {
      main: '#CDCCCC'
    },
    green: {
      main: '#228343'
    },
    textTitle: {
      main: '#334A52',
      light: '#698095'
    },
    tertiary: {
      main: '#E7F5F8'
    },
    disable: {
      main: '#79CADB'
    },
    inputLabel: {
      main: '#A5B3BF'
    },
    icon: {
      main: '#698095',
      light: '#A5B3BF'
    },
    placeholder: {
      main: '#C8C8C8'
    }
  },

  // Typography //

  typography: {
    fontFamily: FONT,

    headlineMedium: {
      fontSize: '28px',
      fontWeight: '500',
      fontFamily: FONT
    },
    titleMedium: {
      fontSize: '24px',
      fontWeight: '500',
      fontFamily: FONT,
      lineHeight: '30px'
    },
    titleSmall: {
      fontSize: '20px',
      fontWeight: '500',
      fontFamily: FONT,
      lineHeight: '24px'
    },
    labelLarge: {
      fontSize: '18px',
      fontWeight: '500',
      fontFamily: FONT,
      lineHeight: '22px'
    },
    labelMedium: {
      fontSize: '16px',
      fontWeight: '500',
      fontFamily: FONT,
      lineHeight: '20px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      fontFamily: FONT,
      lineHeight: '20px'
    },

    text: {
      fontSize: '12px',
      fontWeight: '500',
      fontFamily: FONT,
      lineHeight: '16px'
    }
  }
});

export const themeDark = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          '*::-webkit-scrollbar': {
            width: '5px'
          },
          '*::-webkit-scrollbar-track': {
            background: '#FF0000'
          },
          '*::-webkit-scrollbar-thumb': {
            background: '#FF0000',
            borderRadius: '2px'
          }
        }
      }
    }
  },

  // Color Palette //

  palette: {
    mode: 'dark',

    primary: {
      main: '#174891'
    },
    secondary: {
      main: '#D2D2D2'
    },
    error: {
      main: '#CB4335'
    },
    background: {
      paper: '#1F1F1F',
      default: '#151515'
    },
    whiteTwo: {
      main: '#2D2D2D'
    },
    border: {
      main: '#373737'
    },
    green: {
      main: '#228343'
    },
    textTitle: {
      main: '#F5F5F5',
      light: '#D2D2D2'
    },
    tertiary: {
      main: '#2D2D2D'
    },
    disable: {
      main: '#3C3C3C'
    },
    inputLabel: {
      main: '#7A7A7A'
    },
    icon: {
      main: '#698095',
      light: '#7A7A7A'
    },
    placeholder: {
      main: '#8F8F8F'
    }
  },

  // Typography //

  typography: {
    fontFamily: FONT,

    headlineMedium: {
      fontSize: '28px',
      fontWeight: '500',
      fontFamily: FONT
    },
    titleMedium: {
      fontSize: '24px',
      fontWeight: '500',
      fontFamily: FONT,
      lineHeight: '30px'
    },
    titleSmall: {
      fontSize: '20px',
      fontWeight: '500',
      fontFamily: FONT,
      lineHeight: '24px'
    },
    labelLarge: {
      fontSize: '18px',
      fontWeight: '500',
      fontFamily: FONT,
      lineHeight: '22px'
    },
    labelMedium: {
      fontSize: '16px',
      fontWeight: '500',
      fontFamily: FONT,
      lineHeight: '20px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      fontFamily: FONT,
      lineHeight: '20px'
    },

    text: {
      fontSize: '12px',
      fontWeight: '500',
      fontFamily: FONT,
      lineHeight: '16px'
    }
  }
});

const ThemeDark = responsiveFontSizes(themeDark);
const ThemeLight = responsiveFontSizes(themeLight);

export const AppProvider = ({ children }: AppProviderProps) => {
  const isDarkTheme = useAppSelector((state) => {
    console.log("state, ", state)
    return state.themeMode.isDarkTheme
  });
  return (
    <ThemeProvider theme={isDarkTheme ? ThemeDark : ThemeLight}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
