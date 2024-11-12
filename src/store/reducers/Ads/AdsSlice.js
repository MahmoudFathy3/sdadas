import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch All Ads
export const fetchAds = createAsyncThunk(
  "ads/fetchAds",
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Ads/GetAllAds?pageNumber=${page}&pageSize=${10}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new ads
export const createAds = createAsyncThunk(
  "ads/createAds",
  async (ads, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Ads/AddAds`,
        ads,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update an ads
export const updateAds = createAsyncThunk(
  "ads/updateAds",
  async (ads, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Ads/UpdateAds`,
        ads,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete an ads
export const deleteAds = createAsyncThunk(
  "ads/deleteAds",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Ads/DeleteAds/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const AdsSlice = createSlice({
  name: "ads",
  initialState: {
    ads: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ads = action.payload;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // create a new ads
      .addCase(createAds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAds.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createAds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update an ads
    builder
      .addCase(updateAds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAds.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete an ads
    builder.addCase(deleteAds.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default AdsSlice.reducer;
