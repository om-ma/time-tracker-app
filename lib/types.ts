// types.ts
import { ReactNode } from "react";

// Final transformed ticket type (used in UI)
export interface Ticket {
  ticketType: ReactNode;
  id: string;
  title: string;
  timeLogged: string;
}

// Raw ticket type from the API
export interface RawTicket {
  ticket_id: string;
  summary: string;
  log_time?: string | null;
  ticket_type?: string | null;
}
