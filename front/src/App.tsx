import { useEffect, useRef, useState } from "react";

import { Layout } from "./shared/ui/Layout";
import { Header } from "./shared/ui/Header";
import { useTimer } from "./shared/lib/hooks/useTimer";
import { useLatest } from "./shared/lib/hooks/useLatest";

import { useTestQuery } from "./entities/test/model/useTestQuery";
import { useSettingsContext } from "./entities/settings/model/context";

import { SettingsButton } from "./features/test/ui/SettingsButton/container";

export function App() {
  const { settings } = useSettingsContext();

  console.log(settings.testType);

  const { testData } = useTestQuery(settings.testType);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [userInput, setUserInput] = useState<string>("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };

  const { timeLeft, status, start, reset } = useTimer(settings.duration);

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
    <Layout>
      <Header>
        <SettingsButton />
      </Header>

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
        <div className="hint">
          {
            {
              waiting: "Press any key to start",
              started: "Typing...",
              finished: "You are finished ( Escape to restart )",
            }[status]
          }
        </div>

        <div className="timer" style={{ fontSize: "32px", fontWeight: 500 }}>
          {Math.ceil(timeLeft)}
        </div>

        <Text testData={testData?.text} userInput={userInput} />

        <textarea
          ref={textAreaRef}
          autoFocus
          style={{ height: 0, border: "none", padding: 0 }}
          onChange={onChangeHandler}
          value={userInput}
          name="hiddenUserInput"
          disabled={status === "finished"}
        />
      </div>
    </Layout>
  );
}

interface Props {
  testData: string | undefined;
  userInput: string;
}

function Text({ testData, userInput }: Props) {
  if (!testData) {
    return "Loading...";
  }
  const testLetters = testData.split("");
  const typedLetters = userInput.split("");

  return (
    <pre className="text" style={{ margin: 0, padding: "20px" }}>
      {testLetters.map((letter, index) => {
        const typedLetter = typedLetters[index];

        const color = (() => {
          if (!typedLetter) {
            return "#a1a1a1";
          }

          if (typedLetter === letter) {
            return "#fff";
          }

          return "red";
        })();

        return (
          <span key={index} style={{ color }}>
            {letter}
          </span>
        );
      })}
    </pre>
  );
}
