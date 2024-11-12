"use client";

import { useRouter } from "next/navigation";
import CountUpTimer from "./CountupTimer";
import CountdownTimer from "./CountdownTimer";
import { useState, useEffect } from "react";
import {
  useGetTicketQuery,
  useUpdateTicketMutation,
} from "@/lib/features/tickets/ticketsApiSlice";

type TimerProps = {
  ticketId: string;
  onCancelRoute: string;
};

enum TimerMode {
  Countdown = "COUNTDOWN",
  CountUp = "COUNTUP",
}

export const Timer = ({ ticketId, onCancelRoute }: TimerProps) => {
  const { data, isError, isLoading, isSuccess } = useGetTicketQuery(ticketId);
  const [hours, setHours] = useState("");
  const [notes, setNotes] = useState("");

  const [
    updateTicket,
    {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateTicketMutation();

  const router = useRouter();
  const [counterType, setCounterType] = useState<TimerMode>(
    TimerMode.Countdown
  );

  const onCancelHandler = () => {
    router.push(onCancelRoute);
  };

  const toggleTimer = () => {
    const type =
      counterType === TimerMode.CountUp
        ? TimerMode.Countdown
        : TimerMode.CountUp;
    setCounterType(type);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);
    const formValues: any = { ticket_id: ticketId };

    formData.forEach((value, key) => {
      formValues[key] = value.toString();
    });

    await updateTicket(formValues).unwrap();
  };

  useEffect(() => {
    if (data?.hours) {
      setHours(data.hours);
    }

    if (data?.notes) {
      setNotes(data.notes);
    }
  }, [data]);
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
        <h2 className="text-lg font-semibold">{data?.detail}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">Log time manually</h3>
          <input
            type="number"
            step="0.01"
            name="hours"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Track with Timer</h3>
            <a
              href="#"
              className="text-blue-500 text-sm underline"
              onClick={toggleTimer}
            >
              {counterType === TimerMode.Countdown
                ? "Use count up timer"
                : "Use count down timer"}
            </a>
          </div>
          {counterType === TimerMode.Countdown ? (
            <CountdownTimer />
          ) : (
            <CountUpTimer />
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={onCancelHandler}
            className="w-full py-2 bg-white border border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
