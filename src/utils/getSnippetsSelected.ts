import { CodeExample } from "@/store/dataStore";

type SnippetsSelectedProps = {
  allSnippets: CodeExample[];
  langChecked: string[];
  difficulty: string;
};

export function getSnippetsSelected({
  allSnippets,
  langChecked,
  difficulty,
}: SnippetsSelectedProps) {
  const snippetsSelected = allSnippets.filter((snippet) => {
    return (
      snippet.difficulty === difficulty &&
      langChecked.some((lang) => lang === snippet.language)
    );
  });
  return snippetsSelected;
}
