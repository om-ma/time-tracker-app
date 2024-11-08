import React from 'react'

const Ticket = () => {
  return (
    <div>Ticket</div>
  )

};
Ticket.getLayout = function PageLayout(page: React.ReactElement) {
  return page; // Renders without any additional layout
};
export default Ticket