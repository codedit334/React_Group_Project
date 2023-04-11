import { configureStore } from '@reduxjs/toolkit';
import dragonReducer from './Dragons/dragonSlice';
import missionsReducer from './Missions/missionsSlice';

const store = configureStore({
  reducer: {
    missions: missionsReducer,
    dragons: dragonReducer,
  },
});

export default store;
