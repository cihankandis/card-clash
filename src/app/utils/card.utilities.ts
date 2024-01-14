import { Card } from '../models';

// Shuffles an array using the Fisher-Yates (Knuth) shuffle algorithm.
export function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Compares two Card objects primarily by their icons and secondarily by their values.
export function compareCards(cardA: Card, cardB: Card): number {
  const iconComparison = cardA.icon.localeCompare(cardB.icon);
  return iconComparison !== 0 ? iconComparison : cardA.value - cardB.value;
}
