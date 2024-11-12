import { Ticket } from "@/lib/features/tickets/ticketsApiSlice";
import Link from "next/link";

export const TicketListingItem = ({ ticket }: { ticket: any }) => {
  return (
    <tr className="hover:bg-gray-50 border-b text-[13.02px] dm-mono">
      <td className="flex items-center gap-2 py-[11px]">
        <span className="size-[21.51px] bg-[#1E8826] rounded relative">
          <span className="absolute top-[30%] right-[30%] size-[9px] rounded-full bg-white"></span>
        </span>
        <div className="flex gap-[11.04px] flex-wrap lg:flex-nowrap">
          <span className="font-medium">{ticket.ticket_id}</span>
          <span className="font-normal">{ticket.detail}</span>
        </div>
      </td>
      <td className="py-[11px] pl-[19.72px] border-s">
        <span className="font-normal">
          {ticket.hours}
          {" Hours"}
          <Link
            className="underline pl-3 skip-link"
            href={`/tickets/edit/${ticket.ticket_id}`}
          >
            Log Time
          </Link>
        </span>
      </td>
    </tr>
  );
};
