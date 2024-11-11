"use client";

import { useRouter } from "next/navigation";

type TimerProps = {
  onCancelRoute: string;
};

export const Timer = ({ onCancelRoute }: TimerProps) => {
  const router = useRouter();

  const onCancelHandler = () => {
    router.push(onCancelRoute);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
        <h2 className="text-lg font-semibold">
          TECH-124 Add font sizes and colors
        </h2>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Log time manually</h3>
        <input
          type="number"
          step="0.01"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="0.00"
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">Track with Timer</h3>
          <a href="#" className="text-blue-500 text-sm underline">
            Use count down timer
          </a>
        </div>
        <div className="flex justify-center space-x-2 mb-4">
          <div className="w-16 h-16 border border-gray-300 rounded-md flex items-center justify-center text-2xl font-semibold">
            00
          </div>
          <span className="text-2xl font-semibold">:</span>
          <div className="w-16 h-16 border border-gray-300 rounded-md flex items-center justify-center text-2xl font-semibold">
            00
          </div>
          <span className="text-2xl font-semibold">:</span>
          <div className="w-16 h-16 border border-gray-300 rounded-md flex items-center justify-center text-2xl font-semibold">
            00
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="text-gray-400 font-medium" disabled>
            Reset
          </button>
          <button className="px-6 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Start
          </button>
          <button className="text-gray-400 font-medium" disabled>
            Stop
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          placeholder="Notes"
        ></textarea>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onCancelHandler}
          className="w-full py-2 bg-white border border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Save
        </button>
      </div>
    </div>
  );
};
