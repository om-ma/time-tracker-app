"use client";
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
    const savedTime = localStorage.getItem("timer");
    if (savedTime) {
      const { hours, minutes, seconds } = JSON.parse(savedTime);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }
  }, []);

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
  }, [isActive, hours, minutes, seconds, tickFunction]);

  useEffect(() => {
    localStorage.setItem("timer", JSON.stringify({ hours, minutes, seconds }));
  }, [hours, minutes, seconds]);

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

    localStorage.removeItem("timer");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    unit: "hours" | "minutes" | "seconds"
  ) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    if (unit === "hours") setHours(value);
    if (unit === "minutes") setMinutes(Math.min(value, 59));
    if (unit === "seconds") setSeconds(Math.min(value, 59));
  };

  return (
    <div className="border-b pb-[37px]">
      <div className="flex items-center justify-center gap-3">
        <input
          type="number"
          value={String(hours).padStart(2, "0")}
          onChange={(e) => handleInputChange(e, "hours")}
          className="text-[44px] dm-mono flex items-center justify-center border border-[#ddd] p-[16px] w-[100px] h-[90px] rounded-[4px] text-center"
          min="0"
          disabled={isActive}
        />
        <div>:</div>
        <input
          type="number"
          value={String(minutes).padStart(2, "0")}
          onChange={(e) => handleInputChange(e, "minutes")}
          className="text-[44px] dm-mono flex items-center justify-center border border-[#ddd] p-[16px] w-[100px] h-[90px] rounded-[4px] text-center"
          min="0"
          max="59"
          disabled={isActive}
        />
        <div>:</div>
        <input
          type="number"
          value={String(seconds).padStart(2, "0")}
          onChange={(e) => handleInputChange(e, "seconds")}
          className="text-[44px] dm-mono flex items-center justify-center border border-[#ddd] p-[16px] w-[100px] h-[90px] rounded-[4px] text-center"
          min="0"
          max="59"
          disabled={isActive}
        />
      </div>
      <div className="flex justify-center items-center gap-14 mt-[40px]">
        <button
          onClick={resetTimer}
          className="text-lg dm-mono underline text_light-black"
        >
          Reset
        </button>
        <button
          onClick={startTimer}
          className="bg-[#1E8826] py-4 px-12 rounded-[4px] text-white text-lg dm-mono"
        >
          Start
        </button>
        <button
          onClick={stopTimer}
          className="text-lg dm-mono underline text_light-black"
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default GenericTimer;
