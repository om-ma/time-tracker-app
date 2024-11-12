import GenericTimer from "./GenericTimer";

export const countdownTick = (
  hours: number,
  minutes: number,
  seconds: number
) => {
  if (seconds > 0) {
    return { hours, minutes, seconds: seconds - 1 };
  } else if (minutes > 0) {
    return { hours, minutes: minutes - 1, seconds: 59 };
  } else if (hours > 0) {
    return { hours: hours - 1, minutes: 59, seconds: 59 };
  } else {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
};

const CountdownTimer = () => {
  return (
    <GenericTimer
      initialHours={15}
      initialMinutes={0}
      initialSeconds={0}
      tickFunction={countdownTick}
    />
  );
};

export default CountdownTimer;
