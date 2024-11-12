import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch All Invoices
export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async ({ ManagementId, page }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Invoice/GetInvoicesHistoryForManagement/${ManagementId}/0/0?pageNumber=${page}&pageSize=${10}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get invoice by id
export const fetchInvoiceById = createAsyncThunk(
  "invoices/fetchInvoiceById",
  async (invoiceId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_WEBSITE_API_URL
        }/Invoice/GetInvoiceDetails/${invoiceId}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// create a new Invoice
export const createInvoice = createAsyncThunk(
  "invoices/createInvoice",
  async (invoice, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Invoice/AddInvoice`,
        invoice
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update an invoice
export const updateInvoice = createAsyncThunk(
  "invoices/updateInvoice",
  async (invoice, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Invoice/UpdateInvoice`,
        invoice
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete an invoice
export const deleteInvoice = createAsyncThunk(
  "invoices/deleteInvoice",
  async (invoice, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_WEBSITE_API_URL}/Invoice/AddInvoice`,
        invoice
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const InvoicesSlice = createSlice({
  name: "invoices",
  initialState: {
    invoices: [],
    invoiceById: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // get invoice by id
    builder
      .addCase(fetchInvoiceById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.invoiceById = action.payload;
      })
      .addCase(fetchInvoiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // create a new invoice
    builder
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInvoice.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default InvoicesSlice.reducer;
