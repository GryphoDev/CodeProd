import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/dataStore";
import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { useGameStore } from "@/store/gameStore";
import { shuffleArray } from "@/utils/shuffleArray";
import { Terminal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKeyboard } from "./utils/useKeyboard";
import { CodeSnippetDisplay } from "./utils/codeDisplay";
import { getSnippetsSelected } from "./utils/getSnippetsSelected";
import { ScoringBoard } from "@/components/scoringBoard/scoringBoard";

export function Game() {
  const {
    badAnswers,
    realAccuracy,
    accuracy,
    snippets,
    snippetIndex,
    userInput,
    error,
    isStarted,
    isFinish,
    setSnippets,
    setGoodAnswers,
    setBadAnswers,
    resetGame,
    nextSnippet,
  } = useGameStore();
  const { difficulty, gameMode, langChecked } = useGameSettingsStore();
  const allSnippets = useStore((state) => state.allSnippets);
  const [lastCheckedIndex, setLastCheckedIndex] = useState(0);

  const navigate = useNavigate();
  const dummyRef = useRef<HTMLDivElement>(null);
  const currentSnippet = snippets[snippetIndex];

  useKeyboard();

  useEffect(() => {
    if (!difficulty || !gameMode || !langChecked) {
      navigate("/");
    } else {
      const snippetsSelected = getSnippetsSelected({
        allSnippets,
        langChecked,
        difficulty,
      });
      const shuffledSnippets = shuffleArray(snippetsSelected);
      setSnippets(shuffledSnippets);
    }
  }, [navigate, allSnippets, difficulty, gameMode, langChecked, setSnippets]);

  useEffect(() => {
    const currentSnippet = snippets[snippetIndex]?.code;
    if (!currentSnippet) return;

    let count = 0;

    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === currentSnippet[i]) {
        count++;
      }
    }

    setGoodAnswers(count);

    if (userInput.length > lastCheckedIndex) {
      for (let i = lastCheckedIndex; i < userInput.length; i++) {
        if (userInput[i] !== currentSnippet[i]) {
          setBadAnswers(badAnswers + 1);
        }
      }
      setLastCheckedIndex(userInput.length);
    }
  }, [
    userInput,
    snippetIndex,
    snippets,
    lastCheckedIndex,
    setGoodAnswers,
    badAnswers,
    setBadAnswers,
    resetGame,
    nextSnippet,
  ]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 py-20">
      <div ref={dummyRef} tabIndex={-1} className="sr-only" />

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Code {snippets[snippetIndex]?.language}
      </h2>

      {currentSnippet && (
        <CodeSnippetDisplay
          snippet={snippets[snippetIndex]?.code}
          userInput={userInput}
        />
      )}
      {error && (
        <Alert className="w-fit bg-destructive/70">
          <Terminal className="h-4 w-4" />
          <AlertDescription>Press Enter Key</AlertDescription>
        </Alert>
      )}
      {!isStarted && (
        <span>Once you’re ready, start typing to begin the timer.</span>
      )}
      {isFinish && (
        <div className="flex flex-col text-center">
          <span className="font-bold">{`Accuracy : ${accuracy}%, Real Accuracy : ${realAccuracy}%`}</span>
          {accuracy === 100 && accuracy - realAccuracy !== 0 && (
            <span className="text-sm">{`You typed all the characters correctly, but some mistakes were made, resulting in a ${
              accuracy - realAccuracy
            }% difference`}</span>
          )}
          {accuracy < 100 && accuracy - realAccuracy !== 0 && (
            <span className="text-sm">
              {`You missed a few characters, and even after fixing the mistakes,
              there’s still a ${accuracy - realAccuracy}% difference due to the
              errors.`}
            </span>
          )}
          {accuracy < 100 && accuracy === realAccuracy && (
            <span>{`You made a few mistakes, but your real accuracy matches your overall accuracy of ${accuracy}%`}</span>
          )}
          {accuracy === 100 && realAccuracy === 100 && (
            <span className="text-sm">{`Nice job, you nailed it with zero mistakes!`}</span>
          )}
        </div>
      )}
      <div className="flex gap-2">
        <Button
          children="Restart"
          onClick={() => {
            resetGame();
            setLastCheckedIndex(0);
            dummyRef.current?.focus();
          }}
        />
        <Button
          children="Next"
          onClick={() => {
            nextSnippet();
            setLastCheckedIndex(0);
            dummyRef.current?.focus();
          }}
        />
      </div>
      <div className="w-10/12">
        <ScoringBoard />
      </div>
    </div>
  );
}
