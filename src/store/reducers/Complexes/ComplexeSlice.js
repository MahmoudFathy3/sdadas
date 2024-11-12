import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get All Complexes
export const fetchComplexes = createAsyncThunk(
  "complexes/fetchComplexes",
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Management/GetAllManagement?pageNumber=${page}&pageSize=${
          page === 0 ? 0 : 10
        }`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new complexe
export const createComplexe = createAsyncThunk(
  "complexes/createComplexe",
  async (complexe, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Management/AddManagement`,
        complexe
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// fetch complexe with user
export const fetchComplexeUser = createAsyncThunk(
  "complexes/fetchComplexeUser",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Management/MangementsDisplayForSuberAdmin`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a complexe
export const updateComplexe = createAsyncThunk(
  "complexes/updateComplexe",
  async (complexe, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Management/UpdateManagement`,
        complexe
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a complexe
export const deleteComplexe = createAsyncThunk(
  "complexes/deleteComplexe",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Management/DeleteManagement/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ComplexesSlice = createSlice({
  name: "complexes",
  initialState: {
    isLoading: false,
    error: null,
    complexes: [],
    complexesUser: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplexes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComplexes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complexes = action.payload;
      })
      .addCase(fetchComplexes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // fetch complexe with user
    builder
      .addCase(fetchComplexeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComplexeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complexesUser = action.payload;
      })
      .addCase(fetchComplexeUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new complexe
    builder
      .addCase(createComplexe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComplexe.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createComplexe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update a complexe
    builder
      .addCase(updateComplexe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComplexe.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateComplexe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete a complexe
    builder.addCase(deleteComplexe.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default ComplexesSlice.reducer;
