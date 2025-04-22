import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTickets } from "./ticketApi";
import { ReactNode } from "react";

// Define Ticket type
interface Ticket {
  ticketTypeName: ReactNode;
  id: string;
  title: string;
  timeLogged: string;
  ticketType: string;
}

// Define initial state
interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
};

// Ticket slice
const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action: PayloadAction<Ticket[]>) => {
        state.loading = false;
        state.tickets = action.payload; //  Tickets are already serialized in ticketApi.ts
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export reducer
export default ticketSlice.reducer;
