import { Suit } from './suit.model';

export interface GameConfig {
  numberOfPlayers: number;
  maxCardSlots: number;
  suits: Suit[];
}
