// src/features/toggleSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  emailValue: "",
  uniqueEmailId: "",
};

export const Survey = createSlice({
  name: "Survey",
  initialState,
  reducers: {
    createSurvey: (state, action) => {
      state.emailValue = action.payload;
    },
    setUniqueEmailId: (state, action) => {
      state.uniqueEmailId = action.payload;
    },
  },
});

export const { createSurvey, setUniqueEmailId } = Survey.actions;
export default Survey.reducer;
