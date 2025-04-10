import { getSnippetsSelected } from "@/utils/getSnippetsSelected";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useStore } from "@/store/dataStore";
import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { useGameStore } from "@/store/gameStore";
import { shuffleArray } from "@/utils/shuffleArray";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCalculateAnswers } from "./useCalculateAnswers";

// hooks/useGameController.js
export function useGameController() {
  const {
    realAccuracy,
    accuracy,
    isStarted,
    isFinish,
    error,
    snippets,
    snippetIndex,
    userInput,
    setSnippets,
    resetGame,
    nextSnippet,
    setTimeLeft,
    goToNextSnippet,
  } = useGameStore();

  const navigate = useNavigate();
  const { langChecked, difficulty } = useGameSettingsStore();
  const allSnippets = useStore((state) => state.allSnippets);
  const currentCode = snippets[snippetIndex]?.code;
  const currentLanguage = snippets[snippetIndex]?.language;

  // Hook that implement all the keyboard behaviour
  useKeyboard();
  useCalculateAnswers();

  // Return the user snippets selection
  useEffect(() => {
    const snippetsSelected = getSnippetsSelected({
      allSnippets,
      langChecked,
      difficulty,
    });
    const shuffledSnippets = shuffleArray(snippetsSelected);
    setSnippets(shuffledSnippets);
  }, [navigate, allSnippets, langChecked, setSnippets, difficulty]);

  return {
    realAccuracy,
    accuracy,
    isStarted,
    isFinish,
    error,
    userInput,
    currentCode,
    currentLanguage,
    resetGame,
    nextSnippet,
    setTimeLeft,
    goToNextSnippet,
  };
}
