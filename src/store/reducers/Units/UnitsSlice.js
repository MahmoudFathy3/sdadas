import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Units
export const fetchUnits = createAsyncThunk(
  "units/fetchUnits",
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Unit/GetAllUnit?pageNumber=${page}&pageSize=${page === 0 ? 0 : 10}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Unit By ManagementID
export const fetchUnitByManagementID = createAsyncThunk(
  "units/fetchUnitByManagementID",
  async ({ managementId, BuildingId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Unit/GetAllUnitsBy/${managementId}/${
          BuildingId ? `${BuildingId}` : 0
        }`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new unit
export const createUnit = createAsyncThunk(
  "units/createUnit",
  async (units, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Unit/AddUnit`,
        units
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update a unit
export const UpdateUnit = createAsyncThunk(
  "units/UpdateUnit",
  async (units, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Unit/UpdateUnit`,
        units
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create units for building in complexe
export const CreateUnitsPatchAsync = createAsyncThunk(
  "units/CreateUnitsPatchAsync",
  async (units, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Unit/CreateUnitsPatchAsync`,
        units
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete unit
export const DeleteUnit = createAsyncThunk(
  "units/DeleteUnit",
  async (unitId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Unit/DeleteUnit/${unitId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const UnitsSlice = createSlice({
  name: "units",
  initialState: {
    isLoading: false,
    error: null,
    units: [],
    unitByManagementId: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.units = action.payload;
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Get Unit By ManagementID
    builder
      .addCase(fetchUnitByManagementID.fulfilled, (state, action) => {
        state.unitByManagementId = action.payload;
      })
      .addCase(fetchUnitByManagementID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new unit
    builder
      .addCase(createUnit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUnit.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Update a unit
    builder
      .addCase(UpdateUnit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateUnit.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(UpdateUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create units for building in complexe
    builder
      .addCase(CreateUnitsPatchAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateUnitsPatchAsync.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(CreateUnitsPatchAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete unit
    builder.addCase(DeleteUnit.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default UnitsSlice.reducer;
