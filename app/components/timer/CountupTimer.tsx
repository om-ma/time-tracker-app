import GenericTimer from "./GenericTimer";

const countupTick = (minutes: number, seconds: number) => {
  if (seconds < 59) {
    return { minutes, seconds: seconds + 1 };
  } else {
    return { minutes: minutes + 1, seconds: 0 };
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
