import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { toggleTheme } from '../redux/slices/themeSlice';

const ThemeToggle = () => {
  const isDark = useAppSelector((state) => state.themeMode.isDarkTheme);
  const dispatch = useAppDispatch();

  return (
    <FormControlLabel
      control={<Switch checked={isDark} onChange={() => dispatch(toggleTheme())} />}
      label={isDark ? 'Dark Mode' : 'Light Mode'}
    />
  );
};

export default ThemeToggle;
