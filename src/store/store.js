// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import Survey from './surveySlice'; // the reducer from your slice

export const store = configureStore({
  reducer: {
    surveyItem: Survey, 
  },
});
