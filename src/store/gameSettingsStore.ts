import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameStoreSettings {
  difficulty: string;
  gameMode: string;
  langChecked: string[];
  setDifficulty: (d: string) => void;
  setGameMode: (m: string) => void;
  setLangChecked: (langs: string[]) => void;
}

export const useGameSettingsStore = create<GameStoreSettings>()(
  persist(
    (set) => ({
      difficulty: "",
      gameMode: "",
      langChecked: [],
      setDifficulty: (d) => set({ difficulty: d }),
      setGameMode: (m) => set({ gameMode: m }),
      setLangChecked: (langs) => set({ langChecked: langs }),
    }),
    {
      name: "game-settings",
    }
  )
);
