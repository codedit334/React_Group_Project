import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDragons = createAsyncThunk('dragons/fetchDragons', async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v4/dragons');
    const data = response.json();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
});

const initialState = {
  dragons: [],
  isLoading: true,
};

export const DragonsSlice = createSlice({
  name: 'dragons',
  initialState,
  reducers: {
    reserve: (state, action) => {
      const newdragons = (state.dragons.map((dragon) => {
        if (dragon.id !== action.payload) return dragon;
        return { ...dragon, reserved: true };
      }));
      return ({
        ...state,
        dragons: newdragons,
      });
    },
    cancel: (state, action) => {
      const newdragons = (state.dragons.map((dragon) => {
        if (dragon.id !== action.payload) return dragon;
        return { ...dragon, reserved: false };
      }));
      return ({
        ...state,
        dragons: newdragons,
      });
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDragons.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(fetchDragons.fulfilled, (state, action) => {
        const newdragons = [];
        action.payload.map((item) => (
          newdragons.push({
            id: item.id,
            name: item.name,
            description: item.description,
            flickr_image: item.flickr_images[0],
            reserved: false,
          })
        ));
        return ({
          ...state,
          isLoading: false,
          dragons: newdragons,
        });
      })
      .addCase(fetchDragons.rejected, (state) => ({
        ...state,
        isLoading: false,
      }));
  },
});

export const { reserve, cancel } = DragonsSlice.actions;
export default DragonsSlice.reducer;
