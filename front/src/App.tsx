import { useEffect, useRef, useState } from "react";

import { useTimer } from "./hooks/useTimer";
import { useLatest } from "./hooks/useLatest";

const testData =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam, quis?";

const duration = 5_000;

export function App() {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [userInput, setUserInput] = useState<string | null>(null);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };

  const { timeLeft, status, start } = useTimer(duration);

  const statusRef = useLatest(status);

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === "Backspace" || event.key === "Delete") {
        textAreaRef.current?.focus();
      }

      if (
        event.key === "R" &&
        event.shiftKey &&
        statusRef.current === "finished"
      ) {
        start();
        textAreaRef.current?.focus();
      }
    };

    const keyPressHandler = () => {
      if (statusRef.current === "waiting") {
        start();
      }

      textAreaRef.current?.focus();
    };

    window.addEventListener("keypress", keyPressHandler);
    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keypress", keyPressHandler);
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [start, statusRef]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        {
          {
            waiting: "Press any key to start",
            started: "Typing...",
            finished: "You are finished ( shift + R to restart )",
          }[status]
        }
      </div>

      <div style={{ fontSize: "32px", fontWeight: 500 }}>{timeLeft}</div>

      <div style={{ fontSize: "24px", fontWeight: 500 }}>{testData}</div>

      <div style={{ height: "20px" }}>{userInput}</div>

      <textarea
        ref={textAreaRef}
        autoFocus
        style={{ height: 0, border: "none", padding: 0 }}
        onChange={onChangeHandler}
        name="hiddenUserInput"
      >
        {userInput}
      </textarea>
    </div>
  );
}
