import { Injectable } from '@angular/core';
import { GameConfig } from '../../models/config.model';
import { GameState } from 'src/app/enums/game-state.enum';
import { ConfigService } from '../config.service';
import { CardService } from '../card-service';
import { PlayerService } from '../player.service';
import { GameStateService } from './game-state.service';

/**
 * GameInitializationService
 *
 * This service is responsilbe for initializing the game state based on a given
 * configuration. It sets up the game components such as players, cards, and the
 * initial game state. The service relies on configuration setttings provided by the
 * ConfigService to customize the initialization process.
 *
 */
@Injectable({
  providedIn: 'root',
})
export class GameInitializationService {
  constructor(
    private configService: ConfigService,
    private cardService: CardService,
    private playerService: PlayerService,
    private gameStateService: GameStateService
  ) {}

  /**
   *  Starts the game initialization process. It fetches game configuration
   *  from ConfigService and delegates the initialization of game state,
   *  players, and cards to respective methods.
   */
  initializeGame(): void {
    this.configService.getConfig().subscribe((config: GameConfig) => {
      this.initializeGameState(config);
      this.initializePlayers(config);
      this.initializeCards(config);
    });
  }

  private initializeGameState(config: GameConfig): void {
    this.gameStateService.updateGameState(GameState.NotStarted);
    this.gameStateService.setMaxCardSlots(config.maxCardSlots);
  }

  private initializeCards(config: GameConfig): void {
    this.cardService.initializeCards(config.suits);
    this.cardService.shuffleCards();
  }

  private initializePlayers(config: GameConfig): void {
    this.playerService.initializePlayers(config.numberOfPlayers);
  }
}
