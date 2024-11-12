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
    <div style={{ textAlign: "center", fontSize: "24px" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <div
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            minWidth: "50px",
          }}
        >
          {String(hours).padStart(2, "0")}
        </div>
        <div
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            minWidth: "50px",
          }}
        >
          {String(minutes).padStart(2, "0")}
        </div>
        <div>:</div>
        <div
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            minWidth: "50px",
          }}
        >
          {String(seconds).padStart(2, "0")}
        </div>
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button onClick={resetTimer}>Reset</button>
        <button
          onClick={startTimer}
          style={{ backgroundColor: "green", color: "white" }}
        >
          Start
        </button>
        <button onClick={stopTimer}>Stop</button>
      </div>
    </div>
  );
};

export default GenericTimer;
