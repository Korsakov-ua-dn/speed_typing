import { useEffect, useRef, useState } from "react";

import { useTimer } from "./shared/lib/hooks/useTimer";
import { useLatest } from "./shared/lib/hooks/useLatest";
import { useOpen } from "./shared/hooks/useOpen";
import { Layout } from "./shared/ui/Layout";
import { Header } from "./shared/ui/Header";

import { useTestQuery } from "./entities/test/model/useTestQuery";
import { useSettingsContext } from "./entities/settings/model/context";

import { SettingsButton } from "./features/test/ui/SettingsButton/container";
import { StatModal } from "./entities/test/ui/StatModal";

export function App() {
  const { settings } = useSettingsContext();

  const { testData, isLoading } = useTestQuery(settings.testType);

  const [userInput, setUserInput] = useState<string>("");

  const { isOpen: isStatModalOpen, actions: statModalActions } = useOpen();

  const { timeLeft, status, start, reset } = useTimer({
    duration: settings.duration,
    onFinish: statModalActions.open,
  });

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };

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
  }, [start]);

  if (typeof testData === "undefined" || isLoading) {
    return null;
  }

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

        <Progress testData={testData?.text} userInput={userInput} />

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

      {isStatModalOpen && (
        <StatModal
          userInput={userInput}
          testData={testData}
          onClose={statModalActions.close}
        />
      )}
    </Layout>
  );
}

type TProps = {
  testData: string | undefined;
  userInput: string;
};

const Progress = ({ testData, userInput }: TProps) => {
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
};
