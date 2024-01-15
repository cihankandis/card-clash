import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '../../models';

/**
 * PlayerComponent
 * Displays a player in the game, displaying their ID, score, and the cards.
 */
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  @Input() playerId: string = '';
  @Input() score: number = 0;
  @Input() maxCardSlots: number = 5;
  private _cards: Card[] = [];
  @Input()
  set cards(value: Card[]) {
    this._cards = value;
    this.updateCardSlots();
  }

  get cards(): Card[] {
    return this._cards;
  }

  emptyCardSlots: number[] = [];

  private updateCardSlots(): void {
    this.emptyCardSlots = Array(this.maxCardSlots - this.cards.length).fill(0);
  }
}
