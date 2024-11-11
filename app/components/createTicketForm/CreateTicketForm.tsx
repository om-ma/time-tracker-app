'use client';
import { Ticket, useCreateTicketMutation } from "@/lib/features/tickets/ticketsApiSlice";


export const CreateTicketForm = () => {
  const [createTicket, { isLoading, isError, isSuccess }] = useCreateTicketMutation();

  // Submit handler function
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    const form = e.target as HTMLFormElement; // The form element is passed as the target

    // Log the form values on submit
    const formData = new FormData(form); // This will capture all form data
    const formValues: Ticket | any = {};

    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    await createTicket(formValues).unwrap(); // .unwrap() helps to handle success or error


    console.log("Form submitted with values:", formValues); // Log the form data
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create new ticket</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Ticket Type */}
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

        {/* Summary */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Summary</span>
          <input
            type="text"
            name="summary" // Ensure input has a name so it's included in the form data
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Summary"
          />
        </label>

        {/* Details */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Details</span>
          <textarea
            name="detail" // Ensure textarea has a name
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Details"
          ></textarea>
        </label>

        {/* Hours */}
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Hours</span>
          <input
            type="number"
            step="0.01"
            name="hours" // Ensure input has a name
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
          />
        </label>

        <div className="flex space-x-2">
          <button
            type="submit" // This triggers the onSubmit handler
            className="w-full py-2.5 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Ticket
          </button>
          <button
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
