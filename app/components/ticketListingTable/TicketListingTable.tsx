"use client";

import { useGetTicketsQuery } from "@/lib/features/tickets/ticketsApiSlice";
import { TicketListingItem } from "../ticketListingItem/TicketListingItem";
import { LoadingSkeleton } from "./LoadingSkeleton";
import Link from "next/link";

export const TicketListingTable = () => {
  const { data, isError, isLoading, isSuccess } = useGetTicketsQuery(100);

  return (
    <>
      {isSuccess ? (
        <>
          {data?.ticket?.length === 0 && (
            <h1>
              No tickets created yet, lets <Link className="text-base font-medium text-center dm-mono underline" href={`/tickets/new`}>Create</Link>
            </h1>
          )}
          {data?.ticket?.length > 0 && <table className="w-full lg:w-3/4 text-left bg-white">
            <thead className="bg-white">
              <tr>
                <th className="dm-mono font-medium text-[13.02px] pb-[15.14px]">
                  Ticket
                </th>
                <th className="dm-mono font-medium text-[13.02px] italic pl-[19.72px] pb-[15.14px]">
                  Time Logged
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.ticket.map((d, index) => (
                <TicketListingItem key={`${index}`} ticket={d} />
              ))}
            </tbody>
          </table>}
        </>
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
