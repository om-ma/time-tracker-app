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

    if (!formValues.hours) {
      const savedTime = localStorage.getItem("timer");
      if (savedTime) {
        const { hours, minutes, seconds } = JSON.parse(savedTime);
    
        if (counterType === TimerMode.CountUp) {
          formValues.hours = hours + minutes / 60 + seconds / 3600;
        } else if (counterType === TimerMode.Countdown) {
          const targetHours = 15;
          const totalTimeInHours = hours + minutes / 60 + seconds / 3600;
          formValues.hours = Math.max(0, targetHours - totalTimeInHours);
        }
      }
    }    

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
    <div className="pw-full lg:w-[454px] mx-auto mb-12 bg-white rounded-[10px] border">
      <div className="flex gap-4 items-center mb-4 border-b py-3  pl-7">
        <span className="size-[21.51px] bg-[#1E8826] rounded relative">
        <span className="absolute top-[30%] right-[30%] size-[9px] rounded-full bg-white"></span></span>
        <h2 className="text-lg font-semibold">{data?.detail}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="px-7 py-8 mb-6">
          <h3 className="text-lg dm-mono mb-4">Log time manually</h3>
          <input
            type="number"
            step="0.01"
            name="hours"
            className="w-full p-2 text-dark border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.00"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div className="px-7">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg dm-mono">Track with Timer</h3>
            <a
              href="#"
              className="text-blue-700 text-sm dm-mono underline"
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

        <div className="px-[34px] mt-4 mb-4">
          <label>
            <div className="mt-3 relative">
              <span className="text-[14.53px] px-2 dm-mono text-neutral-500 bg-white absolute top-[-10px] left-[10px]">Notes</span>
              <textarea
                name="notes"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder=""
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div>
          </label>
        <div className="flex space-x-2 mt-4">
          <button
            onClick={onCancelHandler}
            className="w-full dm-mono py-[14px] bg-transparent text-[#2EA8C3] border border-[#2EA8C3] rounded-[4px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full dm-mono py-[14px] bg-[#2EA8C3] text-dark rounded-[4px]"
          >
            Save
          </button>
        </div>
        </div>
      </form>
    </div>
  );
};
