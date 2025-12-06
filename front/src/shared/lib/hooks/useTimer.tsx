import { useCallback, useState } from "react";

type TProps = {
  duration: number;
  onFinish: VoidFunction;
};

export const useTimer = ({ duration, onFinish }: TProps) => {
  const [timeLeft, setTimeLeft] = useState(duration / 1_000);

  const [status, setStatus] = useState<"waiting" | "started" | "finished">(
    "waiting"
  );

  let intervalId: number | null = null;

  const start = useCallback(() => {
    setStatus("started");

    const startTime = performance.now();

    intervalId = window.setInterval(() => {
      const now = performance.now();

      const delta = now - startTime;

      if (delta >= duration) {
        setStatus("finished");

        setTimeLeft(0);

        intervalId && window.clearInterval(intervalId);
        console.log("onFinish");
        onFinish();
      } else {
        setTimeLeft((duration - delta) / 1_000);
      }
    }, 1000);
  }, [duration]);

  const reset = useCallback(() => {
    setTimeLeft(duration / 1_000);
    setStatus("waiting");
  }, []);

  return { timeLeft, status, start, reset };
};
