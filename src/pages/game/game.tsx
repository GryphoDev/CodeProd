import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/dataStore";
import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { useGameStore } from "@/store/gameStore";
import { shuffleArray } from "@/utils/shuffleArray";
import { Terminal } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useKeyboard } from "./utils/useKeyboard";
import { CodeSnippetDisplay } from "./utils/codeDisplay";
import { getSnippetsSelected } from "./utils/getSnippetsSelected";
import { ScoringBoard } from "@/components/scoringBoard/scoringBoard";

export function Game() {
  const {
    snippets,
    snippetIndex,
    userInput,
    error,
    isStarted,
    isFinish,
    goodAnswers,
    setSnippets,
    setGoodAnswers,
    resetGame,
    nextSnippet,
  } = useGameStore();
  const { difficulty, gameMode, langChecked } = useGameSettingsStore();
  const allSnippets = useStore((state) => state.allSnippets);

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
      if (currentSnippet[i] !== "\n" && currentSnippet[i] !== " ") {
        if (userInput[i] === currentSnippet[i]) {
          count++;
        }
      }
    }
    setGoodAnswers(count);
  }, [userInput, snippetIndex, snippets, setGoodAnswers]);

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
        <span>{`Le jeu est fini vous avez ${goodAnswers} bonnes réponse`}</span>
      )}
      <div className="flex gap-2">
        <Button
          children="Restart"
          onClick={() => {
            resetGame();
            dummyRef.current?.focus();
          }}
        />
        <Button
          children="Next"
          onClick={() => {
            nextSnippet();
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
