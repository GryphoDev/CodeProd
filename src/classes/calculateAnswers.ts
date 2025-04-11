interface GameStore {
  userInput: string;
  currentCode: string;
  lastCheckedIndex: number;
  setLastCheckedIndex: (lastCheckedIndex: number) => void;
  goodAnswers: number;
  setGoodAnswers: (goodAnswers: number) => void;
  badAnswers: number;
  setBadAnswers: (badAnswers: number) => void;
}

export class CalculateAnswers {
  gs;
  constructor(gs: GameStore) {
    this.gs = gs;
  }
  setAnswers() {
    this.calculateGoodAnswers();
    this.calculateBadAnswers();
  }

  calculateGoodAnswers() {
    let count = 0;

    for (let i = 0; i < this.gs.userInput.length; i++) {
      if (this.gs.userInput[i] === this.gs.currentCode[i]) {
        count++;
      }
    }
    this.gs.setGoodAnswers(count);
  }

  calculateBadAnswers() {
    if (this.gs.userInput.length > this.gs.lastCheckedIndex) {
      for (
        let i = this.gs.lastCheckedIndex;
        i < this.gs.userInput.length;
        i++
      ) {
        if (this.gs.userInput[i] !== this.gs.currentCode[i]) {
          this.gs.setBadAnswers(this.gs.badAnswers + 1);
        }
      }
      this.gs.setLastCheckedIndex(this.gs.userInput.length);
    }
  }
}
