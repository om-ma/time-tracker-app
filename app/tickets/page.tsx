'use client';
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import TicketTimeTracker from '../components/tickets/Ticket'; // Assuming this is your component
import Link from 'next/link';
import Counter from '../components/counter/Counter';
 

const Ticket: React.FC = () => {
  const router = useRouter(); // Initialize router

  
  // Simulate a 5-second delay before showing the component
   

  return (
    <div className="w-full h-auto font-mono">
      <header className='flex justify-between bg-[#424247]'>
      <h1 className="sm:w-full 2xl:text-5xl  sm:text-2xl text-lg 2xl:pl-20 sm:py-6 py-4 sm:pl-16 pl-8 text-[#9B9BC3] font-normal  tracking-widest">
        Ticket Time Tracker
      </h1>
        <Counter/>
 </header>
      <div className="xl:px-14 md:px-12 sm:px-8 py-10 lg:pl-12 lg:pr-8">
        <div className="w-[303px] xxs:w-auto flex flex-col-reverse lg:flex-row gap-x-0 items-center lg:items-start xrs:justify-between justify-start">
          {/* Left Section */}
          <div className="w-[30rem] inline-block xl:ml-7">
            <h2 className="w-max 2xl:text-4xl lg:text-xl md:text-lg text-base font-medium mt-10 lg:mt-1 ml-10 xs:ml-2 sm:ml-0">
              Existing tickets
            </h2>
            <div className="w-max pt-7 sm:pt-12 sm:ml-0">
                
              <TicketTimeTracker  />

            </div>
            
          </div>

          {/* Right Section */}
          <div className="bg-[#EFEFF0] rounded-xl 2xl:w-[35%] 2xl:h-[44rem] xl:w-[40%] sm:h-[340px] h-72 lg:h-[38rem] xl:h-[40rem] lg:mt-7 sm:ml-0 ml-4 pb-10 flex flex-col lg:w-[35%] w-[82%] sm:mb-56 xrs:mb-52 mb-44 lg:mb-10">
            <div>
              <div className="flex justify-center">
                <h1 className="w-max lg:text-sm xl:text-base sm:text-[15px] text-xs text-center font-medium 2xl:text-2xl sm:pr-[50px] sm:pl-[49px] sm:pt-9 pr-9 pl-10 lg:pr-3 lg:pl-4 xl:pr-9 xl:pl-10 pt-7 leading-relaxed">
                  Select an existing ticket to log time <br />
                  <span> or </span>
                  <br />
                  <span
                    className="underline underline-offset-2 cursor-pointer"
                    
                    // Call the handler here
                  >
                    <Link href={'/newticket'}>
                    Create a new one</Link>
                  </span>
                </h1>
              </div>
              <div className="lg:pt-[72px] md:pt-8 sm:pt-6 sm:pl-12 sm:pr-9 pl-10 pr-8 lg:pr-5 lg:pl-6 xl:pr-9 xl:pl-10 pt-10">
                <span className="mr-2 bg-[#D9D9D9] 2xl:h-10 lg:h-[33px] md:h-7 h-5 w-full inline-block"></span>
                <span className="mr-2 bg-[#D9D9D9] 2xl:h-10 lg:h-[33px] md:h-7 h-5 w-full inline-block md:mt-[26px] sm:mt-5 mt-3"></span>
                <div className="grid grid-cols-2 gap-x-4 items-center">
                  <span className="mr-2 bg-[#D9D9D9] 2xl:h-10 lg:h-[33px] md:h-7 h-5 w-full inline-block md:mt-[26px] sm:mt-5 mt-3"></span>
                  <span className="mr-2 bg-[#D9D9D9] 2xl:h-10 lg:h-[33px] md:h-7 h-5 w-full inline-block md:mt-[26px] sm:mt-5 mt-3"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
