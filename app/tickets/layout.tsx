// app/ticket/layout.tsx
import React from 'react';

export default function Ticket({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Ticket-specific layout without image and links */}
      {children}
    </div>
  );
}
