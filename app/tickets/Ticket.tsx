 "use client"
import React from 'react';
import { Ticket } from '../../lib/types';
import { useState, useEffect } from 'react';

// Custom hook to get the current window width
function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // Handler to update width state
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width on mount
    handleResize();

    // Add resize event listener with cleanup
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
}


interface TicketTimeTrackerProps {
  tickets: Ticket[];
}

const TicketTimeTracker: React.FC<TicketTimeTrackerProps> = ({ tickets }) => {
  const windowWidth = useWindowWidth();

  // Define SVG dimensions based on window width
  const svgSize = windowWidth < 640
    ? { width: 2, height: 160 }    // Small screens
    : windowWidth < 768
    ? { width: 6, height: 225 }    // Medium screens
    : windowWidth < 1024
    ? { width: 3, height: 244 } 
    : windowWidth < 1336   // Large screens
    ?{width: 3 , height: 240} 
    : windowWidth > 1536   // Large screens
    ?{width: 3 , height: 380}  
    :{ width: 3, height: 289 }

    const svgsize = windowWidth < 640
    ? { width: 10, height: 10 }    // Small screens
    : windowWidth < 768
    ? { width: 17, height: 15 }    // Medium screens
    : windowWidth < 1024
    ? { width: 19, height: 17 } 
    : windowWidth < 1336   // Large screens
    ?{width: 18 , height: 19}  
    :{ width: 23, height: 23 }
  return (
    <div className=" font-mono min-h-screen">
      
     
      
      <div className="bg-white rounded-lg  ">
        {/* Header Row */}
        <div className="grid grid-cols-2 sm:gap-4 font-semibold   pb-2 mb-2">
          <div className='2xl:text-3xl text-[10px] sm:text-sm md:text-md lg:text-lg xl:text-xl'>Ticket</div>
          <div className='2xl:text-3xl text-[10px] sm:text-sm md:text-md lg:text-lg xl:text-xl' >Time Logged</div>
        </div>
<span className='absolute  xl:left-[390px] xl:top-[319px] lg:left-[310px] lg:top-[322px] 2xl:left-[825px] 2xl:top-[360px] md:top-[615px] md:left-[48%] sm:left-[48%] left-[54%]'>
    <svg width={svgSize.width} height={svgSize.height} viewBox="0 0 2 226" fill="none" xmlns="http://www.w3.org/2000/svg">
<line opacity="0.6" x1="1.23338" y1="0.443604" x2="1.23337" y2="285.451" stroke="url(#paint0_linear_3_12)" strokeOpacity="0.6" strokeWidth="0.896445"/>
<defs>
<linearGradient id="paint0_linear_3_12" x1="0.285156" y1="0.443603" x2="0.285146" y2="225.451" gradientUnits="userSpaceOnUse">
<stop stopOpacity="0.2"/>
<stop offset="1"/>
</linearGradient>
</defs>
</svg>
</span>
  <div className='2xl:mt-8'>
        {/* Ticket Rows */}
        {tickets.map((ticket) => (
          <div key={ticket.id} className="grid grid-cols-2 sm:gap-4 gap-0 items-center gradient-border-b  xl:py-4 sm:py-3 py-1  ">
            {/* Left Column - Ticket Info */}
            <div className="flex items-center pr-6">
                
              <span className="mr-2">
                <svg width={svgsize.width} height={svgsize.height} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.792969" y="0.304443" width="21.5147" height="21.5147" rx="3.58578" fill="#1E8826"/>
                    <circle cx="11.5501" cy="11.0618" r="4.48223" fill="white"/>
                 </svg>
               </span>
              <span className="font-medium  2xl:text-3xl lg:text-[9px] xl:text-[12px] md:text-[13px] sm:text-[11px] text-[4px]">{ticket.id}</span>
              <span className="ml-2 text-black font-normal truncate md:text-[13px] sm:text-[11px] 2xl:text-3xl lg:text-[10px] xl:text-sm text-[4px]">{ticket.title}</span>
            </div>

            {/* Right Column - Time Logged */}
            <div >
              <span className='font-normal 2xl:text-3xl lg:text-[10px] xl:text-sm sm:text-[11px] md:text-[13px] text-[6px] '>{ticket.timeLogged}</span>
               
            </div>
          </div>

        ))}</div>
      </div>
    </div>
  );
};

export default TicketTimeTracker;
