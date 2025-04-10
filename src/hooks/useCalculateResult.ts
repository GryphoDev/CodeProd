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
    totalGoodAnswers,
    totalUserInputLength,
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
      console.log(`total answers : ${totalGoodAnswers}`);
      console.log(`total length : ${totalUserInputLength}`);

      const userCpm = Math.floor(
        ((totalGoodAnswers + 1) / totalTimeInSeconds) * 60
      );
      setCpm(userCpm);
      // Nombre d'erreurs corrigées = nombre total d'erreurs - erreurs actuelles
      // Les erreurs actuelles = totalUserInputLength - (totalGoodAnswers + 1)
      const currentErrors = totalUserInputLength - (totalGoodAnswers + 1);
      const correctedErrors = badAnswers - currentErrors;

      // Accuracy - basée sur l'état actuel
      const accuracy = Math.ceil(
        totalUserInputLength > 0
          ? ((totalGoodAnswers + 1) / totalUserInputLength) * 100
          : 0
      );
      setAccuracy(accuracy);

      // RealAccuracy - prend en compte toutes les erreurs commises
      // Si aucune erreur n'a été corrigée, elle sera identique à accuracy
      const totalAttempts = totalUserInputLength + correctedErrors;
      const realAccuracy = Math.ceil(
        totalAttempts > 0 ? ((totalGoodAnswers + 1) / totalAttempts) * 100 : 0
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
    totalGoodAnswers,
    totalUserInputLength,
  ]);
  return { setEndTime, setStartTime, startTime };
}
