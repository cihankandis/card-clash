import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { Player } from 'src/app/models';
import { GameStateService } from 'src/app/services/game/game-state.service';
import { PlayerService } from 'src/app/services/player.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let playerService: jasmine.SpyObj<PlayerService>;
  let gameStateService: jasmine.SpyObj<GameStateService>;

  beforeEach(() => {
    playerService = jasmine.createSpyObj('PlayerService', ['getPlayers']);
    gameStateService = jasmine.createSpyObj('GameStateService', [
      'getMaxCardSlots',
    ]);

    TestBed.configureTestingModule({
      declarations: [GameComponent],
      providers: [
        { provide: PlayerService, useValue: playerService },
        { provide: GameStateService, useValue: gameStateService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display players', () => {
    const players: Player[] = [
      { id: '1', score: 0, cards: [] },
      { id: '2', score: 0, cards: [] },
    ];

    playerService.getPlayers.and.returnValue(of(players));
    gameStateService.getMaxCardSlots.and.returnValue(5);

    fixture.detectChanges();

    const playerElements = fixture.nativeElement.querySelectorAll('app-player');
    expect(playerElements.length).toBe(players.length);
  });
});
