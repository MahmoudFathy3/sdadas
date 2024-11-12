import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all notifications
export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (page, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Notification/GetAllNotificationWithPagination?pageNumber=${page}&pageSize=${10}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new notification
export const createNotification = createAsyncThunk(
  "notification/createNotification",
  async (notification, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Notification/SendNotificationForAll`,
        notification
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a notification
export const updateNotification = createAsyncThunk(
  "notification/updateNotification",
  async (notification, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Notification/UpdateNotification`,
        notification
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a notification
export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (notificationId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Notification/DeleteNotification/${notificationId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create a new notification
      .addCase(createNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNotification.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // update a notification
    builder
      .addCase(updateNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNotification.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // delete a notification
    builder.addCase(deleteNotification.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default NotificationSlice.reducer;
