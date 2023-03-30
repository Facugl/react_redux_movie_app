import { type SettingsState } from '@/types/settings';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: SettingsState = {
  themeMode: 'dark'
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<string>) => {
      state.themeMode = action.payload;
    }
  }
});

export const { setThemeMode } = settingsSlice.actions;

export default settingsSlice.reducer;
