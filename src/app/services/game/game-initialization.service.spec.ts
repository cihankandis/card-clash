import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GameInitializationService } from './game-initialization.service';
import { ConfigService } from '../config.service';
import { CardService } from '../card-service';
import { PlayerService } from '../player.service';
import { GameStateService } from './game-state.service';
import { GameConfig } from '../../models/config.model';
import { GameState } from 'src/app/enums/game-state.enum';

describe('GameInitializationService', () => {
  let service: GameInitializationService;
  let configService: jasmine.SpyObj<ConfigService>;
  let gameStateService: jasmine.SpyObj<GameStateService>;
  let cardService: jasmine.SpyObj<CardService>;
  let playerService: jasmine.SpyObj<PlayerService>;

  beforeEach(() => {
    gameStateService = jasmine.createSpyObj('GameStateService', [
      'updateGameState',
      'setMaxCardSlots',
    ]);
    cardService = jasmine.createSpyObj('CardService', [
      'initializeCards',
      'shuffleCards',
    ]);
    playerService = jasmine.createSpyObj('PlayerService', [
      'initializePlayers',
    ]);
    configService = jasmine.createSpyObj('ConfigService', ['getConfig']);

    TestBed.configureTestingModule({
      providers: [
        GameInitializationService,
        { provide: ConfigService, useValue: configService },
        { provide: CardService, useValue: cardService },
        { provide: PlayerService, useValue: playerService },
        { provide: GameStateService, useValue: gameStateService },
      ],
    });

    service = TestBed.inject(GameInitializationService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('initializeGame', () => {
    it('should initialize game state, players, and cards using config', () => {
      const gameConfig: GameConfig = {
        maxCardSlots: 5,
        suits: [],
        numberOfPlayers: 2,
      };

      configService.getConfig.and.returnValue(of(gameConfig));

      service.initializeGame();

      expect(gameStateService.updateGameState).toHaveBeenCalledWith(
        GameState.NotStarted
      );
      expect(gameStateService.setMaxCardSlots).toHaveBeenCalledWith(
        gameConfig.maxCardSlots
      );
      expect(cardService.initializeCards).toHaveBeenCalledWith(
        gameConfig.suits
      );
      expect(cardService.shuffleCards).toHaveBeenCalled();
      expect(playerService.initializePlayers).toHaveBeenCalledWith(
        gameConfig.numberOfPlayers
      );
    });
  });
});
