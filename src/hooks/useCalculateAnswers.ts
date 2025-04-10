import { useGameStore } from "@/store/gameStore";
import { useEffect } from "react";

export function useCalculateAnswers() {
  const {
    badAnswers,
    snippets,
    snippetIndex,
    userInput,
    setGoodAnswers,
    setBadAnswers,
    lastCheckedIndex,
    setLastCheckedIndex,
  } = useGameStore();
  const currentCode = snippets[snippetIndex]?.code;

  // counter for good and bad answers
  useEffect(() => {
    console.log(lastCheckedIndex);
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
    lastCheckedIndex,
    currentCode,
    setLastCheckedIndex,
  ]);
}
