import React, { useState } from "react";
 
import { useCounter } from "../components/counter/counterContext";

import { useRouter } from 'next/navigation'; // Import the useRouter hook

const HandleCreateNewTicket: React.FC = () => {
  const router = useRouter(); // Initialize the router
  const { increment } = useCounter(); // Get the increment function

  const handleCancel = () => {
    // Navigate to the '/tickets' page when Cancel is clicked
    router.push('/tickets');
  }
  return(
 
    <div className="lg:h-[44rem] xl:h-[44rem] sm:h-auto h-auto xl:px-14 lg:px-10 lg:mb-0 lg:py-10 xrs:px-12 xxs:px-10 pl-6 pr-8 sm:py-7 py-4 font-mono bg-white border border-[#7D7D82] rounded-[10px]">
      <form
        className="flex flex-col"
        onSubmit={async (e) => {
          e.preventDefault();

          const ticketType = (document.getElementById("ticketType") as HTMLSelectElement).value;
          const summary = (document.getElementById("summary") as HTMLInputElement).value;
          const details = (document.getElementById("details") as HTMLTextAreaElement).value;
          const hours = (document.getElementById("hours") as HTMLInputElement).value;

          // Validation: Ensure required fields are filled
          if (!ticketType || !summary || !details) {
            alert("Please fill out all required fields.");
            return;
          }

          const payload = {
            ticket_id: Math.floor(Math.random() * 10000), // Generate random ticket ID
            ticket_type: ticketType,
            summary: summary,
            details: details,
            log_time: hours.trim() || "No time logged.",
            notes: details // Using details as notes for this example
          };

          try {
            const response = await fetch("/api/counter", {  // Changed the endpoint to /api/tickets
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });

            if (!response.ok) {
              const errorText = await response.text();
              console.error(`Error response: ${response.status} ${errorText}`);
              throw new Error(`API Error: ${errorText}`);
            }
            

            const result = await response.json();
            console.log("Ticket created successfully:", result);
            alert("Ticket created successfully!");
             router.push('/tickets');
          } catch (error) {
            console.error("Error occurred while creating ticket:", error);
            alert("An error occurred. Please try again.");
          }
        }}
      >
        <h1 className="text-base sm:text-lg lg:text-xl ml-2 font-medium mb-[14px]">Create New Ticket</h1>

        <div className="flex flex-col xrs:flex-row lg:flex-col justify-between mb-5 xrs:mb-0 lg:mb-9">
          <div className="relative lg:mb-9 mb-6 mt-2 w-auto shrink">
          <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 lg:w-[23px] md:w-[20px] sm:w-[18px] w-[14px] h-[14px] mr-20" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect x="0.792969" y="0.304443" width="21.5147" height="21.5147" rx="3.58578" fill="#1E8826" /> <circle cx="11.5501" cy="11.0618" r="4.48223" fill="white" /> </svg>
            <select
              id="ticketType"
              className="w-full xrs:w-28 xs:w-36 md:w-44 h-9 xrs:h-10 xs:h-11 lg:h-14 xl:h-14 lg:w-full px-3 pt-1 xrs:pt-1 pb-1 border pl-6 border-gray-300 rounded text-[10px] xs:text-xs lg:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
            >
              <option>Story</option>
              <option>Bug</option>
              <option>Task</option>
            </select>
            <label
              htmlFor="ticketType"
              className="absolute left-4 -top-[15px] px-1 bg-white text-[#424247] text-[10px] xrs:text-xs sm:text-sm peer-focus:text-blue-500"
            >
              Ticket Type
            </label>
          </div>

          <div className="relative xrs:pb-0 xrs:mt-2 lg:mt-0 shrink">
            <input
              id="summary"
              type="text"
              className="w-full xrs:w-28 xs:w-36 md:w-44 h-9 xrs:h-10 xs:h-11 lg:h-9 xl:h-9 lg:w-full p-3 pt-4 pb-3 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
              placeholder=" "
            />
            <label
              htmlFor="summary"
              className="absolute left-4 -top-[14px] px-1 bg-white text-[#424247] text-[10px] xrs:text-xs sm:text-sm peer-focus:text-blue-500"
            >
              Summary
            </label>
          </div>
        </div>

        <div className="relative lg:mb-8 mb-5">
          <textarea
            id="details"
            className="w-full lg:h-[154px] h-24 p-3 pt-4 pb-3 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
          ></textarea>
          <label
            htmlFor="details"
            className="absolute left-4 -top-[14px] px-1 bg-white text-[#424247] text-[10px] xrs:text-xs sm:text-sm peer-focus:text-blue-500"
          >
            Details
          </label>
        </div>

        <div className="relative lg:mb-8">
          <input
            id="hours"
            type="text"
            className="w-full h-7 lg:h-10 p-3 pt-4 pb-3 border border-gray-300 rounded text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
            placeholder="0.00"
          />
          <label
            htmlFor="hours"
            className="absolute left-4 -top-[14px] px-1 bg-white text-[#424247] text-[10px] xrs:text-xs sm:text-sm peer-focus:text-blue-500"
          >
            Hours
          </label>
        </div>

        <div className="flex lg:flex-col lg:justify-normal justify-between mt-5 lg:mt-0">
          <button
            type="submit"
            onClick={increment}
            className="bg-[#2EA8C3] lg:mb-[18px] text-black text-xs xs:text-sm sm:text-base lg:text-lg font-mono xs:px-4 px-2 lg:py-4 xs:py-2 py-1 rounded"
          >
            Save Ticket
          </button>
          <button
            type="button"
            className="px-4 lg:py-4 xs:py-2 py-1 rounded lg:mt-4 border-2 border-[#2EA8C3] bg-white text-[#2EA8C3] text-xs xs:text-sm sm:text-base lg:text-lg font-mono"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default HandleCreateNewTicket;