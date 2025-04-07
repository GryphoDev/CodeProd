import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/dataStore";
import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { useGameStore } from "@/store/gameStore";
import { shuffleArray } from "@/utils/shuffleArray";
import { Terminal } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
    setSnippetIndex,
    setUserInput,
    setError,
    setIsStarted,
    setIsFinish,
    setGoodAnswers,
    resetGame,
  } = useGameStore();
  const { difficulty, gameMode, langChecked } = useGameSettingsStore();
  const navigate = useNavigate();

  const dummyRef = useRef<HTMLDivElement>(null);
  const allSnippets = useStore((state) => state.allSnippets);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!snippets[snippetIndex]) return;
      setIsStarted(true);

      const currentSnippet = snippets[snippetIndex].code;
      const expectedChar = currentSnippet[userInput.length];

      if (userInput.length >= currentSnippet.length - 1) {
        e.preventDefault();
        setIsFinish(true);
        return;
      }

      if (e.key === "Enter") {
        setError(false);
        setUserInput(userInput + "\n");
      } else if (e.key === "Backspace") {
        setError(false);
        setUserInput(userInput.slice(0, -1));
      } else if (expectedChar === "\n") {
        setError(true);
        e.preventDefault();
      } else if (e.key === "Tab") {
        e.preventDefault();
        setUserInput(userInput + "    ");
      } else if (e.key.length === 1) {
        setUserInput(userInput + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    userInput,
    snippets,
    snippetIndex,
    setIsStarted,
    setIsFinish,
    setUserInput,
    setError,
  ]);

  useEffect(() => {
    if (!allSnippets.length || !difficulty || !gameMode || !langChecked) {
      navigate("/");
    } else {
      const snippetsSelected = allSnippets.filter((snippet) => {
        return (
          snippet.difficulty === difficulty &&
          langChecked.some((lang) => lang === snippet.language)
        );
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
  }, [userInput, snippetIndex, snippets, setGoodAnswers]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 py-20">
      <div ref={dummyRef} tabIndex={-1} className="sr-only" />

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Code {snippets[snippetIndex]?.language}
      </h2>

      <pre>
        <code className="whitespace-pre-wrap break-words font-mono text-base">
          {snippets[snippetIndex]?.code.split("").map((char, i) => {
            const typedChar = userInput[i];
            const isCorrect = typedChar === char;

            let className = "";
            if (typedChar == null) {
              className = "text-foreground bg-chart-3/30 rounded-full";
            } else if (isCorrect) {
              className = "text-green-400";
            } else {
              className = "text-red-500 underline";
            }

            return (
              <span key={i} className={className}>
                {char}
              </span>
            );
          })}
        </code>
      </pre>
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
            setSnippetIndex((snippetIndex + 1) % snippets.length);
            setUserInput("");
            setGoodAnswers(0);
            setIsFinish(false);
            setError(false);
            dummyRef.current?.focus();
          }}
        />
      </div>
    </div>
  );
}
