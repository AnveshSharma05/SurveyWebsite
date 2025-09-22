// src/features/toggleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const validEmail = createSlice({
  name: 'validEmail',
  initialState: { value: false }, // starts as false
  reducers: {
    toggle: (state) => { state.value = !state.value; },
    setTrue: (state) => { state.value = true; },
    setFalse: (state) => { state.value = false; },
  },
});

export const { toggle, setTrue, setFalse } = validEmail.actions;
export default validEmail.reducer;
