import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerComponent } from './player.component';
import { Card } from '../../models';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update emptyCardSlots when cards change', () => {
    const card1: Card = {
      label: 'my card1',
      value: 5,
      icon: 'my icon1',
      isNewlyDealt: false,
    };
    const card2: Card = {
      label: 'my card2',
      value: 3,
      icon: 'my icon2',
      isNewlyDealt: false,
    };

    component.maxCardSlots = 5;
    component.cards = [card1];

    fixture.detectChanges();

    expect(component.emptyCardSlots.length).toBe(4);

    component.cards = [card1, card2];

    fixture.detectChanges();

    expect(component.emptyCardSlots.length).toBe(3);
  });
});
