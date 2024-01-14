import { TestBed } from '@angular/core/testing';
import { Suit, Card } from '../models';
import { CardService } from './card-service';
import { compareCards } from '../utils/card.utilities';

describe('CardService', () => {
  let cardService: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardService],
    });

    cardService = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(cardService).toBeTruthy();
  });

  describe('initializeCards', () => {
    it('should initialize cards based on suits', () => {
      const suits: Suit[] = [
        {
          name: 'My suit',
          icon: 'icon-suit',
          cards: [
            { label: 'Ace', value: 1, icon: 'test', isNewlyDealt: false },
            { label: '2', value: 2, icon: 'test2', isNewlyDealt: false },
          ],
        },
      ];

      cardService.initializeCards(suits);

      expect(cardService['cards'].length).toEqual(2);
    });
  });

  describe('shuffleCards', () => {
    it('should shuffle the cards array', () => {
      const mockCards = [
        { label: 'Ace', value: 1, icon: 'test', isNewlyDealt: false },
        { label: '2', value: 2, icon: 'test', isNewlyDealt: false },
      ];
      cardService['cards'] = mockCards;

      cardService.shuffleCards();

      const shuffledCards = cardService['shuffledCards'];
      expect(shuffledCards).toBeDefined();
      expect(shuffledCards.length).toBe(mockCards.length);
    });
  });

  describe('dealCard', () => {
    it('should deal a card to the player and mark it as newly dealt', () => {
      cardService['shuffledCards'] = [
        { label: 'Ace', value: 1, icon: 'test', isNewlyDealt: false },
        { label: '2', value: 2, icon: 'test', isNewlyDealt: false },
      ];

      const playerCards: Card[] = [];

      const dealtCard = cardService.dealCard(playerCards);

      expect(dealtCard).toBeDefined();
      expect(dealtCard.length).toBe(1);
      expect(dealtCard[0].isNewlyDealt).toBe(true);
    });

    it('should not deal a card if no cards are left in the deck', () => {
      cardService['shuffledCards'] = [];

      const playerCards: Card[] = [];

      const dealtCard = cardService.dealCard(playerCards);

      expect(dealtCard).toEqual([]);
    });
  });

  describe('sortCards', () => {
    it('should sort the cards array', () => {
      const cards: Card[] = [
        { label: '2', value: 2, icon: 'test', isNewlyDealt: false },
        { label: 'Ace', value: 1, icon: 'test', isNewlyDealt: false },
      ];

      const sortedCards = cardService['sortCards'](cards);

      expect(sortedCards).toEqual(cards.sort(compareCards));
    });
  });
});
