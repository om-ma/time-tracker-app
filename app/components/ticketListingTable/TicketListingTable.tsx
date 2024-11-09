import { TicketListingItem } from "../ticketListingItem/TicketListingItem";

export const TicketListingTable = () => {
  return (
    <table className="w-full text-left border border-gray-300 bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border-b">Ticket</th>
          <th className="py-2 px-4 border-b">Time Logged</th>
        </tr>
      </thead>
      <tbody>
        <TicketListingItem />
      </tbody>
    </table>
  );
};
