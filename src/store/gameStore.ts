// store/gameStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CodeExample } from "./dataStore";

interface GameStore {
  snippets: CodeExample[];
  snippetIndex: number;
  userInput: string;
  error: boolean;
  isStarted: boolean;
  isFinish: boolean;
  goodAnswers: number;
  setSnippets: (snippets: CodeExample[]) => void;
  setSnippetIndex: (index: number) => void;
  setUserInput: (input: string) => void;
  setError: (error: boolean) => void;
  setIsStarted: (isStarted: boolean) => void;
  setIsFinish: (isFinish: boolean) => void;
  setGoodAnswers: (goodAnswers: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>()(
  devtools((set) => ({
    snippets: [],
    snippetIndex: 0,
    userInput: "",
    error: false,
    isStarted: false,
    isFinish: false,
    goodAnswers: 0,
    setSnippets: (snippets) => set({ snippets }),
    setSnippetIndex: (index) => set({ snippetIndex: index }),
    setUserInput: (input) => set({ userInput: input }),
    setError: (error) => set({ error }),
    setIsStarted: (isStarted) => set({ isStarted }),
    setIsFinish: (isFinish) => set({ isFinish }),
    setGoodAnswers: (goodAnswers) => set({ goodAnswers }),
    resetGame: () =>
      set({ userInput: "", goodAnswers: 0, isFinish: false, error: false }),
  }))
);
