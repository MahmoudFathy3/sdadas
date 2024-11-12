import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Buildings
export const fetchBuildings = createAsyncThunk(
  "buildings/fetchBuildings",
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Building/GetAllBuilding?pageNumber=${page}&pageSize=${10}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get a building for complexe
export const fetchBuildingForComplexe = createAsyncThunk(
  "buildings/fetchBuildingForComplexe",
  async (complexe_id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Building/BuildingsDisplay/${complexe_id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new build
export const createBuilding = createAsyncThunk(
  "buildings/createBuilding",
  async (building, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Building/AddBuilding`,
        building
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a build
export const updateBuilding = createAsyncThunk(
  "buildings/updateBuilding",
  async (building, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Building/UpdateBuilding`,
        building
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a build
export const deleteBuilding = createAsyncThunk(
  "buildings/deleteBuilding",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Building/DeleteBuilding/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const BuildingSlice = createSlice({
  name: "buildings",
  initialState: {
    buildings: [],
    buildForComplexe: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuildings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBuildings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.buildings = action.payload;
      })
      .addCase(fetchBuildings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get all building for complexe
    builder
      .addCase(fetchBuildingForComplexe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBuildingForComplexe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.buildForComplexe = action.payload;
      })
      .addCase(fetchBuildingForComplexe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new build
    builder
      .addCase(createBuilding.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBuilding.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createBuilding.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update a build
    builder
      .addCase(updateBuilding.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBuilding.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateBuilding.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete a build
    builder.addCase(deleteBuilding.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default BuildingSlice.reducer;
