import React from 'react'
import TicketTimeTracker from '../tickets/Ticket';
import { tickets } from '../../lib/tickets';

const Ticket = () => {
  return (
    <div className='w-[100%] font-mono'>
      <h1 className='w-[100%] 2xl:text-6xl lg:text-4xl md:text-2xl  sm:text-lg text-sm py-6 px-16 text-slate-500 d-flex flex-1 font-mono bg-zinc-600 tracking-widest'>Ticket Time Tracker</h1>
      <div className='2xl:px-40 lg:px-14 md:px-12 sm:px-8 py-10 '>
         
          <div className='flex flex-col-reverse lg:flex-row  items-center justify-between font-mono'>
          
          <div >
          <h2 className=' 2xl:text-5xl lg:text-3xl  md:text-xl text-lg font-medium sm:mb-50 mt-6 ml-10 sm:ml-0'>Existing tickets</h2>
          <div className='pt-7 sm:pt-12  ml-14 sm:ml-0'>
          
          <TicketTimeTracker tickets={tickets} />
          </div>
          </div>
            <div className='bg-[#EFEFF0]  rounded-xl lg:w-[40%] xl:w-[40%] 2xl:w-[35%] w-[60%]  2xl:h-[44rem] sm:h-80 h-60 md:text-center lg:h-[25rem] lg:mt-20 xl:h-[30rem] xl:mt-0  lg:px-12 md:px-10 px-8 py-8 '>
              <h1 className='xl:text-lg lg:text-sm  sm:text-[13px] text-[10px] text-center 2xl:text-3xl '> Select an existing ticket to log time <br /> or <br /><span className='underline underline-offset-2'>Create a new one</span> </h1> 
              <div className='xl:pt-20 md:pt-8 pt-6'>
                     <span className='mr-2 bg-[#D9D9D9] 2xl:h-16 xl:h-10 lg:h-8 md:h-6 h-4 w-[100%]  inline-block'></span>
                     <span className='mr-2 bg-[#D9D9D9] 2xl:h-16 xl:h-10 lg:h-8  md:h-6 h-4 w-[100%]  inline-block xl:mt-10 lg:mt-8 md:mt-7 sm:mt-5'></span> 
                     <span className='grid grid-cols-2 gap-4 items-center'>
                       <span className='mr-2 bg-[#D9D9D9] 2xl:h-16 xl:h-10 lg:h-8  md:h-6 h-4 w-[100%]  inline-block xl:mt-10 lg:mt-8 md:mt-7 sm:mt-5'></span> 
                       <span className='mr-2 bg-[#D9D9D9] 2xl:h-16 xl:h-10 lg:h-8 md:h-6 h-4 w-[100%]  inline-block xl:mt-10 lg:mt-8 md:mt-7 sm:mt-5'></span>
                    </span>
             </div>
           </div>
         </div>
      </div>

    </div>
  )

}
 
export default Ticket