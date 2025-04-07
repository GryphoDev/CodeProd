import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type CodeExample = {
  _id: string;
  code: string;
  language: string;
  difficulty: "easy" | "medium" | "hard";
  createdAt: string;
  __v: number;
};

type Store = {
  allSnippets: CodeExample[];
  allLanguages: string[];
  fetchAllSnippets: () => Promise<CodeExample[]>;
  fetchAllLanguages: () => Promise<string[]>;
};

export const useStore = create<Store>()(
  devtools(
    (set) => ({
      allSnippets: [],
      allLanguages: [],

      fetchAllSnippets: async () => {
        const response = await fetch("http://localhost:3000/api/snippets");
        const data = await response.json();
        if (response.ok) {
          set({ allSnippets: data }, false, "fetchAllSnippets");
          return data;
        }
        return [];
      },

      fetchAllLanguages: async () => {
        const response = await fetch(
          "http://localhost:3000/api/snippets/allLanguages"
        );
        const data = await response.json();
        if (response.ok) {
          set({ allLanguages: data }, false, "fetchAllLanguages");
          return data;
        }
        return [];
      },
    }),
    { name: "SnippetStore" }
  )
);
