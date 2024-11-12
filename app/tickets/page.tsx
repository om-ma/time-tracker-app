import Link from "next/link";

export default function TicketssPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
            Select an existing ticket to log time
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Or{" "}
            <Link className="text-blue-600 underline" href={`/tickets/new`}>
              Create a new one
            </Link>
          </p>

          <div className="space-y-4">
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
