'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogTimeForm from '../updateform';
import TicketTimeTracker from '@/app/components/tickets/Ticket';
import Counter from '../../components/counter/Counter';
 

const UpdateForm: React.FC = () => {
  const router = useRouter();
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [ticketTitle, setTicketTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const slug = pathParts[pathParts.length - 1];

    if (slug) {
      const [id, ...titleParts] = slug.split('-');
      setTicketId(id);
      setTicketTitle(titleParts.join(' '));
    } else {
      router.push('/'); // Redirect to home if no slug found
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!ticketId || !ticketTitle) {
    return <p>Error: Unable to retrieve ticket information.</p>;
  }

  return (
    <div className="w-full h-auto font-mono">
      {/* Header */}
      <header className='flex justify-between bg-[#424247]'>
      <h1 className="sm:w-full 2xl:text-5xl  sm:text-2xl text-lg 2xl:pl-20 sm:py-6 py-4 sm:pl-16 pl-8 text-[#9B9BC3] font-normal  tracking-widest">
        Ticket Time Tracker
      </h1>
        <Counter/>
 </header>

      {/* Main Container */}
      <div className="2xl:px-20 xl:px-14 md:px-12 sm:px-8 py-10 lg:pl-12 lg:pr-8">
        <div className="w-[303px] xxs:w-auto flex flex-col-reverse lg:flex-row gap-x-4 items-center lg:items-start justify-between">
          {/* Left Section - Existing Tickets */}
          <div className="w-max inline-block xl:ml-7">
            <h2 className="w-max 2xl:text-4xl lg:text-xl md:text-lg text-base font-medium mt-10 lg:mt-1 ml-10 xs:ml-2 sm:ml-0">
              Existing tickets
            </h2>
            <div className="w-max pt-7 sm:pt-12 sm:ml-0">
              <TicketTimeTracker  />
            </div>
          </div>

          {/* Right Section - Log Time Form */}
          <div className="p-4">
            <LogTimeForm
              ticketId={ticketId}
              ticketTitle={ticketTitle}
              onClose={() => router.push('/')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
