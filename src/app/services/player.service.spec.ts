import { TestBed } from '@angular/core/testing';
import { PlayerService } from './player.service';
import { CardService } from './card-service';
import { Player } from '../models/player.model';
import { Card } from '../models';

describe('PlayerService', () => {
  let playerService: PlayerService;
  let cardService: jasmine.SpyObj<CardService>;

  beforeEach(() => {
    cardService = jasmine.createSpyObj('CardService', ['dealCard']);

    TestBed.configureTestingModule({
      providers: [
        PlayerService,
        { provide: CardService, useValue: cardService },
      ],
    });

    playerService = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(playerService).toBeTruthy();
  });

  describe('initializePlayers', () => {
    it('should initialize players with the specified number', () => {
      const numPlayers = 3;

      playerService.initializePlayers(numPlayers);

      playerService.getPlayers().subscribe((players) => {
        expect(players.length).toBe(numPlayers);
      });
    });
  });

  describe('dealAndUpdatePlayer', () => {
    it('should deal a card from cardService and update player cards', () => {
      const player: Player = {
        id: 'Player 1',
        cards: [],
        score: 0,
      };
      playerService['playersSubject'].next([player]);

      const card: Card = {
        label: 'Card 1',
        value: 10,
        icon: 'card',
        isNewlyDealt: false,
      };

      cardService.dealCard.and.returnValue([card]);

      playerService.dealAndUpdatePlayer(player);

      playerService.getPlayers().subscribe((players) => {
        expect(players[0].cards.length).toBe(1);
        expect(players[0].score).toBe(card.value);
      });
    });
  });
});
