// network/ticketService.ts
import { TicketSerializer } from '../features/tickets/ticketSerializer';

export const getTickets = async () => {
  const response = await fetch('/api/counter');

  if (!response.ok) {
    throw new Error(`Failed to fetch tickets. Status: ${response.status}`);
  }

  const rawData = await response.json();
  return rawData.map(TicketSerializer.serialize);
};
