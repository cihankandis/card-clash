import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState } from 'src/app/enums/game-state.enum';

/**
 * GameStateService
 *
 * This service is responsible for managing and tracking the state of the game,
 * It provides observables to allow other parts of the application to react to
 * changes in these states.
 *
 * Properties:
 * - currentRound$: Observable<number> - An observable that emits the current round number.
 * - gameState$: Observable<GameState> - An observable that emits the current state of the game.
 *
 * Methods:
 * - setMaxCardSlots(slots: number): Sets the maximum number of card slots.
 * - getMaxCardSlots(): Returns the current maximum number of card slots.
 */
@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private readonly currentRoundSubject = new BehaviorSubject<number>(0);
  currentRound$ = this.currentRoundSubject.asObservable();

  private readonly gameStateSubject = new BehaviorSubject<GameState>(
    GameState.NotStarted
  );
  gameState$ = this.gameStateSubject.asObservable();

  private maxCardSlots!: number;

  // Resets the game to its initial state and sets the game state to Active.
  resetState(): void {
    this.currentRoundSubject.next(0);
    this.updateGameState(GameState.Active);
  }

  // Increments the round counter. If the round limit is reached, updates the game state to GameOver.
  incrementRound(): void {
    this.currentRoundSubject.next(this.getCurrentRound() + 1);

    if (this.isRoundLimitReached()) {
      this.updateGameState(GameState.GameOver);
    }
  }

  // GameState): Updates the current game state.
  updateGameState(state: GameState): void {
    this.gameStateSubject.next(state);
  }

  // Sets the maximum number of card slots.
  setMaxCardSlots(slots: number): void {
    this.maxCardSlots = slots;
  }

  // Returns the current maximum number of card slots.
  getMaxCardSlots(): number {
    return this.maxCardSlots;
  }

  private getCurrentRound(): number {
    return this.currentRoundSubject.value;
  }

  // Checks if round limit is reached
  private isRoundLimitReached(): boolean {
    return this.getCurrentRound() >= this.getMaxCardSlots();
  }
}
