import { configureStore } from '@reduxjs/toolkit';
import rocketReducer from './rockets/rocketsSlice';
import dragonReducer from './Dragons/dragonSlice';
import missionsReducer from './Missions/missionsSlice';

const store = configureStore({
  reducer: {
    missions: missionsReducer,
    dragons: dragonReducer,
    rockets: rocketReducer,
  },
});

export default store;
