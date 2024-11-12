import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All governorate
export const fetchGovernorates = createAsyncThunk(
  "governorate/fetchGovernorates",
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/State/GetAllState?pageNumber=${page}&pageSize=${page === 0 ? 0 : 10}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new governorate
export const createGovernorate = createAsyncThunk(
  "governorate/createGovernorate",
  async (governorate, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/State/AddState`,
        governorate
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a governorate
export const updateGovernorate = createAsyncThunk(
  "governorate/updateGovernorate",
  async (governorate, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_WEBSITE_API_URL}/State/UpdateState`,
        governorate
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a governorate
export const deleteGovernorate = createAsyncThunk(
  "governorate/deleteGovernorate",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_WEBSITE_API_URL}/State/DeleteState/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const GrogovernorateSlice = createSlice({
  name: "governorate",
  initialState: {
    governorates: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // Add your reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGovernorates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGovernorates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.governorates = action.payload;
      })
      .addCase(fetchGovernorates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new state
    builder
      .addCase(createGovernorate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGovernorate.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createGovernorate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update a state
    builder
      .addCase(updateGovernorate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGovernorate.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateGovernorate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete a state
    builder.addCase(deleteGovernorate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default GrogovernorateSlice.reducer;
