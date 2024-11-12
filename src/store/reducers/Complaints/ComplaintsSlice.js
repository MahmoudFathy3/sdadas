import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch All Complaints
export const fetchComplaints = createAsyncThunk(
  "complaints/fetchComplaints",
  async ({ managementId, unitId, page }, thunkAPI) => {
    {
      managementId, unitId, page;
    }
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Complaint/GetAllComplaint/${managementId}/${
          unitId ? unitId : 0
        }?pageNumber=${page}&pageSize=${10}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a newComplaint
// export const createComplaint = createAsyncThunk(
//   "complaints/createComplaint",
//   async (complaint, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_WEBSITE_API_URL}/ComplaintDocs/AddComplaintDoc`,
//         complaint,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// update a Complaint
export const updateComplaint = createAsyncThunk(
  "complaints/updateComplaint",
  async (complaint, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/ComplaintDocs/UpdateComplaintDoc`,
        complaint,
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

// delete a Complaint
export const deleteComplaint = createAsyncThunk(
  "complaints/deleteComplaint",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/ComplaintDocs/DeleteComplaintDoc/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ComplaintsSlice = createSlice({
  name: "complaints",
  initialState: {
    complaints: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaints.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.complaints = action.payload;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create a new complaints
    // builder
    //   .addCase(createComplaint.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(createComplaint.fulfilled, (state) => {
    //     state.isLoading = false;
    //   })
    //   .addCase(createComplaint.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload;
    //   });

    // update a complaint
    builder
      .addCase(updateComplaint.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComplaint.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateComplaint.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // delete a complaint
    builder.addCase(deleteComplaint.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default ComplaintsSlice.reducer;
