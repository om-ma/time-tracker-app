import React from 'react'
import TicketTimeTracker from '../tickets/Ticket';
import { tickets } from '../../lib/tickets';

const Ticket = () => {
  return (
    <div className='w-[100%]'>
      <h1 className='w-[100%] text-4xl py-6 px-20 text-slate-500 d-flex flex-1 font-DM bg-zinc-600 tracking-widest'>Ticket Time Tracker</h1>
      <div className='px-16 py-10'>
          <h2 className='text-3xl font-semibold'>Existing tickets</h2>
          <div className='flex justify-between'>
          <div className='pt-12'>
          <TicketTimeTracker tickets={tickets} />
          </div>
            <div className='bg-[#EFEFF0] rounded-xl w-[40%] px-14 py-8 mt-4'>
              <h1 className='text-2xl font-semibold text-center'> Select a existing ticket to log time <br /> or <br /><span className='underline underline-offset-2'>Create a new one</span> </h1> 
              <div className='pt-20'>
                     <span className='mr-2 bg-[#D9D9D9] h-10 w-[100%]  inline-block'></span>
                     <span className='mr-2 bg-[#D9D9D9] h-10 w-[100%]  inline-block mt-10'></span> 
                     <span className='grid grid-cols-2 gap-4 items-center'>
                       <span className='mr-2 bg-[#D9D9D9] h-10 w-[100%]  inline-block mt-10'></span> 
                       <span className='mr-2 bg-[#D9D9D9] h-10 w-[100%]  inline-block mt-10'></span>
                    </span>
             </div>
           </div>
         </div>
      </div>

    </div>
  )

}
 
export default Ticket