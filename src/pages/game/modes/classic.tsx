import { useGameController } from "@/hooks/useGameController";
import { useRef } from "react";
import { CodeSnippetDisplay } from "../../../utils/codeDisplay";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoringBoard } from "@/components/scoringBoard/scoringBoard";

export function ClassicMode() {
  const {
    userInput,
    currentCode,
    currentLanguage,
    error,
    isStarted,
    isFinish,
    realAccuracy,
    accuracy,
    resetGame,
    nextSnippet,
  } = useGameController();
  const dummyRef = useRef<HTMLDivElement>(null);

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
