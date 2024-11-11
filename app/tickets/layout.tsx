import { TicketListingTable } from "../components/ticketListingTable/TicketListingTable";
export default function Layout({ children }: { children: any }) {
  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <header className="bg-gray-800 text-purple-200 text-center py-4 mb-6">
        <h1 className="text-xl font-bold">Ticket Time Tracker</h1>
      </header>
      <div className="container mx-auto flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 p-4">
          <h2 className="text-lg font-semibold mb-4">Existing tickets</h2>
          <div className="overflow-x-auto"></div>
          <TicketListingTable />
        </div>
        <div className="w-full lg:w-1/3 p-4 bg-gray-100 rounded-lg mt-6 lg:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}
