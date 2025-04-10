import { useEffect, useCallback } from "react";
import { useGameStore } from "@/store/gameStore";
import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { useCalculateResults } from "./useCalculateResult";

export const useKeyboard = () => {
  const {
    isStarted,
    timeLeft,
    snippets,
    snippetIndex,
    userInput,
    isFinish,
    setUserInput,
    setError,
    setIsStarted,
    setIsFinish,
    goToNextSnippet,
  } = useGameStore();

  const { gameMode } = useGameSettingsStore();
  const { setEndTime, setStartTime, startTime } = useCalculateResults();

  useEffect(() => {
    if (isFinish) {
      setStartTime(null);
      setEndTime(null);
    }
    return;
  }, [snippetIndex, isFinish, setEndTime, setStartTime]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!snippets[snippetIndex] || isFinish) return;
      if (startTime === null) setStartTime(Date.now());
      setIsStarted(true);

      const currentSnippet = snippets[snippetIndex].code;
      const expectedChar = currentSnippet[userInput.length];
      let newInput = userInput;

      if (e.key === "Enter") {
        setError(false);
        newInput += "\n";
      } else if (e.key === "Backspace") {
        setError(false);
        newInput = newInput.slice(0, -1);
      } else if (expectedChar === "\n") {
        setError(true);
        e.preventDefault();
        return;
      } else if (e.key === " ") {
        e.preventDefault();
        newInput += " ";
      } else if (e.key === "Tab") {
        e.preventDefault();
        newInput += "    ";
      } else if (e.key.length === 1) {
        newInput += e.key;
      }

      setUserInput(newInput);

      if (
        gameMode === "timeAttack" &&
        newInput.length >= currentSnippet.length
      ) {
        goToNextSnippet();
      }

      if (timeLeft !== null && timeLeft > 0) {
        return;
      }

      if (newInput.length >= currentSnippet.length) {
        setEndTime(Date.now());
        window.removeEventListener("keydown", handleKeyDown);
        setIsFinish(true);
      }
    },

    [
      setStartTime,
      snippets,
      snippetIndex,
      userInput,
      isFinish,
      setError,
      setIsStarted,
      setUserInput,
      setIsFinish,
      startTime,
      gameMode,
      timeLeft,
      goToNextSnippet,
      setEndTime,
    ]
  );

  useEffect(() => {
    if (isFinish) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isFinish]);

  useEffect(() => {
    if (gameMode === "timeAttack") {
      if (isStarted && !isFinish && timeLeft === 0) {
        setEndTime(Date.now() || startTime);
        setIsFinish(true);
      }
    }
  }, [
    timeLeft,
    isStarted,
    isFinish,
    setIsFinish,
    setEndTime,
    startTime,
    gameMode,
  ]);
};
