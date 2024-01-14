import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    });

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display label and icon when isFaceUp is true', () => {
    const testLabel = 'Test Label';
    const testIcon = 'test icon';

    component.label = testLabel;
    component.icon = testIcon;
    component.isFaceUp = true;

    fixture.detectChanges();

    const cardElement = fixture.nativeElement;
    const labelElement = cardElement.querySelector('.card__label');
    const iconElement = cardElement.querySelector('.card__icon');

    expect(labelElement.textContent).toContain(testLabel);
    expect(iconElement.innerHTML).toContain(testIcon);
  });

  it('should not display label and icon when isFaceUp is false', () => {
    const testLabel = 'Test Label';
    const testIcon = 'test icon';

    component.label = testLabel;
    component.icon = testIcon;
    component.isFaceUp = false;

    fixture.detectChanges();

    const cardElement = fixture.nativeElement;
    const labelElement = cardElement.querySelector('.card__label');
    const iconElement = cardElement.querySelector('.card__icon');

    expect(labelElement).toBeNull();
    expect(iconElement).toBeNull();
  });

  it('should have card--highlighted class when isNewlyDealt is true', () => {
    component.isNewlyDealt = true;

    fixture.detectChanges();

    const cardElement = fixture.debugElement.query(
      By.css('#cardContent')
    ).nativeElement;

    expect(cardElement.classList.contains('card--highlighted')).toBeTruthy();
  });

  it('should not have card--highlighted class when isNewlyDealt is false', () => {
    component.isNewlyDealt = false;

    fixture.detectChanges();

    const cardElement = fixture.debugElement.query(
      By.css('#cardContent')
    ).nativeElement;

    expect(cardElement.classList.contains('card--highlighted')).toBeFalsy();
  });
});
