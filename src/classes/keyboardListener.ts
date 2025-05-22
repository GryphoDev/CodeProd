import { CodeExample } from "@/store/dataStore";

interface GameStore {
  snippets: CodeExample[];
  snippetIndex: number;
  setUserInput: (input: string) => void;
  setError: (error: boolean) => void;
  setTotalUserInputLength: (totalUserInputLength: number) => void;
  totalUserInputLength: number;
  userInput: string;
  setTimeStart: (timeStart: number | null) => void;
  timeStart: number | null;
  setIsStarted: (isStarted: boolean) => void;
  setEndTime: (endTime: number | null) => void;
  setIsFinish: (isFinish: boolean) => void;
  setTotalGoodAnswers: (update: number | ((prev: number) => number)) => void;
  goodAnswers: number;
  isFinish: boolean;
}

export class KeyboardListener {
  gs;
  newUserInput: string = "";
  currentSnippet: string;

  constructor(gs: GameStore) {
    this.gs = gs;
    this.currentSnippet = this.gs.snippets[this.gs.snippetIndex].code;
    this.handleKeyboard = this.handleKeyboard.bind(this);
  }

  handleKeyboard(e: KeyboardEvent) {
    this.startChrono();

    this.newUserInput = this.gs.userInput;
    const expectedChar =
      this.gs.snippets[this.gs.snippetIndex]?.code[this.newUserInput.length];

    if (e.key === "Enter") {
      this.handleSpecialKeys("\n", false, "+", 1);
    } else if (e.key === "Backspace") {
      this.handleSpecialKeys(undefined, false, "-", 1);
    } else if (expectedChar === "\n") {
      this.handleSpecialKeys(undefined, true, undefined, undefined);
      e.preventDefault();
      return;
    } else if (e.key === " ") {
      this.handleSpecialKeys(" ", undefined, "+", 1);
      e.preventDefault();
    } else if (e.key === "Tab") {
      this.handleSpecialKeys("    ", undefined, "+", 4);
      e.preventDefault();
    } else if (e.key === "'") {
      this.handleSpecialKeys("'", undefined, "+", 1);
      e.preventDefault();
    } else if (e.key === "/") {
      this.handleSpecialKeys("/", undefined, "+", 1);
      e.preventDefault();
    } else if (e.key.length === 1) {
      this.handleSpecialKeys(e.key, undefined, "+", 1);
    }

    this.gs.setUserInput(this.newUserInput);
    this.endListening();
  }

  handleSpecialKeys(
    newInput?: string,
    error?: boolean,
    operator?: "+" | "-",
    nbr?: number
  ) {
    if (typeof error === "boolean") {
      this.gs.setError(error);
    }

    if (operator === "+" && nbr) {
      this.newUserInput += newInput;
      this.gs.setTotalUserInputLength(this.gs.totalUserInputLength + nbr);
    }
    if (operator === "-" && nbr) {
      this.newUserInput = this.newUserInput.slice(0, -1);
      this.gs.setTotalUserInputLength(this.gs.totalUserInputLength - nbr);
    }
  }

  startChrono() {
    if (!this.gs.timeStart) {
      this.gs.setTimeStart(Date.now());
      this.gs.setIsStarted(true);
    }
  }

  endListening() {
    if (this.newUserInput.length >= this.currentSnippet.length) {
      this.gs.setTotalGoodAnswers((prev) => prev + (this.gs.goodAnswers + 1));
      this.gs.setEndTime(Date.now());
      this.gs.setIsFinish(true);
      this.gs.setIsStarted(false);
      this.stopListening();
    }
  }

  startListening() {
    if (!this.gs.isFinish) {
      window.addEventListener("keydown", this.handleKeyboard);
    }
  }
  stopListening() {
    window.removeEventListener("keydown", this.handleKeyboard);
  }
}

export class KeyboardListenerTimeAttackMode extends KeyboardListener {
  goToNextSnippet: () => void;

  constructor(gs: GameStore, goToNextSnippet: () => void) {
    super(gs);
    this.goToNextSnippet = goToNextSnippet;
  }
  endListening() {
    if (this.newUserInput.length >= this.currentSnippet.length) {
      this.goToNextSnippet();
    }
  }
}
