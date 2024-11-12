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
    <div className="py-[39px] w-full lg:w-[454px] mx-auto px-[55px] mb-12 lg:mb-0 bg-white rounded-[10px] border">
      <h2 className="dm-mono text-xl font-medium mb-3">Create new ticket</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <div className="mt-4 relative">
          <span className="text-[14.53px] px-2 dm-mono text-neutral-500 bg-white absolute top-[-10px] left-[10px]">Ticket type</span>
            <select
              name="type" // Make sure to give the select a name
              className="w-full p-2.5 dm-mono bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Story">Story</option>
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
            </select>
          </div>
        </label>

        {/* Summary */}
        <label className="block">
          <div className="mt-3 relative">
            <span className="text-[14.53px] px-2 dm-mono text-neutral-500 bg-white absolute top-[-10px] left-[10px]">Summary</span>
            <input
              type="text"
              name="summary"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder=""
              />
          </div>
        </label>

        {/* Details */}
        <label className="block">
        <div className="mt-3 relative">
          <span className="text-[14.53px] px-2 dm-mono text-neutral-500 bg-white absolute top-[-10px] left-[10px]">Details</span>
          <textarea
            name="detail"
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder=""
          ></textarea>
          </div>
        </label>

        {/* Hours */}
        <label className="block">
          <div className="mt-3 relative">
            <span className="text-[14.53px] px-2 dm-mono text-neutral-500 bg-white absolute top-[-10px] left-[10px]">Hours</span>
            <input
              type="number"
              step="0.01"
              name="hours"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </label>

        <div className="pt-8">
          <button
            type="submit" // This triggers the onSubmit handler
            className="w-full dm-mono py-[14px] bg-[#2EA8C3] text-dark rounded-[4px]"
          >
            Save Ticket
          </button>
          <button
            onClick={onCancelHandler}
            type="button" // This is a regular button that doesn't trigger form submission
            className="w-full dm-mono py-[14px] bg-transparent text-[#2EA8C3] mt-3 border border-[#2EA8C3] rounded-[4px]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
