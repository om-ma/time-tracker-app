// GenericTimer.tsx
import React, { useState, useEffect, useRef } from "react";

interface GenericTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  tickFunction: (
    hours: number,
    minutes: number,
    seconds: number
  ) => { hours: number; minutes: number; seconds: number };
}

const GenericTimer: React.FC<GenericTimerProps> = ({
  initialHours = 0,
  initialMinutes = 0,
  initialSeconds = 0,
  tickFunction,
}) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        const {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        } = tickFunction(hours, minutes, seconds);

        setHours(newHours);
        setMinutes(newMinutes);
        setSeconds(newSeconds);

        if (newHours === 0 && newMinutes === 0 && newSeconds === 0) {
          setIsActive(false);
          clearInterval(timerRef.current!);
        }
      }, 1000);
    }

    return () => clearInterval(timerRef.current!);
  }, [isActive, minutes, seconds, tickFunction]);

  const startTimer = () => setIsActive(true);

  const stopTimer = () => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
  };

  return (
    <div className="border-b pb-[37px]">
      <div className="flex items-center justify-center gap-3">
        <div className="text-[44px] dm-mono flex items-center justify-center border border-[#ddd] p-[16px] min-w-[77px] h-[90px] rounded-[4px]"
        >
          {String(hours).padStart(2, "0")}
        </div>
        <div>:</div>
        <div className="text-[44px] dm-mono flex items-center justify-center border border-[#ddd] p-[16px] min-w-[77px] h-[90px] rounded-[4px]"
        >
          {String(minutes).padStart(2, "0")}
        </div>
        <div>:</div>
        <div className="text-[44px] dm-mono flex items-center justify-center border border-[#ddd] p-[16px] min-w-[77px] h-[90px] rounded-[4px]"
        >
          {String(seconds).padStart(2, "0")}
        </div>
      </div>
      <div className="flex justify-center items-center gap-14 mt-[40px]"
      >
        <button onClick={resetTimer} className="text-lg dm-mono underline text_light-black">Reset</button>
        <button
          onClick={startTimer}
          className="bg-[#1E8826] py-4 px-12 rounded-[4px] text-white text-lg dm-mono"
        >
          Start
        </button>
        <button onClick={stopTimer} className="text-lg dm-mono underline text_light-black">Stop</button>
      </div>
    </div>
  );
};

export default GenericTimer;
