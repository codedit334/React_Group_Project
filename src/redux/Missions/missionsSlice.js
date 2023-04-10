import axios from "axios"; // eslint-disable-line
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = "";
const initialState = {
  books: [],
  status: 'idle',
  error: null,
};

export const fetchMissions = createAsyncThunk('posts/fetchMissions', async () => {
  const response = await axios.get(url);
  return response.data;
});

export const addNewBook = createAsyncThunk(
  'posts/addNewBook',
  async (initialBook, { dispatch }) => {
    const response = await axios.post(url, initialBook);
    dispatch(fetchMissions());
    return response.data;
  },
);

export const deleteBook = createAsyncThunk(
  'posts/deleteBook',
  async (initialBook, { dispatch }) => {
    const response = await axios.delete(`${url}/${initialBook}`, initialBook);
    dispatch(fetchMissions());
    return response.data;
  },
);

const missionsSlice = createSlice({
  name: 'books',
  initialState,
  reducers: { },
  extraReducers(builder) {
    /* eslint-disable */
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    /* eslint-enable */
  },
});

export const { bookAdded, bookRemoved } = missionsSlice.actions;

export default missionsSlice.reducer;
