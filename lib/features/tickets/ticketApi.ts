// ticketApi.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTickets } from '../../network/apirequest';

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async (_, { rejectWithValue }) => {
    try {
      const tickets = await getTickets();
      return tickets;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to load tickets.");
    }
  }
);
