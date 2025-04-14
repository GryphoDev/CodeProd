import { CalculateAnswers } from "@/classes/calculateAnswers";
import { CalculateResult } from "@/classes/calculateResult";
import { SnippetsHandler } from "@/classes/getSnippets";
import { KeyboardListener } from "@/classes/keyboardListener";
import { ScoringBoard } from "@/components/scoringBoard/scoringBoard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/dataStore";
import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { useGameStore } from "@/store/gameStore";
import { CodeSnippetDisplay } from "@/utils/codeDisplay";
import { Terminal } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";

export function ClassicMode() {
  const {
    snippets,
    snippetIndex,
    setSnippets,
    setUserInput,
    setError,
    setTotalUserInputLength,
    totalUserInputLength,
    userInput,
    error,
    isStarted,
    isFinish,
    accuracy,
    realAccuracy,
    resetGame,
    nextSnippet,
    setTimeStart,
    timeStart,
    setIsStarted,
    setEndTime,
    setIsFinish,
    lastCheckedIndex,
    setLastCheckedIndex,
    goodAnswers,
    setGoodAnswers,
    badAnswers,
    setBadAnswers,
    endTime,
    totalGoodAnswers,
    setAccuracy,
    setRealAccuracy,
    setTotalGoodAnswers,
  } = useGameStore();
  const { langChecked, difficulty, gameMode } = useGameSettingsStore();
  const allSnippets = useStore((state) => state.allSnippets);
  const dummyRef = useRef<HTMLDivElement>(null);
  const hasSavedResultsRef = useRef(false);
  const currentCode = snippets[snippetIndex]?.code;
  const currentLanguage = snippets[snippetIndex]?.language;

  const keyboardProps = useMemo(
    () => ({
      snippets,
      snippetIndex,
      setUserInput,
      setError,
      setTotalUserInputLength,
      totalUserInputLength,
      userInput,
      setTimeStart,
      timeStart,
      setIsStarted,
      setEndTime,
      setIsFinish,
      setTotalGoodAnswers,
      goodAnswers,
      isFinish,
    }),
    [
      snippets,
      snippetIndex,
      setUserInput,
      setError,
      setTotalUserInputLength,
      totalUserInputLength,
      userInput,
      setTimeStart,
      timeStart,
      setIsStarted,
      setEndTime,
      setIsFinish,
      setTotalGoodAnswers,
      goodAnswers,
      isFinish,
    ]
  );

  const snippetProps = useMemo(
    () => ({
      setSnippets: setSnippets,
      langChecked,
      difficulty,
      allSnippets,
    }),
    [setSnippets, langChecked, difficulty, allSnippets]
  );

  const calculateAnswersProps = useMemo(
    () => ({
      userInput,
      currentCode,
      lastCheckedIndex,
      setLastCheckedIndex,
      goodAnswers,
      setGoodAnswers,
      badAnswers,
      setBadAnswers,
    }),
    [
      userInput,
      currentCode,
      lastCheckedIndex,
      setLastCheckedIndex,
      goodAnswers,
      setGoodAnswers,
      badAnswers,
      setBadAnswers,
    ]
  );

  const calculateResultProps = useMemo(
    () => ({
      endTime,
      timeStart,
      totalGoodAnswers,
      totalUserInputLength,
      badAnswers,
      setAccuracy,
      setRealAccuracy,
      snippets,
      snippetIndex,
      gameMode,
      difficulty,
      setTotalGoodAnswers,
      goodAnswers,
    }),
    [
      endTime,
      timeStart,
      totalGoodAnswers,
      totalUserInputLength,
      badAnswers,
      setAccuracy,
      setRealAccuracy,
      snippets,
      snippetIndex,
      gameMode,
      difficulty,
      setTotalGoodAnswers,
      goodAnswers,
    ]
  );

  // Get all selected Snippets
  useEffect(() => {
    const snippetsHandler = new SnippetsHandler(snippetProps);
    snippetsHandler.getSnippets();
  }, [snippetProps]);

  useEffect(() => {
    // Start listening keyboard
    if (snippets && snippets.length) {
      const keyboardHandler = new KeyboardListener(keyboardProps);
      keyboardHandler.startListening();
      return () => {
        keyboardHandler.stopListening();
      };
    }
  }, [keyboardProps, snippets]);

  useEffect(() => {
    // Calculate Good and Bad response
    const calculateAnswers = new CalculateAnswers(calculateAnswersProps);
    calculateAnswers.setAnswers();
  }, [userInput, calculateAnswersProps]);

  useEffect(() => {
    // When finish calculate results
    if (isFinish && !hasSavedResultsRef.current) {
      const calculateResult = new CalculateResult(calculateResultProps);
      calculateResult.setResults();
      hasSavedResultsRef.current = true;
    }
  }, [isFinish, calculateResultProps]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 py-20">
      <div ref={dummyRef} tabIndex={-1} className="sr-only" />

      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Code {currentLanguage}
      </h2>

      {currentCode && (
        <CodeSnippetDisplay snippet={currentCode} userInput={userInput} />
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
            hasSavedResultsRef.current = false;
            dummyRef.current?.focus();
          }}
        />
        <Button
          children="Next"
          onClick={() => {
            nextSnippet();
            hasSavedResultsRef.current = false;
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
