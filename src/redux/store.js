import { configureStore } from '@reduxjs/toolkit';
import dragonReducer from './Dragons/dragonSlice';

const store = configureStore({
  reducer: {
    dragons: dragonReducer,
  },
});

export default store;
