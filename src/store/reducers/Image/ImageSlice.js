import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch All Image
export const fetchImages = createAsyncThunk(
  "image/fetchImages",
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/SliderImage/GetSliderImageByToken?pageNumber=${page}&pageSize=${10}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// create a new Image

export const createImage = createAsyncThunk(
  "image/createImage",
  async (image, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/SliderImage/AddSliderImage`,
        image,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err.response.data);

      return rejectWithValue(err.response.data);
    }
  }
);

const ImageSlice = createSlice({
  name: "image",
  initialState: {
    isLoading: false,
    error: null,
    images: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // create a new image
      .addCase(createImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createImage.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = ImageSlice.actions;

export default ImageSlice.reducer;
