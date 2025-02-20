import { useCallback, useEffect, useState } from "react";

export function useTimer(duration: number) {
  const [timeLeft, setTimeLeft] = useState(duration / 1_000);

  const [status, setStatus] = useState<"waiting" | "started" | "finished">(
    "waiting"
  );

  const start = useCallback(() => {
    setStatus("started");
  }, []);

  useEffect(() => {
    if (status !== "started") {
      return;
    }

    const startTime = performance.now();

    const intervalId = window.setInterval(() => {
      const now = performance.now();

      const delta = now - startTime;

      if (delta >= duration) {
        setStatus("finished");
        setTimeLeft(0);
      } else {
        setTimeLeft(Math.ceil((duration - delta) / 1_000));
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [status, duration]);

  return { timeLeft, status, start };
}
