export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Choisir un indice aléatoire
    [array[i], array[j]] = [array[j], array[i]]; // Échanger les éléments
  }
  return array;
}
