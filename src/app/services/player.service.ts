import { Injectable } from '@angular/core';
import { Player } from '../models/player.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../models';
import { CardService } from './card-service';

/**
 * PlayerService
 *
 * This service manages player-related data. It is responsible
 * for initializing players, updating player card information
 * and calculating player scores.
 *
 */
@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private playersSubject = new BehaviorSubject<Player[]>([]);

  constructor(private cardService: CardService) {}

  // Initializes the players with the specified number.
  initializePlayers(numPlayers: number): void {
    const players = Array.from({ length: numPlayers }, (_, index) => ({
      id: `Player ${index + 1}`,
      cards: [],
      score: 0,
    }));
    this.playersSubject.next(players);
  }

  // Returns the players as observable
  getPlayers(): Observable<Player[]> {
    return this.playersSubject.asObservable();
  }

  // Deals a card from the card service and updates the player hand
  dealAndUpdatePlayer(player: Player): void {
    const updatedPlayerCards = this.cardService.dealCard(player.cards);
    this.updatePlayerCards(player.id, updatedPlayerCards);
  }

  // Updates the player's card array and recalculates their score based on the cards.
  private updatePlayerCards(playerId: string, cards: Card[]): void {
    const players = this.playersSubject.getValue();
    const updatedPlayers = players.map((player) => {
      if (player.id === playerId) {
        return { ...player, cards, score: this.getPlayerScore(cards) };
      }
      return player;
    });
    this.playersSubject.next(updatedPlayers);
  }

  // calculates the score for the plater
  private getPlayerScore(cards: Card[]): number {
    let score = 0;

    cards.forEach((card) => {
      score += card.value;
    });

    return score;
  }
}
