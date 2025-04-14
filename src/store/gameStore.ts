// store/gameStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CodeExample } from "./dataStore";

export interface GameStore {
  timeStart: number | null;
  endTime: number | null;
  realAccuracy: number;
  accuracy: number;
  snippets: CodeExample[];
  snippetIndex: number;
  userInput: string;
  error: boolean;
  isStarted: boolean;
  isFinish: boolean;
  goodAnswers: number;
  totalGoodAnswers: number;
  badAnswers: number;
  timeLeft: number;
  lastCheckedIndex: number;
  totalUserInputLength: number;
  setTimeStart: (timeStart: number | null) => void;
  setEndTime: (endTime: number | null) => void;
  setRealAccuracy: (realAccuracy: number) => void;
  setBadAnswers: (badAnswer: number) => void;
  setAccuracy: (accuracy: number) => void;
  setSnippets: (snippets: CodeExample[]) => void;
  setSnippetIndex: (index: number) => void;
  setUserInput: (input: string) => void;
  setError: (error: boolean) => void;
  setIsStarted: (isStarted: boolean) => void;
  setIsFinish: (isFinish: boolean) => void;
  setGoodAnswers: (goodAnswers: number) => void;
  resetGame: () => void;
  nextSnippet: () => void;
  goToNextSnippet: () => void;
  setTimeLeft: (timeLeft: number) => void;
  setLastCheckedIndex: (lastCheckedIndex: number) => void;
  setTotalUserInputLength: (totalUserInputLength: number) => void;
  setTotalGoodAnswers: (update: number | ((prev: number) => number)) => void;
}

export const useGameStore = create<GameStore>()(
  devtools(
    (set) => ({
      timeStart: null,
      endTime: null,
      realAccuracy: 0,
      accuracy: 0,
      snippets: [],
      snippetIndex: 0,
      userInput: "",
      error: false,
      isStarted: false,
      isFinish: false,
      goodAnswers: 0,
      badAnswers: 0,
      timeLeft: 0,
      lastCheckedIndex: 0,
      totalUserInputLength: 0,
      totalGoodAnswers: 0,
      setTimeStart: (timeStart) => set({ timeStart }),
      setEndTime: (endTime) => set({ endTime }),
      setTotalUserInputLength: (totalUserInputLength) =>
        set({ totalUserInputLength }),
      setRealAccuracy: (realAccuracy) => set({ realAccuracy }),
      setBadAnswers: (badAnswers) => set({ badAnswers }),
      setAccuracy: (accuracy) => set({ accuracy }),
      setSnippets: (snippets) => set({ snippets }),
      setSnippetIndex: (index) => set({ snippetIndex: index }),
      setUserInput: (input) => set({ userInput: input }),
      setError: (error) => set({ error }),
      setIsStarted: (isStarted) => set({ isStarted }),
      setIsFinish: (isFinish) => set({ isFinish }),
      setGoodAnswers: (goodAnswers) => set({ goodAnswers }),
      setTimeLeft: (timeLeft) => set({ timeLeft }),
      setLastCheckedIndex: (lastCheckedIndex) => set({ lastCheckedIndex }),
      setTotalGoodAnswers: (update) =>
        set((state) => ({
          totalGoodAnswers:
            typeof update === "function"
              ? update(state.totalGoodAnswers)
              : update,
        })),
      resetGame: () => {
        set({
          userInput: "",
          error: false,
          isStarted: false,
          isFinish: false,
          goodAnswers: 0,
          badAnswers: 0,
          accuracy: 0,
          realAccuracy: 0,
          lastCheckedIndex: 0,
          totalGoodAnswers: 0,
          totalUserInputLength: 0,
          timeStart: null,
          endTime: null,
        });
      },
      nextSnippet: () => {
        set((state) => ({
          snippetIndex: (state.snippetIndex + 1) % state.snippets.length,
          userInput: "",
          error: false,
          isStarted: false,
          isFinish: false,
          goodAnswers: 0,
          badAnswers: 0,
          accuracy: 0,
          realAccuracy: 0,
          lastCheckedIndex: 0,
          totalGoodAnswers: 0,
          totalUserInputLength: 0,
          timeStart: null,
          endTime: null,
        }));
      },
      goToNextSnippet: () => {
        set((state) => ({
          snippetIndex: (state.snippetIndex + 1) % state.snippets.length,
          totalGoodAnswers: state.totalGoodAnswers + (state.goodAnswers + 1),
          userInput: "",
          isStarted: true,
          isFinish: false,
          error: false,
          lastCheckedIndex: 0,
        }));
      },
    }),
    { name: "GameStore" }
  )
);
