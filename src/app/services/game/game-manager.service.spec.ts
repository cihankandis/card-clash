import { TestBed } from '@angular/core/testing';
import { GameManagerService } from './game-manager.service';
import { GameInitializationService } from './game-initialization.service';
import { GameStateService } from './game-state.service';
import { PlayerService } from '../player.service';
import { of } from 'rxjs';
import { Player } from 'src/app/models';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameManagerService', () => {
  let gameManagerService: GameManagerService;
  let gameInitializationService: jasmine.SpyObj<GameInitializationService>;
  let gameStateService: jasmine.SpyObj<GameStateService>;
  let playerService: jasmine.SpyObj<PlayerService>;

  beforeEach(() => {
    gameStateService = jasmine.createSpyObj('GameStateService', [
      'resetState',
      'incrementRound',
    ]);
    gameInitializationService = jasmine.createSpyObj(
      'GameInitializationService',
      ['initializeGame']
    );
    playerService = jasmine.createSpyObj('PlayerService', [
      'getPlayers',
      'dealAndUpdatePlayer',
    ]);

    TestBed.configureTestingModule({
      providers: [
        GameManagerService,
        {
          provide: GameInitializationService,
          useValue: gameInitializationService,
        },
        { provide: GameStateService, useValue: gameStateService },
        { provide: PlayerService, useValue: playerService },
      ],
      imports: [HttpClientTestingModule],
    });

    gameManagerService = TestBed.inject(GameManagerService);
  });

  it('should be created', () => {
    expect(gameManagerService).toBeTruthy();
  });

  describe('initializeGame', () => {
    it('should call initializeGame on GameInitializationService', () => {
      gameManagerService['initializeGame']();
      expect(gameInitializationService.initializeGame).toHaveBeenCalled();
    });
  });

  describe('restartGame', () => {
    it('should call initializeGame and startNewGame', () => {
      spyOn<any>(gameManagerService, 'initializeGame');
      spyOn(gameManagerService, 'startNewGame');
      gameManagerService.restartGame();
      expect(gameManagerService['initializeGame']).toHaveBeenCalled();
      expect(gameManagerService.startNewGame).toHaveBeenCalled();
    });
  });

  describe('startNewGame', () => {
    it('should reset the game state and call dealNextRound', () => {
      spyOn(gameManagerService, 'dealNextRound');
      gameManagerService.startNewGame();
      expect(gameStateService.resetState).toHaveBeenCalled();
      expect(gameManagerService.dealNextRound).toHaveBeenCalled();
    });
  });

  describe('dealNextRound', () => {
    it('should call getPlayers, dealAndUpdatePlayer and incrementRound', () => {
      const players: Player[] = [
        { id: 'Player 1', cards: [], score: 0 },
        { id: 'Player 2', cards: [], score: 0 },
      ];

      playerService.getPlayers.and.returnValue(of(players));

      gameManagerService.dealNextRound();

      expect(playerService.getPlayers).toHaveBeenCalled();
      expect(playerService.dealAndUpdatePlayer).toHaveBeenCalledWith(
        players[0]
      );
      expect(gameStateService.incrementRound).toHaveBeenCalled();
    });
  });
});
