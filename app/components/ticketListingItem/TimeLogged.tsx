import { Ticket } from "@/lib/features/tickets/ticketsApiSlice";
import Link from "next/link";

export const TimeLogged = ({ ticket }: { ticket: any }) => {

  function convertHoursToReadableFormat(hours: any) {
    const days = Math.floor(hours / 24);
  
    const remainingHours = Math.floor(hours % 24);
  
    const minutes = Math.round((hours % 1) * 60);
  
    let result = "";
  
    if (days > 0) {
      result += `${days}d `;
    }
    if (remainingHours > 0) {
      result += `${remainingHours}h `;
    }
    if (minutes > 0) {
      result += `${minutes}m`;
    }
  
    return result.trim();
  }

  return (
    <span className="font-normal">
      {convertHoursToReadableFormat(ticket.hours)}
      <Link
        className="underline pl-3 skip-link"
        href={`/tickets/edit/${ticket.ticket_id}`}
      >
        Log Time
      </Link>
    </span>
  );
};
