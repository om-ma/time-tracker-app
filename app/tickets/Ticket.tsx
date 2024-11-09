// components/TicketTimeTracker.tsx
import React from 'react';
import { Ticket } from '../../lib/types';

interface TicketTimeTrackerProps {
  tickets: Ticket[];
}

const TicketTimeTracker: React.FC<TicketTimeTrackerProps> = ({ tickets }) => {
  return (
    <div className="p-6 font-sans min-h-screen">
     
      
      <div className="bg-white rounded-lg p-4  ">
        {/* Header Row */}
        <div className="grid grid-cols-2 gap-4 font-semibold   pb-2 mb-2">
          <div>Ticket</div>
          <div className=" ">Time Logged</div>
        </div>

        {/* Ticket Rows */}
        {tickets.map((ticket) => (
          <div key={ticket.id} className="grid grid-cols-2 gap-4 items-center gradient-border-b  py-4">
            {/* Left Column - Ticket Info */}
            <div className="flex items-center border-r pr-4">
              <span className="mr-2">
                <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.792969" y="0.304443" width="21.5147" height="21.5147" rx="3.58578" fill="#1E8826"/>
                    <circle cx="11.5501" cy="11.0618" r="4.48223" fill="white"/>
                 </svg>
               </span>
              <span className="font-medium">{ticket.id}</span>
              <span className="ml-2 text-gray-600 truncate">{ticket.title}</span>
            </div>

            {/* Right Column - Time Logged */}
            <div className="">
              <span>{ticket.timeLogged}</span>
              <a href="#" className="underline ml-2  ">
                Log time
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketTimeTracker;
