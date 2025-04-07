export const getImagePath = (language: string): string => {
  const imageMap: Record<string, string> = {
    JavaScript: "/JavaScript.png",
    Python: "/Python.png",
    Java: "/Java.webp",
    "C++": "/C++.avif",
  };

  return imageMap[language] || "/default.png";
};
