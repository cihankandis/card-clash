import { shuffleArray, compareCards } from './card.utilities';
import { Card } from '../models';

describe('Card Utilities', () => {
  describe('shuffleArray', () => {
    it('should shuffle an array', () => {
      const originalArray = [1, 2, 3, 4, 5];
      const iterationCount = 100;
      const tolerance = 15;
      let equalCount = 0;

      const checkArraysEqual = (arr1: any[], arr2: any[]) => {
        if (arr1.length !== arr2.length) {
          return false;
        }
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
            return false;
          }
        }
        return true;
      };

      for (let i = 0; i < iterationCount; i++) {
        const shuffledArray = shuffleArray([...originalArray]);
        if (checkArraysEqual(originalArray, shuffledArray)) {
          equalCount++;
        }
      }

      expect(equalCount).toBeLessThan(tolerance);
    });

    it('should not modify the original array', () => {
      const originalArray = [1, 2, 3, 4, 5];

      const shuffledArray = shuffleArray([...originalArray]);

      expect(shuffledArray).not.toBe(originalArray);
    });
  });

  describe('compareCards', () => {
    it('should compare cards by icon primarily and value secondarily', () => {
      const cardA: Card = {
        icon: '&#x2661;',
        value: 2,
        label: 'test1',
        isNewlyDealt: false,
      };
      const cardB: Card = {
        icon: '&#x2660;',
        value: 3,
        label: 'test2',
        isNewlyDealt: false,
      };

      const result = compareCards(cardA, cardB);

      expect(result).toBe(cardA.icon.localeCompare(cardB.icon));
    });

    it('should return 0 for equal cards', () => {
      const cardA: Card = {
        icon: '&#x2660;',
        value: 2,
        label: 'test1',
        isNewlyDealt: false,
      };
      const cardB: Card = {
        icon: '&#x2660;',
        value: 2,
        label: 'test1',
        isNewlyDealt: false,
      };
      const result = compareCards(cardA, cardB);

      expect(result).toBe(0);
    });

    it('should compare cards by value if icons are the same', () => {
      const cardA: Card = {
        icon: '&#x2660;',
        value: 2,
        label: 'test1',
        isNewlyDealt: false,
      };
      const cardB: Card = {
        icon: '&#x2660;',
        value: 3,
        label: 'test2',
        isNewlyDealt: false,
      };

      const result = compareCards(cardA, cardB);

      expect(result).toBe(cardA.value - cardB.value);
    });
  });
});
