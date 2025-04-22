
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCounter } from "../components/counter/counterContext";

interface LogTimeFormProps {
  ticketId: string;
  ticketTitle: string;
  onClose: () => void;
}

const LogTimeForm: React.FC<LogTimeFormProps> = ({ ticketId, ticketTitle, onClose }) => {
  const router = useRouter();
  const { increment } = useCounter(); // Get the increment function

  const [manualTime, setManualTime] = useState<string>("0.00");
  const [notes, setNotes] = useState<string>("");

  // Timer states
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Close form
  const handleOnClose = () => {
    onClose(); // Call the passed onClose function
    router.push("/tickets"); // Redirect to the desired URL
  };

  // Start timer
  const handleStart = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  // Stop timer
  const handleStop = () => {
    if (isRunning && intervalId) {
      clearInterval(intervalId);
      setIntervalId(null); // Clear the interval reference
      setIsRunning(false);
    }
  };

  // Reset timer
  const handleReset = () => {
    handleStop();
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  // Calculate total log time in hours
  const calculateTimerLogTime = () => {
    const totalLogTime = (hours + minutes / 60 + seconds / 3600).toFixed(2);
    console.log("Calculated Timer Log Time:", totalLogTime); // Debugging
    return totalLogTime;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const logTimeToSave = isRunning ? calculateTimerLogTime() : manualTime;

    try {
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticket_id: ticketId,
          log_time: logTimeToSave,
          notes: notes,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Log time and notes updated successfully!");
        increment(); // Increment the counter
        handleOnClose(); // Close the form after success
      } else {
        console.error("Error:", data.error);
        alert("Failed to update log time and notes.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId); // Clear interval on unmount
    };
  }, [intervalId]);


  return (
    <div className="w-[100%] font-mono xl:w-full 2xl:w-full 2xl:h-max sm:h-max h-max lg:h-max bg-white rounded-[10px] border border-[#7D7D82]">
      {/* Ticket Info */}
      <h2 className="text-[10px] xxs:text-xs xs:text-sm sm:text-sm xl:text-base 2xl:text-xl flex items-center ml-7 mb-3 mt-4 lg:mb-4 lg:mt-5">
        <span className="mr-3">
          <svg
            className="lg:w-[23px] md:w-[20px] sm:w-[18px] w-[10px]"
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.792969"
              y="0.304443"
              width="21.5147"
              height="21.5147"
              rx="3.58578"
              fill="#1E8826"
            />
            <circle cx="11.5501" cy="11.0618" r="4.48223" fill="white" />
          </svg>
        </span>
        <span className="font-medium  whitespace-nowrap">
          {ticketId}{"-"}
        </span>
        <span className="text-[9px] xxs:text-xs xs:text-sm sm:text-sm xl:text-base 2xl:text-xl">
          {ticketTitle}
        </span>
      </h2>
      <span className="block w-full h-[1px] bg-[#7D7D82]"></span>

      {/* Manual Time Logging */}
      <div className="sm:mt-6 xrs:mt-4 mt-2 lg:mt-[34px] mb-2 xrs:mb-4 sm:mb-6 lg:mb-9 ml-7 mr-10 relative">
        <label
          htmlFor="manualTime"
          className="block w-max text-xs xs:text-sm sm:text-base md:text-lg 2xl:text-2xl mb-4"
        >
          Log time manually
        </label>
        <input
          type="text"
          id="manualTime"
          value={manualTime}
          onChange={(e) => setManualTime(e.target.value)}
          className="mt-1 block w-full text-xs xrs:text-sm sm:text-sm 2xl:text-lg h-7 sm:h-9 2xl:h-14 rounded border border-[#b4b4bb] hover:border-[#b4b4bb] active:border-[#b4b4bb] focus:border-blue-500 focus:ring-blue-500 pl-3"
        />
      </div>

      {/* Timer Section */}
      <div className="mb-6 lg:mb-9 xl:mx-7 lg:mx-5 mx-7">
        <div className="flex justify-between items-center">
          <label className="block text-[10px] xrs:text-sm sm:text-base xl:text-lg 2xl:text-xl mb-2">
            Track with Timer
          </label>
          <div className="mb-2 text-blue-500 text-[7px] xrs:text-[10px] sm:text-xs xl:text-sm 2xl:text-lg underline cursor-pointer">
            Use countdown timer
          </div>
        </div>
        <div className="flex flex-col space-x-2 items-center">
          {/* Timer Inputs */}
          <div className="flex space-x-1 lg:mt-9 sm:mt-5 mt-3">
            <input
              type="number"
              className="w-11 sm:w-16 xl:w-[77px] 2xl:w-[90px] h-12 sm:h-16 lg:h-20 xl:h-[90px] 2xl:h-[115px] text-center text-2xl sm:text-[32px] lg:text-[44px] 2xl:text-[55px] border border-gray-300 rounded shadow-sm"
              value={hours}
              readOnly
            />
            <span className="mt-1 sm:mt-3 lg:mt-5 text-3xl sm:text-5xl text-[#B4B4B8]">
              :
            </span>
            <input
              type="number"
              className="w-11 sm:w-16 xl:w-[77px] 2xl:w-[90px] h-12 sm:h-16 lg:h-20 xl:h-[90px] 2xl:h-[115px] text-center text-2xl sm:text-[32px] lg:text-[44px] 2xl:text-[55px] border border-gray-300 rounded shadow-sm"
              value={minutes}
              readOnly
            />
            <span className="mt-1 sm:mt-3 lg:mt-5 text-3xl sm:text-5xl text-[#B4B4B8]">
              :
            </span>
            <input
            placeholder="00"
              type="number"
              className="w-11 sm:w-16 xl:w-[77px] 2xl:w-[90px] h-12 sm:h-16 lg:h-20 xl:h-[90px] 2xl:h-[115px] text-center text-2xl sm:text-[32px] lg:text-[44px] 2xl:text-[55px] border border-gray-300 rounded shadow-sm"
              value={seconds}
              readOnly
            />
          </div>

          {/* Timer Controls */}
          <div className="flex text-xs sm:text-[15px] xl:text-lg 2xl:text-2xl mt-6 lg:mt-[39px]">
            <button
              onClick={handleReset}
              className="px-4 py-2 mr-2 xxs:mr-5 xl:mr-10 text-[#0000006b] rounded underline"
            >
              Reset
            </button>
            <button
              onClick={handleStart}
              className="sm:px-[40px] px-8 lg:py-4 sm:py-3 py-2 bg-green-600 text-white rounded"
            >
              Start
            </button>
            <button
              onClick={handleStop}
              className="px-4 py-2 ml-2 xxs:ml-5 xl:ml-10 text-[#0000006b] rounded underline"
            >
              Stop
            </button>
          </div>
        </div>
      </div>

      <span className="block w-auto h-[1px] bg-[#B4B4B8] ml-5 mr-8"></span>

      {/* Notes Section */}
      <div className="relative mb-4 xl:mx-9 mx-7 mt-5">
        <label
          htmlFor="notes"
          className="absolute -top-4 left-2 bg-white px-1 2xl:px-3 block text-xs xrs:text-sm 2xl:text-lg font-normal text-[#424247]"
        >
          Notes
        </label>
        <input
          id="notes"
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="h-16 sm:h-20 lg:h-[115px] 2xl:h-32 mt-1 block w-full rounded border border-[#B4B4B8] shadow-sm sm:text-sm"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-around gap-10 xl:mx-9 mx-6 xl:mb-7 mb-5">
        <button
          type="button"
          onClick={() => router.push("/tickets")}
          className="xl:w-[186px] text-xs xrs:text-sm sm:text-base xl:text-lg xl:px-11 lg:px-7 lg:py-3 xl:py-4 sm:px-11 xrs:px-9 px-6 sm:py-3 xrs:py-2 py-1 bg-white border-2 border-[#2EA8C3] text-[#2EA8C3] rounded"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="xl:w-[186px] text-xs xrs:text-sm sm:text-base xl:text-lg xl:px-11 lg:px-7 lg:py-3 xl:py-4 sm:px-[54px] xrs:px-11 px-8 sm:py-3 xrs:py-2 py-1 bg-[#2EA8C3] text-black rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default LogTimeForm;
