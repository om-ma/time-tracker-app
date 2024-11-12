export const LoadingSkeleton = () => {
  return (
    <>
      <div className="w-full bg-gray-100 rounded-lg">
        <div className="overflow-hidden rounded-lg shadow bg-white">
          <table className="text-left min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Ticket</th>
                <th className="py-2 px-4 border-b">Time Logged</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-green-300 rounded-full"></div>
                    <div className="w-20 h-4 bg-gray-300 rounded-md"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                </td>
              </tr>
              <tr className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-green-300 rounded-full"></div>
                    <div className="w-20 h-4 bg-gray-300 rounded-md"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                </td>
              </tr>
              <tr className="animate-pulse">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-green-300 rounded-full"></div>
                    <div className="w-20 h-4 bg-gray-300 rounded-md"></div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 h-4 bg-gray-300 rounded-md"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
