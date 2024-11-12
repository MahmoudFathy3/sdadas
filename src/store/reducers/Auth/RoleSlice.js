import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Roles
export const fetchRole = createAsyncThunk(
  "role/fetchRole",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Auth/getAvailableRoles`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const RoleSlice = createSlice({
  name: "role",
  initialState: {
    isLoading: false,
    error: null,
    Role: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Role = action.payload;
      })
      .addCase(fetchRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default RoleSlice.reducer;
