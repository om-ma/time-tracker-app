import { Ticket } from "@/lib/features/tickets/ticketsApiSlice";
import Link from "next/link";

export const TimeLogged = ({ hours }: { hours: any }) => {

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
    <span>{convertHoursToReadableFormat(hours)}</span>
  );
};
