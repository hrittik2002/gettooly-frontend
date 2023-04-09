import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';

const theme = createTheme({
    typography: {
      fontFamily: 'Roboto, sans-serif',
      body1: {
        fontSize: '1.125rem',
        lineHeight: 1.5,
        marginBottom: '1.5rem',
      },
    },
  });

  <ThemeProvider theme={theme}>
    <div>
      <Typography variant="body1">
        Hello, world!
      </Typography>
    </div>
  </ThemeProvider>
