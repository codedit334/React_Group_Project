import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  rockets: [],
  isRocketLoading: true,
};

export const getRockets = createAsyncThunk('rockets/getRockets', async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/rockets');
    const data = response.json();
    return data;
  } catch (err) {
    return err;
  }
});

export const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reserveRocket: (state) => ({
      ...state,
    }),
    cancelReservation: (state) => ({
      ...state,
    }),

  },
  extraReducers: (builder) => {
    builder
      .addCase(getRockets.pending, (state) => ({
        ...state,
        isRocketLoading: true,
      }))
      .addCase(getRockets.fulfilled, (state, action) => {
        const newrockets = [];
        action.payload.map((element) => (
          newrockets.push({
            id: element.id,
            rocket_name: element.rocket_name,
            description: element.description,
            flickr_image: element.flickr_images[0],
          })
        ));
        return ({
          ...state,
          isRocketLoading: false,
          rockets: newrockets,
        });
      })
      .addCase(getRockets.rejected, (state) => ({
        ...state,
        isRocketLoading: false,
      }));
  },
});

export const { reserveRocket, cancelReservation } = rocketsSlice.actions;
export default rocketsSlice.reducer;
