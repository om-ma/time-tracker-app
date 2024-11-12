"use client";

import { useGetTicketsQuery } from "@/lib/features/tickets/ticketsApiSlice";
import { TicketListingItem } from "../ticketListingItem/TicketListingItem";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const TicketListingTable = () => {
  const { data, isError, isLoading, isSuccess } = useGetTicketsQuery(100);

  return (
    <>
      {isSuccess ? (
        <table className="w-full text-left border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Ticket</th>
              <th className="py-2 px-4 border-b">Time Logged</th>
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
        <div>
          <h1>There was an error!!!</h1>
        </div>
      )}
    </>
  );
};
