import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all crafts

export const fetchCrafts = createAsyncThunk(
  "crafts/fetchCrafts",
  async ({ page }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Work/GetAllWorkByToken?pageNumber=${page}&pageSize=${
          page === 0 ? 0 : 10
        }`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new craft
export const createCraft = createAsyncThunk(
  "crafts/createCraft",
  async (craft, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Work/AddWork`,
        craft
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a craft
export const updateCraft = createAsyncThunk(
  "crafts/updateCraft",
  async (craft, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Work/UpdateWork`,
        craft
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a craft

export const deleteCraft = createAsyncThunk(
  "crafts/deleteCraft",
  async (craftId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Work/DeleteWork/${craftId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const CraftsSlice = createSlice({
  name: "crafts",
  initialState: {
    crafts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrafts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCrafts.fulfilled, (state, action) => {
        state.loading = false;
        state.crafts = action.payload;
      })
      .addCase(fetchCrafts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create a new craft
      .addCase(createCraft.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCraft.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // update a craft
    builder
      .addCase(updateCraft.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCraft.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // delete a craft
    builder.addCase(deleteCraft.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default CraftsSlice.reducer;
