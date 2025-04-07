// store/gameStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CodeExample } from "./dataStore";

interface GameStore {
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
}

export const useGameStore = create<GameStore>()(
  devtools(
    (set) => ({
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
        }));
      },
    }),
    { name: "GameStore" }
  )
);
