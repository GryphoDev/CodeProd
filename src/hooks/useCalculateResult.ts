import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { useGameStore } from "@/store/gameStore";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export function useCalculateResults() {
  const {
    cpm,
    setAccuracy,
    badAnswers,
    goodAnswers,
    snippets,
    snippetIndex,
    setTotalTime,
    setFormattedTime,
    setCpm,
    setRealAccuracy,
  } = useGameStore();
  const { gameMode, difficulty } = useGameSettingsStore();

  const [endTime, setEndTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (endTime && startTime) {
      const totalTimeInSeconds = (endTime - startTime) / 1000;
      setTotalTime(totalTimeInSeconds);

      const minutes = Math.floor(totalTimeInSeconds / 60);
      const seconds = Math.floor(totalTimeInSeconds % 60);
      const formatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      setFormattedTime(formatted);

      const userCpm = Math.floor(((goodAnswers + 1) / totalTimeInSeconds) * 60);
      setCpm(userCpm);

      const totalLength = snippets[snippetIndex]?.code.length;
      const accuracy = Math.ceil(
        totalLength > 0 ? ((goodAnswers + 1) / totalLength) * 100 : 0
      );
      setAccuracy(accuracy);
      const realAccuracy = Math.ceil(
        totalLength > 0
          ? ((goodAnswers + 1 - badAnswers) / totalLength) * 100
          : 0
      );
      setRealAccuracy(realAccuracy);

      if (userCpm === 0) return;

      const newResult = {
        snippet: snippets[snippetIndex]?.language,
        length: snippets[snippetIndex]?.code.length,
        date: format(new Date(), "EEEE d MMMM yyyy, HH:mm:ss"),
        cpm: userCpm,
        realAccuracy: realAccuracy,
        time: formatted,
        ...(gameMode === "survival" && {
          error: badAnswers,
          difficulty: difficulty,
        }),
      };

      const savedResults = JSON.parse(
        localStorage.getItem(`${gameMode}Results`) || "[]"
      );

      const updatedResults = [...savedResults, newResult]
        .sort((a, b) => b.cpm - a.cpm)
        .slice(0, 10);

      localStorage.setItem(
        `${gameMode}Results`,
        JSON.stringify(updatedResults)
      );
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
    setAccuracy,
    badAnswers,
    setRealAccuracy,
    difficulty,
    gameMode,
  ]);
  return { setEndTime, setStartTime, startTime };
}
