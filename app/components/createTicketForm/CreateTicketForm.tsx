"use client";
import {
  Ticket,
  useCreateTicketMutation,
} from "@/lib/features/tickets/ticketsApiSlice";
type CreateTicketFormProps = {
  onCancelRoute: string;
};

import { useRouter } from "next/navigation";

export const CreateTicketForm = ({ onCancelRoute }: CreateTicketFormProps) => {
  const router = useRouter();
  const [createTicket, { isLoading, isError, isSuccess }] =
    useCreateTicketMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);
    const formValues: Ticket | any = {};

    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    await createTicket(formValues).unwrap();
    form.reset();
  };

  const onCancelHandler = () => {
    router.push(onCancelRoute);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create new ticket</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Ticket type</span>
          <div className="mt-1 relative">
            <select
              name="type" // Make sure to give the select a name
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="Story">Story</option>
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
            </select>
          </div>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Summary</span>
          <input
            type="text"
            name="summary"
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Summary"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Details</span>
          <textarea
            name="detail"
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Details"
          ></textarea>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Hours</span>
          <input
            type="number"
            step="0.01"
            name="hours"
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
        </label>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Ticket
          </button>
          <button
            onClick={onCancelHandler}
            type="button" // This is a regular button that doesn't trigger form submission
            className="w-full py-2.5 bg-white text-blue-500 font-semibold border border-blue-500 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
