import Link from "next/link";

export default function TicketssPage() {
  return (
    <>
      <div className="bg-Neutral-100 p-[31px] h-[637px]">
        <div className="">
          <h2 className="text-base font-medium text-center dm-mono">
            Select an existing ticket to log time
          </h2>
          <p className="text-base font-medium text-center dm-mono mt-[15px]">
            Or{" "} <br />
            <Link className="text-base font-medium text-center dm-mono underline" href={`/tickets/new`}>
              Create a new one       
            </Link>
          </p>

          <div className="space-y-8 mt-[72px]">
            <div className="w-full h-12 bg-gray-300 rounded-md"></div>
            <div className="w-full h-12 bg-gray-300 rounded-md"></div>
            <div className="flex space-x-4">
              <div className="w-1/2 h-12 bg-gray-300 rounded-md"></div>
              <div className="w-1/2 h-12 bg-gray-300 rounded-md"></div>
            </div>
          </div>      
        </div>
      </div>
    </>
  );
}
