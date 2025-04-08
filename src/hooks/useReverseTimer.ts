import { useGameStore } from "@/store/gameStore";
import { useEffect, useRef } from "react";

export function useReverseTimer(initialTime: number) {
  const { isStarted, isFinish, timeLeft, setTimeLeft } = useGameStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  // Initialise le timer au lancement, une seule fois
  useEffect(() => {
    if (!isInitializedRef.current) {
      setTimeLeft(initialTime);
      isInitializedRef.current = true;
    }
  }, [initialTime, setTimeLeft]);

  // Lance le timer uniquement lorsque isStarted devient true
  useEffect(() => {
    if (!isStarted || isFinish || timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      if (timeLeft <= 1) {
        clearInterval(timerRef.current!);
        setTimeLeft(0);
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isStarted, isFinish, setTimeLeft, timeLeft]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(initialTime);
  };

  return { resetTimer, timeLeft };
}
