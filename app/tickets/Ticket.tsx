// components/TicketTimeTracker.tsx
import React from 'react';
import { Ticket } from '../../lib/types';

interface TicketTimeTrackerProps {
  tickets: Ticket[];
}

const TicketTimeTracker: React.FC<TicketTimeTrackerProps> = ({ tickets }) => {
  return (
    <div className=" font-sans min-h-screen">
     
      
      <div className="bg-white rounded-lg  ">
        {/* Header Row */}
        <div className="grid grid-cols-2 gap-4 font-semibold   pb-2 mb-2">
          <div>Ticket</div>
          <div className=" ">Time Logged</div>
        </div>
<span className='absolute left-[380px] top-[290px]'>
    <svg width="2" height="280" viewBox="0 0 2 226" fill="none" xmlns="http://www.w3.org/2000/svg">
<line opacity="0.6" x1="1.23338" y1="0.443604" x2="1.23337" y2="285.451" stroke="url(#paint0_linear_3_12)" strokeOpacity="0.6" strokeWidth="0.896445"/>
<defs>
<linearGradient id="paint0_linear_3_12" x1="0.285156" y1="0.443603" x2="0.285146" y2="225.451" gradientUnits="userSpaceOnUse">
<stop stop-opacity="0.2"/>
<stop offset="1"/>
</linearGradient>
</defs>
</svg>
</span>
        {/* Ticket Rows */}
        {tickets.map((ticket) => (
          <div key={ticket.id} className="grid grid-cols-2 gap-4 items-center gradient-border-b  py-4 text-sm">
            {/* Left Column - Ticket Info */}
            <div className="flex items-center pr-6">
                
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
               
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketTimeTracker;
