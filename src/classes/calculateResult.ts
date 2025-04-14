import { CodeExample } from "@/store/dataStore";
import { format } from "date-fns";
interface GameStore {
  endTime: number | null;
  timeStart: number | null;
  totalGoodAnswers: number;
  totalUserInputLength: number;
  badAnswers: number;
  setAccuracy: (accuracy: number) => void;
  setRealAccuracy: (realAccuracy: number) => void;
  snippets: CodeExample[];
  snippetIndex: number;
  gameMode: string;
  difficulty: string;
  setTotalGoodAnswers: (update: number | ((prev: number) => number)) => void;
  goodAnswers: number;
}

export class CalculateResult {
  gs;
  hasSave: boolean = false;
  formattedTime: string = "";
  userCpm: number = 0;
  accuracy: number = 0;
  realAccuracy: number = 0;
  totalTimeInSeconds: number = 0;
  constructor(gs: GameStore) {
    this.gs = gs;
  }
  setResults() {
    this.getFormattedTime();
    this.getCpm();
    this.getAccuracy();
    this.getRealAccuracy();
    this.saveResults();
  }
  getFormattedTime() {
    if (
      typeof this.gs.endTime === "number" &&
      typeof this.gs.timeStart === "number"
    ) {
      this.totalTimeInSeconds = (this.gs.endTime - this.gs.timeStart) / 1000;
      if (this.totalTimeInSeconds <= 0) this.totalTimeInSeconds = 1;
      const minutes = Math.floor(this.totalTimeInSeconds / 60);
      const seconds = Math.floor(this.totalTimeInSeconds % 60);
      this.formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  }

  getCpm() {
    this.userCpm = Math.floor(
      (this.gs.totalGoodAnswers / this.totalTimeInSeconds) * 60
    );
  }

  getAccuracy() {
    this.accuracy = Math.ceil(
      this.gs.totalUserInputLength > 0
        ? (this.gs.totalGoodAnswers / this.gs.totalUserInputLength) * 100
        : 0
    );
    this.gs.setAccuracy(this.accuracy);
  }

  getRealAccuracy() {
    const currentErrors =
      this.gs.totalUserInputLength - this.gs.totalGoodAnswers;
    const correctedErrors = this.gs.badAnswers - currentErrors;
    const totalAttempts = this.gs.totalUserInputLength + correctedErrors;
    this.realAccuracy = Math.ceil(
      totalAttempts > 0 ? (this.gs.totalGoodAnswers / totalAttempts) * 100 : 0
    );
    this.gs.setRealAccuracy(this.realAccuracy);
  }

  saveResults() {
    if (this.hasSave) return;
    this.hasSave = true;
    console.log("saveResults");
    const newResult = {
      snippet: this.gs.snippets[this.gs.snippetIndex]?.language,
      length: this.gs.snippets[this.gs.snippetIndex]?.code.length,
      date: format(new Date(), "EEEE d MMMM yyyy, HH:mm:ss"),
      cpm: this.userCpm,
      realAccuracy: this.realAccuracy,
      time: this.formattedTime,
      ...(this.gs.gameMode === "survival" && {
        error: this.gs.badAnswers,
        difficulty: this.gs.difficulty,
      }),
    };

    const savedResults = JSON.parse(
      localStorage.getItem(`${this.gs.gameMode}Results`) || "[]"
    );

    const updatedResults = [...savedResults, newResult]
      .sort((a, b) => b.cpm - a.cpm)
      .slice(0, 10);

    localStorage.setItem(
      `${this.gs.gameMode}Results`,
      JSON.stringify(updatedResults)
    );
    window.dispatchEvent(new Event("scoreUpdated"));
  }
}
