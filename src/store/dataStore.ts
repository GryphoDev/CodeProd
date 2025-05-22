import { create } from "zustand";
import { devtools } from "zustand/middleware";
import data from "@/lib/snippets.json";

export type CodeExample = {
  _id: string;
  code: string;
  language: string;
  difficulty: string;
};

type Store = {
  allSnippets: CodeExample[];
  allLanguages: string[];
  fetchAllSnippets: () => CodeExample[];
  fetchAllLanguages: () => string[];
};

export const useStore = create<Store>()(
  devtools(
    (set) => ({
      allSnippets: [],
      allLanguages: [],

      fetchAllSnippets: () => {
        set({ allSnippets: data }, false, "fetchAllSnippets");
      },

      fetchAllLanguages: () => {
        const result: string[] = [];
        const categories = data.map((snippet) => snippet.language);
        for (const category of categories) {
          if (!result.includes(category)) {
            result.push(category);
          }
        }
        set({ allLanguages: result }, false, "fetchAllLanguages");
      },
    }),
    { name: "SnippetStore" }
  )
);
