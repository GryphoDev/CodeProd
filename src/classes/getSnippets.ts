import { CodeExample } from "@/store/dataStore";

type SnippetsSelectedProps = {
  setSnippets: (snippets: CodeExample[]) => void;
  allSnippets: CodeExample[];
  langChecked: string[];
  difficulty: string;
};
export class SnippetsHandler {
  setSnippets: (snippets: CodeExample[]) => void;
  allSnippets: CodeExample[];
  langChecked: string[];
  difficulty: string;
  selectedSnippets: CodeExample[] = [];

  constructor({
    setSnippets,
    allSnippets,
    langChecked,
    difficulty,
  }: SnippetsSelectedProps) {
    this.setSnippets = setSnippets;
    this.allSnippets = allSnippets;
    this.langChecked = langChecked;
    this.difficulty = difficulty;
  }

  getSnippets() {
    this.filterSnippets();
    this.setSnippets(this.shuffleArray(this.selectedSnippets));
  }

  filterSnippets() {
    this.selectedSnippets = this.allSnippets.filter((snippet) => {
      return (
        snippet.difficulty === this.difficulty &&
        this.langChecked.includes(snippet.language)
      );
    });
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Choisir un indice aléatoire
      [array[i], array[j]] = [array[j], array[i]]; // Échanger les éléments
    }
    return array;
  }
}
