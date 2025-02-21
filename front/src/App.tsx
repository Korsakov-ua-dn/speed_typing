import { useEffect, useRef, useState } from "react";

import { useTimer } from "./hooks/useTimer";
import { useLatest } from "./hooks/useLatest";

const testData = `
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`;

const duration = 5_000;

export function App() {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [userInput, setUserInput] = useState<string>("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };

  const { timeLeft, status, start, reset } = useTimer(duration);

  const statusRef = useLatest(status);

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === "Backspace" || event.key === "Delete") {
        textAreaRef.current?.focus();
      }

      if (event.key === "Escape" && statusRef.current === "finished") {
        setUserInput("");
        reset();
        // textAreaRef.current?.focus();
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
            finished: "You are finished ( Escape to restart )",
          }[status]
        }
      </div>

      <div style={{ fontSize: "32px", fontWeight: 500 }}>
        {Math.ceil(timeLeft)}
      </div>

      <Text testData={testData} userInput={userInput} />

      {/* <div style={{ fontSize: "24px", fontWeight: 500 }}>{testData}</div> */}

      <div style={{ height: "20px" }}>{userInput}</div>

      <textarea
        ref={textAreaRef}
        autoFocus
        // style={{ height: 0, border: "none", padding: 0 }}
        onChange={onChangeHandler}
        value={userInput}
        name="hiddenUserInput"
        disabled={status === "finished"}
      />
    </div>
  );
}

interface Props {
  testData: string;
  userInput: string;
}

function Text({ testData, userInput }: Props) {
  const testWords = testData.split(" ");
  const typedWords = userInput.split(" ");

  console.log({ typedWords });

  return (
    <div className="text" style={{ display: "flex" }}>
      {testWords.map((word) => {
        return (
          <div className="word">
            {`${word + "\u00a0"}`.split("").map((letter) => {
              return <span>{letter}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
}
