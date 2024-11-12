import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch All Home

export const fetchHomes = createAsyncThunk(
  "homes/fetchHomes",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Dashboard/GetCounts`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const HomeSlice = createSlice({
  name: "homes",
  initialState: {
    homes: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // Add your reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchHomes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.homes = action.payload;
      })
      .addCase(fetchHomes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default HomeSlice.reducer;
