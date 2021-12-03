import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpBlockComponent } from './otp-block.component';

describe('OtpBlockComponent', () => {
  let component: OtpBlockComponent;
  let fixture: ComponentFixture<OtpBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
