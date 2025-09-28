// src/features/toggleSlice.js
import { createSlice } from '@reduxjs/toolkit';
const initialState = { emailValue: ''};

 export const Survey = createSlice({
  name: 'Survey',
  initialState,
  reducers: {

    createSurvey: (state, action) => { 
      state.emailValue = action.payload; 
    }

  },
});

export const { createSurvey } = Survey.actions;
export default Survey.reducer;
