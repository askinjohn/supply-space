import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCardsComponent } from './store-cards.component';

describe('StoreCardsComponent', () => {
  let component: StoreCardsComponent;
  let fixture: ComponentFixture<StoreCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
