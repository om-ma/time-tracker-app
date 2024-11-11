import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the Ticket interface
export interface Ticket {
  ticket_id: number;
  type: string;
  summary: string;
  detail: string;
  hours: number;
  timer: string;
  notes: string;
}

// Define the API response structure for fetching multiple tickets
interface TicketApiResponse {
  ticket: Ticket[];
  total: number;
  skip: number;
  limit: number;
}

// Define the API slice with endpoints for GET, POST, PUT, DELETE
export const ticketApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/tickets" }),
  reducerPath: "ticketApi",
  tagTypes: ["Tickets"],  // Used for caching and invalidation
  endpoints: (build) => ({
    // GET: Fetch a list of tickets
    getTickets: build.query<TicketApiResponse, number>({
      query: (limit = 100) => `?limit=${limit}`,  // Query string with limit
      providesTags: () => [{ type: "Tickets", id: "LIST" }],  // Cache for list of tickets
    }),

    // POST: Create a new ticket
    createTicket: build.mutation<Ticket, Omit<Ticket, "ticket_id">>({
      query: (newTicket) => ({
        url: "",
        method: "POST",
        body: newTicket,  // Send the ticket data (without ticket_id)
      }),
      // Invalidate the cache to refetch the ticket list
      // This assumes that any changes (create) should result in a refetch of the ticket list
      invalidatesTags: [{ type: "Tickets", id: "LIST" }],
    }),

    // PUT: Update an existing ticket
    updateTicket: build.mutation<Ticket, Ticket>({
      query: (updatedTicket) => ({
        url: `/${updatedTicket.ticket_id}`,  // URL with ticket_id for the specific ticket
        method: "PUT",
        body: updatedTicket,  // Send the entire ticket object to update
      }),
      // Invalidate the cache to refetch the ticket list
      invalidatesTags: [{ type: "Tickets", id: "LIST" }],
    }),

    // DELETE: Delete a ticket by ID
    deleteTicket: build.mutation<void, number>({
      query: (ticket_id) => ({
        url: `/${ticket_id}`,  // URL with ticket_id for the specific ticket
        method: "DELETE",
      }),
      // Invalidate the cache to refetch the ticket list after deletion
      invalidatesTags: [{ type: "Tickets", id: "LIST" }],
    }),
  }),
});

// Auto-generated hooks for use in components
export const {
  useGetTicketsQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = ticketApiSlice;
