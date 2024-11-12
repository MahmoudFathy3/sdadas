import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all workers
export const fetchWorkers = createAsyncThunk(
  "workers/fetchWorkers",
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/UserWork/GetAllUserWork?pageNumber=${page}&pageSize=${
          page === 0 ? 0 : 10
        }`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new workers
export const createWorkers = createAsyncThunk(
  "workers/createWorker",
  async (workers, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/UserWork/AddUserWork`,
        workers
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a worker
export const updateWorkers = createAsyncThunk(
  "workers/updateWorker",
  async (workers, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_WEBSITE_API_URL}/UserWork/UpdateUserWork`,
        workers
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a worker
export const deleteWorkers = createAsyncThunk(
  "workers/deleteWorker",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_WEBSITE_API_URL}/UserWork/DeleteUserWork/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const WorkersSlice = createSlice({
  name: "workers",
  initialState: {
    workers: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.loading = false;
        state.workers = action.payload;
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // create a new workers
      .addCase(createWorkers.pending, (state) => {
        state.loading = true;
      })
      .addCase(createWorkers.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // update a worker
    builder
      .addCase(updateWorkers.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWorkers.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // delete a worker
    builder.addCase(deleteWorkers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError } = WorkersSlice.actions;

export default WorkersSlice.reducer;
