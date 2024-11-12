import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { AES } from "crypto-js";

// Login provider
export const createLogin = createAsyncThunk(
  "login/create",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Auth/token`,
        user
      );

      if (res.data) {
        // Store the token in Cookies
        Cookies.set(
          "user",
          AES.encrypt(
            JSON.stringify(res.data),
            import.meta.env.VITE_WEBSITE_COOKIES_KEY
          ),
          {
            secure: true,
            expires: 2 / 48, // 1 hour
          }
        );

        //  set token from Headers
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
      }

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createLogout = createAsyncThunk(
  "login/createLogout",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Auth/signout`
      );

      Cookies.remove("user");
      axios.defaults.headers.common["Authorization"] = "";

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(createLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create logout
    builder
      .addCase(createLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(createLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = LoginSlice.actions;

export default LoginSlice.reducer;
