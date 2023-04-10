import axios from "axios"; // eslint-disable-line
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'https://api.spacexdata.com/v3/missions';
const initialState = {
  missions: [],
  status: 'idle',
  error: null,
};

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
      let newArr = state.missions.find((item) => {
        if (item.mission_id === id) {
          // item.reserved = true;
          console.log({ ...item, reserved: true });
          return { ...item, reserved: true };
        }
        return item;
      });
      // state.missions = newArr;
      // return [...state.missions, ...newArr];
      // return { ...state, missions: [...state.missions, ...newArr] };
      // console.log([newArr, ...state.missions]);
      newArr = state.missions.concat(newArr);
      console.log(newArr);
      return { ...state, missions: newArr };
    },
    leaveMission(state, action) {
      const id = action.payload;
      let newArr = state.missions.map((item) => {
        if (item.mission_id === id) {
          // item.reserved = false;
          return { ...item, reserved: true };
        }
        return item;
      });
      // state.missions = newArr;
      // return [...state.missions, ...newArr];
      // return { ...state, missions: [...state.missions, ...newArr] };
      newArr = newArr.concat(state.missions);
      return { ...state, missions: newArr };
    },
  },
  /* eslint-disable */

  extraReducers(builder) {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    /* eslint-enable */
  },
});

export const { missionAdded, reserveMission, leaveMission } = missionsSlice.actions;

export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async (initialState, { dispatch }) => {
    // eslint-disable-line
    const response = await axios.get(url);
    const newArr = await response.data.map((item) => ({
      mission_id: item.mission_id,
      mission_name: item.mission_name,
      description: item.description,
    }));
    dispatch(missionAdded(newArr));
    // return response.data;
  },
);

export default missionsSlice.reducer;
