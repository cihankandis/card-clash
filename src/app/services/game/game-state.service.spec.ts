import { TestBed } from '@angular/core/testing';
import { GameStateService } from './game-state.service';
import { GameState } from 'src/app/enums/game-state.enum';

describe('GameStateService', () => {
  let gameStateService: GameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameStateService],
    });
    gameStateService = TestBed.inject(GameStateService);
  });

  it('should be created', () => {
    expect(gameStateService).toBeTruthy();
  });

  it('should initialize', () => {
    const initialRound = 0;
    const initialGameState = GameState.NotStarted;

    expect(gameStateService.currentRound$).toBeDefined();
    expect(gameStateService.gameState$).toBeDefined();

    gameStateService.currentRound$.subscribe((currentRound) => {
      expect(currentRound).toBe(initialRound);
    });

    gameStateService.gameState$.subscribe((gameState) => {
      expect(gameState).toBe(initialGameState);
    });
  });

  it('should reset state to Active', () => {
    gameStateService.resetState();

    gameStateService.gameState$.subscribe((gameState) => {
      expect(gameState).toBe(GameState.Active);
    });

    gameStateService.currentRound$.subscribe((currentRound) => {
      expect(currentRound).toBe(0);
    });
  });

  it('should increment round', () => {
    gameStateService.incrementRound();

    gameStateService.currentRound$.subscribe((currentRound) => {
      expect(currentRound).toBe(1);
    });

    gameStateService.gameState$.subscribe((gameState) => {
      expect(gameState).toBe(GameState.NotStarted);
    });
  });

  it('should update game state to GameOver when round limit is reached', () => {
    gameStateService.setMaxCardSlots(3);
    for (let i = 1; i <= 3; i++) {
      gameStateService.incrementRound();
    }
    gameStateService.gameState$.subscribe((gameState) => {
      expect(gameState).toBe(GameState.GameOver);
    });
  });

  it('should set and get max card slots', () => {
    const maxCardSlots = 5;
    gameStateService.setMaxCardSlots(maxCardSlots);

    const retrievedMaxCardSlots = gameStateService.getMaxCardSlots();
    expect(retrievedMaxCardSlots).toBe(maxCardSlots);
  });

  it('should check if round limit is reached', () => {
    gameStateService.setMaxCardSlots(3);

    expect(gameStateService['isRoundLimitReached']()).toBe(false);

    gameStateService['currentRoundSubject'].next(3);
    expect(gameStateService['isRoundLimitReached']()).toBe(true);
  });

  it('should update game state', () => {
    gameStateService.updateGameState(GameState.GameOver);

    gameStateService.gameState$.subscribe((gameState) => {
      expect(gameState).toBe(GameState.GameOver);
    });
  });
});
