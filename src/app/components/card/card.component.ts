import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() isFaceUp: boolean = false;
  @Input() isNewlyDealt: boolean = false;
}
