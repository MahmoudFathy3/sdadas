import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Facility/GetAllFacility?pageNumber=${page}&pageSize=${10}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a service
export const createService = createAsyncThunk(
  "services/createService",
  async (service, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Facility/AddFacility`,
        service
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a service
export const updateService = createAsyncThunk(
  "services/updateService",
  async (service, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Facility/UpdateFacility`,
        service
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a service

export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (serviceId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Facility/DeleteFacility/${serviceId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ServiceSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new service
    builder
      .addCase(createService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createService.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update a service
    builder
      .addCase(updateService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateService.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete a service
    builder.addCase(deleteService.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default ServiceSlice.reducer;
