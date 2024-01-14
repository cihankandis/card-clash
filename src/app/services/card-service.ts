import { Injectable } from '@angular/core';
import { Card, Suit } from '../models';
import { compareCards, shuffleArray } from '../utils/card.utilities';

/**
 * CardService
 *
 * This service is responsible for managing the cards. It handles initializing,
 * shuffling and dealing.
 */
@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cards: Card[] = [];
  private shuffledCards: Card[] = [];

  // Initializes the deck of cards based on the provided suits.
  initializeCards(suits: Suit[]): void {
    this.cards = suits.flatMap((suit) =>
      suit.cards.map((card) => ({
        ...card,
        icon: suit.icon,
        isNewlyDealt: true,
      }))
    );
  }

  // Shuffles the cards using utility function and stores them seperately
  shuffleCards(): void {
    this.shuffledCards = shuffleArray([...this.cards]);
  }

  // Returns the top card from the shuffled cards array.
  private getCard(): Card | undefined {
    if (this.shuffledCards.length === 0) {
      console.error('No cards left in the deck.');
      return;
    }
    return this.shuffledCards.pop();
  }

  /**
   * This method gets the card from the shuiffled cards array and adds it to the player cards array.
   * Previously dealt cards are marked as not newly dealt
   * Finally sorts the cards and returns the card array.
   */
  dealCard(playerCards: Card[]): Card[] {
    const card = this.getCard();
    if (card) {
      const updatedCards = playerCards
        .map((playerCard) => ({ ...playerCard, isNewlyDealt: false }))
        .concat({ ...card, isNewlyDealt: true });

      return this.sortCards(updatedCards);
    }
    return [];
  }

  private sortCards(cards: Card[]): Card[] {
    return cards.sort(compareCards);
  }
}
