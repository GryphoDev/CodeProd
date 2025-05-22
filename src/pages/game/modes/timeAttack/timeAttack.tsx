import { CalculateAnswers } from "@/classes/calculateAnswers";
import { CalculateResult } from "@/classes/calculateResult";
import { SnippetsHandler } from "@/classes/getSnippets";
import { KeyboardListenerTimeAttackMode } from "@/classes/keyboardListener";
import { Timer } from "@/classes/timer";
import { ScoringBoard } from "@/components/scoringBoard/scoringBoard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/dataStore";
import { useGameSettingsStore } from "@/store/gameSettingsStore";
import { useGameStore } from "@/store/gameStore";
import { CodeSnippetDisplay } from "@/utils/codeDisplay";
import { Terminal } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "@/utils/useTranslation";
import { AccuracyMessage } from "@/components/accuracyMessage/accuracyMessage";

export function TimeAttackMode() {
  const { t } = useTranslation();
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
    timeLeft,
    setTimeLeft,
    goToNextSnippet,
  } = useGameStore();

  const lvls = useMemo(
    () => ({
      easy: 30,
      medium: 60,
      hard: 120,
    }),
    []
  );

  const { langChecked, gameMode } = useGameSettingsStore();
  const { difficulty } = useGameSettingsStore() as {
    difficulty: keyof typeof lvls;
  };
  const allSnippets = useStore((state) => state.allSnippets);
  const dummyRef = useRef<HTMLDivElement>(null);
  const hasSavedResultsRef = useRef(false);
  const currentCode = snippets[snippetIndex]?.code;
  const currentLanguage = snippets[snippetIndex]?.language;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

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

  const TimerProps = useMemo(
    () => ({
      setTimeLeft,
      isStarted,
      isFinish,
      timeLeft,
      difficulty,
      timerRef,
      lvls,
    }),
    [setTimeLeft, isStarted, isFinish, timeLeft, difficulty, timerRef, lvls]
  );

  // Get all selected Snippets
  useEffect(() => {
    const snippetsHandler = new SnippetsHandler(snippetProps);
    snippetsHandler.getSnippets();
  }, [snippetProps]);

  // Start listening keyboard
  useEffect(() => {
    if (snippets && snippets.length) {
      const keyboardHandler = new KeyboardListenerTimeAttackMode(
        keyboardProps,
        goToNextSnippet
      );
      keyboardHandler.startListening();
      return () => {
        keyboardHandler.stopListening();
      };
    }
  }, [keyboardProps, snippets, isFinish, timeLeft, goToNextSnippet]);

  // Start chrono when game is started
  const timer = useMemo(() => new Timer(TimerProps), [TimerProps]);
  useEffect(() => {
    if (!isInitializedRef.current) {
      timer.initializeTimer();
      isInitializedRef.current = true;
    }

    if (isStarted && !isFinish) {
      const stop = timer.startTimer();
      return () => stop?.();
    }
  }, [isStarted, isFinish, timer]);

  // Listening the end of chrono
  useEffect(() => {
    if (isStarted && timeLeft <= 0) {
      setTotalGoodAnswers((prev) => prev + goodAnswers);
      setEndTime(Date.now());
      setIsFinish(true);
      setIsStarted(false);
    }
  }, [
    isStarted,
    timeLeft,
    setTotalGoodAnswers,
    setEndTime,
    setIsFinish,
    setIsStarted,
    goodAnswers,
  ]);

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
          <AlertDescription>{t.game.alertEnterKey}</AlertDescription>
        </Alert>
      )}
      <span>
        {Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, "0")}
        :{(timeLeft % 60).toString().padStart(2, "0")}
      </span>
      {!isStarted && !isFinish && <span>{t.game.startMessage}</span>}
      {isFinish && <AccuracyMessage />}
      <div className="flex gap-2">
        <Button
          children="Restart"
          onClick={() => {
            timer.resetTimer();
            hasSavedResultsRef.current = false;
            resetGame();
            dummyRef.current?.focus();
          }}
        />
        <Button
          children="Next"
          onClick={() => {
            timer.resetTimer();
            hasSavedResultsRef.current = false;
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
