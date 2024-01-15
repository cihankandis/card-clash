import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models';
import { GameStateService, PlayerService } from 'src/app/services';

/**
 * Game Component
 * This component is responsible for rendering the game interface. It displays the
 * player hands
 */
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit {
  players$!: Observable<Player[]>;

  constructor(
    public playerService: PlayerService,
    public gameStateService: GameStateService
  ) {}

  ngOnInit(): void {
    this.players$ = this.playerService.getPlayers();
  }
}
