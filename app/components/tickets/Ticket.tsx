'use client';

import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
 
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTickets } from '../../../lib/features/tickets/ticketApi';
import { RootState, AppDispatch } from '../../../lib/store';
import Loader from '../Loader/Loader';
import { useCounter } from "../counter/counterContext";

const TicketTimeTracker: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
   
  const [selectedTicket, setSelectedTicket] = useState<{ id: string; title: string } | null>(null);
  const { tickets, loading, error } = useSelector((state: RootState) => state.tickets);

   
  const { increment } = useCounter(); // Get the increment function
  useEffect(() => {
    dispatch(fetchTickets()); // Fetch tickets on mount
  }, [dispatch]);

  if (loading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }// Fetch tickets when the component mounts

 

  // Handle form submission
  const handleSubmitLogTime = async (ticketId: string, timeSpent: string) => {
    try {
      // Simulate logging time (you can call your API to log the time)
      alert(`Time logged for ticket ${ticketId}: ${timeSpent}`);
      setSelectedTicket(null); // Close the form after submission
    } catch (error) {
      console.error("Error logging time:", error);
      alert("Failed to log time. Please try again.");
    }
  };

  if (loading) {
    return <div><Loader/></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle log time click: Navigate to /updateticket with ticket info in query params
  const handleLogTimeClick = (ticketId: string, ticketTitle: string) => {
    const slug = `${ticketId}-${ticketTitle.replace(/\s+/g, '-').toLowerCase()}`;
    router.push(`/updateticket/${slug}`); // Pass slug as part of the URL path
  };

  return (
    <div className="font-mono xs:w-auto w-[295px]">
      <div className="relative bg-white rounded-lg xs:overflow-x-visible overflow-x-auto h-auto ml-7 xs:ml-0 sm:ml-0">
        <div className="grid 2xl:grid-cols-[330px,300px] sm:grid-cols-[330px,200px] grid-cols-[260px,125px] gap-x-6 2xl:gap-x-32 font-normal pb-2 mb-2">
          <div className="2xl:text-base text-xs sm:text-[13px] italic">Ticket</div>
          <div className="2xl:text-base text-xs sm:text-[13px] italic text-[#000000b0]">Time Logged</div>
        </div>
        <span className="absolute 2xl:left-[790px] 2xl:top-[48px] xl:left-[340px] xl:top-[33px] lg:left-[335px] lg:top-[32px] md:top-[28px] md:left-[340px] sm:left-[59%] left-[280px]">
          <svg
            className="md:w-[3px] 2xl:h-[345px] xl:h-[279px] lg:h-[240px] md:h-[244px] sm:h-[240px] sm:w-[6px] h-[160px] w-[2px]"
            viewBox="0 0 2 226"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              opacity="0.6"
              x1="1.23338"
              y1="0.443604"
              x2="1.23337"
              y2="285.451"
              stroke="url(#paint0_linear_3_12)"
              strokeOpacity="0.6"
              strokeWidth="0.896445"
            />
            <defs>
              <linearGradient
                id="paint0_linear_3_12"
                x1="0.285156"
                y1="0.443603"
                x2="0.285146"
                y2="225.451"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopOpacity="0.2" />
                <stop offset="1" />
              </linearGradient>
            </defs>
          </svg>
        </span>

        <div className="2xl:mt-8">
          {tickets.map((ticket) => {
            console.log(ticket)
            const slug = `${ticket.id}-${ticket.title.replace(/\s+/g, '-').toLowerCase()}`;
            return (
              <div
                key={ticket.id}
                className="grid 2xl:grid-cols-[400px,200px] sm:grid-cols-[300px,230px] grid-cols-[270px,110px] lg:gap-x-6 xl:gap-x-8 sm:gap-x-8 gap-x-6 items-center gradient-border-b xl:py-4 sm:py-3 py-1"
              >
                <div className="flex items-center sm:pr-6 justify-normal">
                  <span className="mr-2">
                    <svg
                      className="lg:w-[20px] md:w-[19px] sm:w-[17px] w-[10px]"
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
                  <span className='grid grid-cols-[80px,200px]'>
                  <span className="font-medium 2xl:text-base sm:text-[13px] text-[11px] whitespace-nowrap">
                  {ticket.ticketType}-{ticket.id}
                  </span>
                  <span className="ml-2 text-black font-normal 2xl:text-base sm:text-[13px] text-[11px] whitespace-nowrap">
                    {ticket.title}
                  </span>
                  </span>
                </div>

                <div>
                  <span className="font-normal 2xl:text-base sm:text-[13px] text-[11px]  sm:pl-8 whitespace-nowrap">
                 {(() => {
                          if (ticket.timeLogged.includes('No time logged')) {
                            return (
                            <span>{ticket.timeLogged}
                              <Link href={`/updateticket/${slug}`} className="text-black-600 ml-1 underline">
                                {'Log Time'}
                              </Link>
                              </span>
                            );
                            } else {
                            return <span>{ticket.timeLogged}</span>;
                            }
                    })()}
                   </span>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={increment} className='border bg-[#2EA8C3] px-4 py-2 mt-4 text-white  rounded-lg'>
              Add task
            </button>
      </div>
    </div>
  );
};

export default TicketTimeTracker;
