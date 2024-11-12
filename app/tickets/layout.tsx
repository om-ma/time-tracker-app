import { TicketListingTable } from "../components/ticketListingTable/TicketListingTable";
export default function Layout({ children }: { children: any }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#424247] text-[#9B9BC3] px-[82px] py-[18px] mb-6">
        <h1 className="text-2xl font-normal dm-mono">Ticket Time Tracker</h1>
      </header>
      <div className="px-[82px] flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 mt-11">
          <h2 className="text-xl font-medium dm-mono mb-[27px] text-black">
            Existing tickets
          </h2>
          <div className="overflow-x-auto"></div>
          <TicketListingTable />
        </div>
        <div className="w-full lg:w-1/3 p-4 bg-gray-100 rounded-[10px] mt-[70px]">
          {children}
        </div>
      </div>
    </div>
  );
}
