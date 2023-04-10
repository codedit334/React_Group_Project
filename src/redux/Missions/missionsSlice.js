import axios from "axios"; // eslint-disable-line
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'https://api.spacexdata.com/v3/missions';
const initialState = {
  missions: [],
  status: 'idle',
  error: null,
};

export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async (initialState, { dispatch }) => {
    const response = await axios.get(url);
    const newArr = await response.data.map((item) => ({
      mission_id: item.mission_id,
      mission_name: item.mission_name,
      description: item.description,
    }));
    // eslint-disable-next-line no-use-before-define
    dispatch(missionAdded(newArr));
    // return response.data;
  },
);

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    missionAdded(state, action) {
      const newArr = state.missions.concat(action.payload);
      return { ...state, missions: newArr };
    },
    reserveMission(state, action) {
      const id = action.payload;
      const newArr = state.missions.map((item) => {
        if (item.mission_id === id) {
          return { ...item, reserved: true };
        }
        return item;
      });
      return { ...state, missions: newArr };
    },
    leaveMission(state, action) {
      const id = action.payload;
      const newArr = state.missions.map((item) => {
        if (item.mission_id === id) {
          return { ...item, reserved: false };
        }
        return item;
      });
      return { ...state, missions: newArr };
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchMissions.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(fetchMissions.fulfilled, (state) => ({ ...state, status: 'succeeded' }))
      .addCase(fetchMissions.rejected, (state, action) => ({ ...state, status: 'failed', error: action.error.message }));
  },
});

export const { missionAdded, reserveMission, leaveMission } = missionsSlice.actions;

export default missionsSlice.reducer;
