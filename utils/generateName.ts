export function generateRandomUsername() {
  const adjectives = ["Fast", "Clever", "Brave", "Happy", "Chill"];
  const animals = ["Tiger", "Panda", "Koala", "Fox", "Otter"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(100 + Math.random() * 900);
  return `${adj}${animal}${number}`;
}
