import Link from "next/link";

export const TicketListingItem = () => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-2 px-4 border-b flex items-center space-x-2">
        <span className="w-4 h-4 bg-green-500 rounded-full"></span>
        <span>TECH-122 Set up tailwind config</span>
      </td>
      <td className="py-2 px-4 border-b">
        1.5d <Link href="/tickets/edit/1">Log Time</Link>
      </td>
    </tr>
  );
};
