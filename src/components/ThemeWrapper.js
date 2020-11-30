import { createMuiTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set } from '../services/store/reducers/themeSlice';
import { darkTheme, lightTheme } from '../services/theme';

export const ThemeWrapper = (props) => {
  let { children } = props;
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(lightTheme);
  const type = useSelector((state) => state.themeReducer.type);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => dispatch(set(prefersDarkMode ? 'dark' : type)), [prefersDarkMode]);

  useEffect(() => {
    if (type) setTheme(type === 'light' ? lightTheme : darkTheme);
  }, [type]);

  const muiTheme = createMuiTheme(theme);

  muiTheme.overrides = {
    MuiButton: {
      root: {
        backgroundColor: muiTheme.palette.secondary.main,
      },
      label: {
        color: muiTheme.palette.primary.contrastText,
      },
    },
    MuiFilledInput: {
      input: {
        '&:placeholder': {
          color: muiTheme.palette.primary.main,
        },
      },
    },
    MuiFormLabel: {
      root: {
        '&$focused': {
          color: grey[100],
        },
      },
    },
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
