import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: '',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    set: (state, action) => void (state.type = action.payload),
    purge: (state) => initialState,
  },
});

export const { set, purge } = themeSlice.actions;

export default themeSlice.reducer;
