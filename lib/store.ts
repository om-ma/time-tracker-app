import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from '../lib/features/counter/counterSlice';
import ticketReducer from '../lib/features/tickets/ticketSlice'; // Import the ticket slice

// Create the Redux store
const store = configureStore({
  reducer: {
    //counter: counterReducer,
    tickets: ticketReducer, // Include ticket fetching state
  },
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
