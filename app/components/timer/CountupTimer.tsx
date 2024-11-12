import GenericTimer from "./GenericTimer";

const countupTick = (hours: number, minutes: number, seconds: number) => {
  if (seconds < 59) {
    return { hours, minutes, seconds: seconds + 1 };
  } else if (minutes < 59) {
    return { hours, minutes: minutes + 1, seconds: 0 };
  } else {
    return { hours: hours + 1, minutes: 0, seconds: 0 };
  }
};

const CountUpTimer = () => {
  return (
    <GenericTimer
      initialMinutes={0}
      initialSeconds={0}
      tickFunction={countupTick}
    />
  );
};

export default CountUpTimer;
