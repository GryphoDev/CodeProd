interface GameStore {
  setTimeLeft: (timeLeft: number) => void;
  isStarted: boolean;
  isFinish: boolean;
  timeLeft: number;
  difficulty: "easy" | "medium" | "hard";
  timerRef: React.RefObject<NodeJS.Timeout | null>;
  lvls: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export class Timer {
  gs;
  constructor(gs: GameStore) {
    this.gs = gs;
  }

  initializeTimer() {
    this.gs.setTimeLeft(this.gs.lvls[this.gs.difficulty]);
  }

  startTimer() {
    if (!this.gs.isStarted || this.gs.isFinish || this.gs.timeLeft <= 0) return;

    this.gs.timerRef.current = setInterval(() => {
      if (this.gs.timeLeft <= 1) {
        clearInterval(this.gs.timerRef.current!);
        this.gs.setTimeLeft(0);
      } else {
        this.gs.setTimeLeft(this.gs.timeLeft - 1);
      }
    }, 1000);

    return () => {
      if (this.gs.timerRef.current) clearInterval(this.gs.timerRef.current);
    };
  }

  resetTimer() {
    if (this.gs.timerRef.current) clearInterval(this.gs.timerRef.current);
    this.initializeTimer();
  }
}
