import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameState } from 'src/app/enums/game-state.enum';
import { GameStateService } from 'src/app/services/game/game-state.service';
import { GameManagerService } from 'src/app/services/game/game-manager.service';

/**
 * GameControlsComponent
 * This component manages the game state such as starting a new game,
 * dealing the next round, and restarting the game after it's over.
 */
@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameControlsComponent {
  currentRound$ = this.gameStateService.currentRound$;
  gameState$ = this.gameStateService.gameState$;

  GameState = GameState;

  constructor(
    public gameManagerService: GameManagerService,
    public gameStateService: GameStateService
  ) {}

  startNewGame(): void {
    this.gameManagerService.startNewGame();
  }

  restartGame(): void {
    this.gameManagerService.restartGame();
  }

  dealNextRound(): void {
    this.gameManagerService.dealNextRound();
  }
}
