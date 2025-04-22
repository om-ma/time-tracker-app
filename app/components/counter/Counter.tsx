"use client";

import { useCounter } from '../counter/counterContext'

const Counter = () => {
  const { count } = useCounter(); // Only consume the value

  return (
    <div className="flex text-center my-4 text-white pr-10 pt-4">
      <h1 className="text-lg whitespace-nowrap">task({count})</h1>
       
    </div>
  );
};

export default Counter;
