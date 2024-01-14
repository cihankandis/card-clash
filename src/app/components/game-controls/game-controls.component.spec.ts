import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameControlsComponent } from './game-controls.component';
import { GameState } from 'src/app/enums/game-state.enum';
import { GameManagerService } from 'src/app/services/game/game-manager.service';
import { GameStateService } from 'src/app/services/game/game-state.service';
import { BehaviorSubject, of } from 'rxjs';

describe('GameControlsComponent', () => {
  let component: GameControlsComponent;
  let fixture: ComponentFixture<GameControlsComponent>;
  let gameManagerService: jasmine.SpyObj<GameManagerService>;
  let gameStateService: jasmine.SpyObj<GameStateService>;

  beforeEach(() => {
    const gameStateSubject = new BehaviorSubject<GameState>(
      GameState.NotStarted
    );
    const currentRoundSubject = new BehaviorSubject<number>(0);

    gameManagerService = jasmine.createSpyObj('GameManagerService', [
      'startNewGame',
      'restartGame',
      'dealNextRound',
    ]);

    gameStateService = jasmine.createSpyObj('GameStateService', [
      'currentRound$',
      'gameState$',
    ]);

    gameStateService.currentRound$ = currentRoundSubject.asObservable();
    gameStateService.gameState$ = gameStateSubject.asObservable();

    TestBed.configureTestingModule({
      declarations: [GameControlsComponent],
      providers: [
        { provide: GameManagerService, useValue: gameManagerService },
        { provide: GameStateService, useValue: gameStateService },
      ],
    });

    fixture = TestBed.createComponent(GameControlsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call startNewGame() on start new game button click', () => {
    fixture.detectChanges();
    const startNewGameButton = fixture.debugElement.nativeElement.querySelector(
      '#startNewGameButton'
    );
    startNewGameButton.click();
    expect(component.gameManagerService.startNewGame).toHaveBeenCalled();
  });

  it('should call restartGame() on restart game button click', () => {
    component.gameState$ = of(GameState.GameOver);
    fixture.detectChanges();

    const restartGameButton =
      fixture.debugElement.nativeElement.querySelector('#restartGameButton');
    restartGameButton.click();
    expect(component.gameManagerService.restartGame).toHaveBeenCalled();
  });

  it('should call dealNextRound() on deal next round button click', () => {
    component.gameState$ = of(GameState.Active);
    fixture.detectChanges();
    const dealNextRoundButton =
      fixture.debugElement.nativeElement.querySelector('#dealNextRoundButton');
    dealNextRoundButton.click();
    expect(component.gameManagerService.dealNextRound).toHaveBeenCalled();
  });
});
