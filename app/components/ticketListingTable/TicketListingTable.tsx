"use client";

import { useGetTicketsQuery } from "@/lib/features/tickets/ticketsApiSlice";
import { TicketListingItem } from "../ticketListingItem/TicketListingItem";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const TicketListingTable = () => {
  const { data, isError, isLoading, isSuccess } = useGetTicketsQuery(100);

  return (
    <>
      {isSuccess ? (
        <table className="w-full w-3/4 text-left bg-white">
          <thead className="bg-white">
            <tr>
              <th className="dm-mono font-medium text-[13.02px] pb-[15.14px]">Ticket</th>
              <th className="dm-mono font-medium text-[13.02px] italic pl-[19.72px] pb-[15.14px]">Time Logged</th>
            </tr>
          </thead>
          <tbody>
            {data?.ticket.map((d, index) => (
              <TicketListingItem key={`${index}`} ticket={d} />
            ))}
          </tbody>
        </table>
      ) : isLoading ? (
        <LoadingSkeleton />
      ) : (
        <table className="w-full w-3/4 text-left bg-white">
        <thead className="bg-white">
          <tr>
            <th className="dm-mono font-medium text-[13.02px] pb-[15.14px]">Ticket</th>
            <th className="dm-mono font-medium text-[13.02px] italic pl-[19.72px] pb-[15.14px]">Time Logged</th>
          </tr>
        </thead>
        <tbody>
        <TicketListingItem key={`${0}`} ticket={{detail: "Set up tailwind congif", hours: "1.5d", ticket_id:"TECH-122"}} />
        <TicketListingItem key={`${1}`} ticket={{detail: "Add background and category...", hours: "No time logged. Log time", ticket_id:"TECH-123"}} />
        <TicketListingItem key={`${2}`} ticket={{detail: "asdfasdfasf", hours: "12", ticket_id:1}} />
        <TicketListingItem key={`${3}`} ticket={{detail: "asdfasdfasf", hours: "12", ticket_id:1}} />
        <TicketListingItem key={`${4}`} ticket={{detail: "asdfasdfasf", hours: "12", ticket_id:1}} />
        </tbody>
      </table>
      )}
    </>
  );
};
