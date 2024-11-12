import GenericTimer from "./GenericTimer";

export const countdownTick = (minutes: number, seconds: number) => {
  if (seconds > 0) {
    return { minutes, seconds: seconds - 1 };
  } else if (minutes > 0) {
    return { minutes: minutes - 1, seconds: 59 };
  } else {
    return { minutes: 0, seconds: 0 };
  }
};

const CountdownTimer = () => {
  return (
    <GenericTimer
      initialMinutes={15}
      initialSeconds={0}
      tickFunction={countdownTick}
    />
  );
};

export default CountdownTimer;
