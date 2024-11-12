import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/User/GetAllUser?pageNumber=${page}&pageSize=${page === 0 ? 0 : 10}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// fetch user by id
export const fetchDetailsUser = createAsyncThunk(
  "users/fetchDetailsUser",
  async (UserName, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Auth/detailsUser/${UserName}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Auth/register`,
        user,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Auth/editUserInDashboard`,
        user,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_WEBSITE_API_URL}/User/DeleteUser/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const UsersSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    users: [],
    detailsUser: {},
    error: null,
  },
  reducers: {
    ClearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // fetch user by id
    builder
      .addCase(fetchDetailsUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDetailsUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.detailsUser = action.payload;
      })
      .addCase(fetchDetailsUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new user
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete a user
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { ClearError } = UsersSlice.actions;

export default UsersSlice.reducer;
