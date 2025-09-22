// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import validEmailReducer from './validEmail'; // the reducer from your slice

export const store = configureStore({
  reducer: {
    validEmail: validEmailReducer, 
  },
});
