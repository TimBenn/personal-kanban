import { blueGrey, grey, red } from '@material-ui/core/colors';

export const lightTheme = {
  palette: {
    type: 'light',
    primary: {
      main: red[600],
      contrastText: grey[50],
    },
    secondary: {
      main: blueGrey[500],
      contrastText: grey[50],
    },
  },
};

export const darkTheme = {
  palette: {
    type: 'dark',
    primary: {
      main: grey[800],
    },
    secondary: {
      main: grey[400],
    },
  },
};
