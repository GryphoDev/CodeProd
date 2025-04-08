import { getSnippetsSelected } from "@/pages/game/utils/getSnippetsSelected";
import { useKeyboard } from "@/hooks/useKeyboard";
import { useStore } from "@/store/dataStore";
import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { useGameStore } from "@/store/gameStore";
import { shuffleArray } from "@/utils/shuffleArray";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// hooks/useGameController.js
export function useGameController() {
  const {
    realAccuracy,
    accuracy,
    isStarted,
    isFinish,
    error,
    badAnswers,
    snippets,
    snippetIndex,
    userInput,
    setSnippets,
    setGoodAnswers,
    setBadAnswers,
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
  const [lastCheckedIndex, setLastCheckedIndex] = useState(0);

  // Hook that implement all the keyboard behaviour
  useKeyboard();

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

  useEffect(() => {
    if (!currentCode) return;
    let count = 0;

    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === currentCode[i]) {
        count++;
      }
    }

    setGoodAnswers(count);

    if (userInput.length > lastCheckedIndex) {
      for (let i = lastCheckedIndex; i < userInput.length; i++) {
        if (userInput[i] !== currentCode[i]) {
          setBadAnswers(badAnswers + 1);
        }
      }
      setLastCheckedIndex(userInput.length);
    }
  }, [
    userInput,
    snippetIndex,
    snippets,
    setGoodAnswers,
    badAnswers,
    setBadAnswers,
    currentCode,
    lastCheckedIndex,
  ]);

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
