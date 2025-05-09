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
      console.log("state toggleTheme", state)
      console.log("state toggleTheme isDarkTheme", state.isDarkTheme)
      state.isDarkTheme = !state.isDarkTheme;
    }
  }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
