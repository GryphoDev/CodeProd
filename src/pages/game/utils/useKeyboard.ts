import { useEffect, useCallback, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { format } from "date-fns";

export const useKeyboard = () => {
  const {
    cpm,
    goodAnswers,
    snippets,
    snippetIndex,
    userInput,
    isFinish,
    setUserInput,
    setError,
    setIsStarted,
    setIsFinish,
    setTotalTime,
    setFormattedTime,
    setCpm,
  } = useGameStore();

  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  useEffect(() => {
    if (isFinish) {
      setStartTime(null);
      setEndTime(null);
    }
    return;
  }, [snippetIndex, isFinish]);

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
      } else if (e.key === "Tab") {
        e.preventDefault();
        newInput += "    ";
      } else if (e.key.length === 1) {
        newInput += e.key;
      }

      setUserInput(newInput);

      if (newInput.length >= currentSnippet.length) {
        setEndTime(Date.now());
        window.removeEventListener("keydown", handleKeyDown);
        setIsFinish(true);
      }
    },
    [
      snippets,
      snippetIndex,
      userInput,
      isFinish,
      setError,
      setIsStarted,
      setUserInput,
      setIsFinish,
      startTime,
    ]
  );

  useEffect(() => {
    if (endTime && startTime) {
      const totalTimeInSeconds = (endTime - startTime) / 1000;
      setTotalTime(totalTimeInSeconds);

      const minutes = Math.floor(totalTimeInSeconds / 60);
      const seconds = Math.floor(totalTimeInSeconds % 60);
      const formatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      setFormattedTime(formatted);

      const userCpm = Math.floor((goodAnswers / totalTimeInSeconds) * 60);
      setCpm(userCpm);

      if (userCpm === 0) return;

      const newResult = {
        snippet: snippets[snippetIndex]?.language,
        date: format(new Date(), "EEEE d MMMM yyyy, HH:mm:ss"),
        cpm: userCpm,
        time: formatted,
      };

      const savedResults = JSON.parse(
        localStorage.getItem("cpmResults") || "[]"
      );

      const updatedResults = [...savedResults, newResult]
        .sort((a, b) => b.cpm - a.cpm)
        .slice(0, 10);

      localStorage.setItem("cpmResults", JSON.stringify(updatedResults));
      window.dispatchEvent(new Event("scoreUpdated"));
    }
  }, [
    cpm,
    endTime,
    startTime,
    setTotalTime,
    setFormattedTime,
    setCpm,
    goodAnswers,
    snippetIndex,
    snippets,
  ]);

  useEffect(() => {
    if (isFinish) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isFinish]);
};
