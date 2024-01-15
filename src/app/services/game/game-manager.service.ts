import { Injectable, OnDestroy } from '@angular/core';
import { GameInitializationService } from './game-initialization.service';
import { Subject, first, takeUntil } from 'rxjs';
import { GameStateService } from './game-state.service';
import { PlayerService } from '../player.service';

/**
 * GameManagerService
 *
 * This service is responsible for managing the overall game lifecycle and interactions
 * It handles game initialization, starting new games, dealing rounds, and managing the
 * game's state transitions.
 *
 */

@Injectable({
  providedIn: 'root',
})
export class GameManagerService implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private gameInitializationService: GameInitializationService,
    private gameStateService: GameStateService,
    private playerService: PlayerService
  ) {
    this.initializeGame();
  }

  // Asks GameInitializationService to set up the game to initial state.
  private initializeGame(): void {
    this.gameInitializationService.initializeGame();
  }

  // Re-initializes and starts a new game.
  restartGame(): void {
    this.initializeGame();
    this.startNewGame();
  }

  // Resets the state and starts a new game.
  startNewGame(): void {
    this.gameStateService.resetState();
    this.dealNextRound();
  }

  /**
   * This method is called at the start of each new round and is responsible for
   * updating player hands and the game state.
   */
  dealNextRound(): void {
    this.playerService
      .getPlayers()
      .pipe(first(), takeUntil(this.destroy$))
      .subscribe((players) => {
        players.forEach((player) => {
          this.playerService.dealAndUpdatePlayer(player);
        });
        this.gameStateService.incrementRound();
      });
  }

  // Cleans up subscriptions.
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
