import { Card } from './card.model';

export interface Suit {
  name: string;
  icon: string;
  cards: Card[];
}
