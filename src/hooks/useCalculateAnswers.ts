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
    set,
  } = useGameStore();
  const currentCode = snippets[snippetIndex]?.code;

  // counter for good and bad answers
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

    setTotalGoodAnswers((prev) => prev + goodAnswers);
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
