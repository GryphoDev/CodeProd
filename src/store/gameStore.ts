// store/gameStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CodeExample } from "./dataStore";

interface GameStore {
  realAccuracy: number;
  accuracy: number;
  cpm: number;
  formatedTime: string;
  totalTime: number;
  snippets: CodeExample[];
  snippetIndex: number;
  userInput: string;
  error: boolean;
  isStarted: boolean;
  isFinish: boolean;
  goodAnswers: number;
  badAnswers: number;
  timeLeft: number;
  setRealAccuracy: (realAcuuracy: number) => void;
  setBadAnswers: (badAnswer: number) => void;
  setAccuracy: (accuracy: number) => void;
  setFormattedTime: (formatedTime: string) => void;
  setTotalTime: (totalTime: number) => void;
  setSnippets: (snippets: CodeExample[]) => void;
  setSnippetIndex: (index: number) => void;
  setUserInput: (input: string) => void;
  setError: (error: boolean) => void;
  setIsStarted: (isStarted: boolean) => void;
  setIsFinish: (isFinish: boolean) => void;
  setGoodAnswers: (goodAnswers: number) => void;
  setCpm: (cpm: number) => void;
  resetGame: () => void;
  nextSnippet: () => void;
  goToNextSnippet: () => void;
  setTimeLeft: (timeLeft: number) => void;
}

export const useGameStore = create<GameStore>()(
  devtools(
    (set) => ({
      realAccuracy: 0,
      accuracy: 0,
      cpm: 0,
      formatedTime: "",
      totalTime: 0,
      snippets: [],
      snippetIndex: 0,
      userInput: "",
      error: false,
      isStarted: false,
      isFinish: false,
      goodAnswers: 0,
      badAnswers: 0,
      timeLeft: 0,
      setRealAccuracy: (realAccuracy) => set({ realAccuracy }),
      setBadAnswers: (badAnswers) => set({ badAnswers }),
      setAccuracy: (accuracy) => set({ accuracy }),
      setFormattedTime: (formatedTime) => set({ formatedTime }),
      setTotalTime: (totalTime) => set({ totalTime }),
      setSnippets: (snippets) => set({ snippets }),
      setSnippetIndex: (index) => set({ snippetIndex: index }),
      setUserInput: (input) => set({ userInput: input }),
      setError: (error) => set({ error }),
      setIsStarted: (isStarted) => set({ isStarted }),
      setIsFinish: (isFinish) => set({ isFinish }),
      setGoodAnswers: (goodAnswers) => set({ goodAnswers }),
      setCpm: (cpm) => set({ cpm }),
      setTimeLeft: (timeLeft) => set({ timeLeft }),
      resetGame: () => {
        set({
          cpm: 0,
          formatedTime: "",
          totalTime: 0,
          userInput: "",
          error: false,
          isStarted: false,
          isFinish: false,
          goodAnswers: 0,
          badAnswers: 0,
          accuracy: 0,
          realAccuracy: 0,
        });
      },
      nextSnippet: () => {
        set((state) => ({
          snippetIndex: (state.snippetIndex + 1) % state.snippets.length,
          cpm: 0,
          formatedTime: "",
          totalTime: 0,
          userInput: "",
          error: false,
          isStarted: false,
          isFinish: false,
          goodAnswers: 0,
          badAnswers: 0,
          accuracy: 0,
          realAccuracy: 0,
        }));
      },
      goToNextSnippet: () => {
        set((state) => ({
          snippetIndex: (state.snippetIndex + 1) % state.snippets.length,
          userInput: "",
          isStarted: true,
          isFinish: false,
          error: false,
        }));
      },
    }),
    { name: "GameStore" }
  )
);
