import React from 'react'
import TicketTimeTracker from '../tickets/Ticket';
import { tickets } from '../../lib/tickets';

const Ticket = () => {
  return (
    <div className='w-[100%]'>
      <h1 className='w-[1000%] text-4xl py-6 px-24 text-slate-500 d-flex flex-1 bg-zinc-600 tracking-widest'>Ticket Time Tracker</h1>
         <div className='px-24 py-10'>
          <h2 className='text-3xl font-semibold'>Existing tickets</h2>
          <div className='flex justify-around'>
          <div  >
          <TicketTimeTracker tickets={tickets} />
          </div>
          <div className='bg-gray-200 rounded-3xl w-[40%] px-16 py-8'><h1 className='text-2xl font-semibold text-center'> Select a existing ticket to log time <br /> or <br /><span className='underline underline-offset-2'>Create a new one</span> </h1> </div>
         </div>
         </div>

    </div>
  )

}
 
export default Ticket