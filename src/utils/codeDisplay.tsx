type CodeSnippetDisplayProps = {
  snippet: string;
  userInput: string;
};

export function CodeSnippetDisplay({
  snippet,
  userInput,
}: CodeSnippetDisplayProps) {
  return (
    <pre className=" max-w-2xl">
      <code className="whitespace-pre-wrap break-words font-mono text-base">
        {snippet.split("").map((char, i) => {
          const typedChar = userInput[i];
          const isCorrect = typedChar === char;

          let className = "";
          if (typedChar == null) {
            className = "text-foreground bg-chart-3/30 rounded-full";
          } else if (isCorrect) {
            className = "text-green-400";
          } else {
            className = "text-red-500 underline";
          }

          return (
            <span key={i} className={className}>
              {char}
            </span>
          );
        })}
      </code>
    </pre>
  );
}
