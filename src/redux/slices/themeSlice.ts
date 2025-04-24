import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  isDarkTheme: boolean;
}

const initialState: ThemeState = {
  isDarkTheme: false
};

const themeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
