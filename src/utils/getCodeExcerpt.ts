export const getCodeExcerpt = (language: string): string => {
  const excerptMap: Record<string, string> = {
    JavaScript: `<span class="keyword">console</span>.<span class="function">log</span>(<span class="string">"Hello, World!"</span>);`,
    TypeScript: `<span class="keyword">console</span>.<span class="function">log</span>(<span class="string">"Hello, World!"</span>);`,
    Python: `<span class="function">print</span>(<span class="string">"Hello, World!"</span>)`,
    Java: `<span class="class">System</span>.<span class="method">out</span>.<span class="function">println</span>(<span class="string">"Hello, World!"</span>);`,
    "C++": `<span class="class">std</span>::<span class="function">cout</span> << <span class="string">"Hello, World!"</span>;\n}`,
    "C#": `<span class="class">Console</span>.<span class="function">WriteLine</span>(<span class="string">"Hello, World!"</span>);\n  }\n}`,
    Go: `<span class="function">fmt.Println</span>(<span class="string">"Hello, World!"</span>);\n}`,
    Rust: `<span class="keyword">fn</span> <span class="function">main</span>() {\n  <span class="macro">println!</span>(<span class="string">"Hello, World!"</span>);\n}`,
    Swift: `<span class="keyword">import</span> <span class="class">Swift</span>\n\n<span class="function">print</span>(<span class="string">"Hello, World!"</span>)`,
    Kotlin: `<span class="keyword">fun</span> <span class="function">main</span>() {\n  <span class="function">println</span>(<span class="string">"Hello, World!"</span>)\n}`,
    Ruby: `<span class="function">puts</span> <span class="string">"Hello, World!"</span>`,
    PHP: `<span class="keyword">&lt;?php</span>\n\n<span class="function">echo</span> <span class="string">"Hello, World!"</span>;<span class="tag">?&gt;</span>`,
  };

  return excerptMap[language] || "/default.png";
};
