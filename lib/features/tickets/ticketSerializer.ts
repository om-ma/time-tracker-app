// ticketSerializer.ts
 
import { Ticket,RawTicket} from '../../types';

export class TicketSerializer {
  static serialize(ticket: RawTicket): Ticket {
    console.log("Raw ticket data:", ticket);

    const serializedTicket: Ticket = {
      id: ticket.ticket_id,
      title: ticket.summary,
      timeLogged: ticket.log_time || "No time logged",
      ticketType: ticket.ticket_type || "Unknown Type",
    };

    console.log("Serialized ticket:", serializedTicket);
    return serializedTicket;
  }
}
