import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoreFormComponent } from './create-store-form.component';

describe('CreateStoreFormComponent', () => {
  let component: CreateStoreFormComponent;
  let fixture: ComponentFixture<CreateStoreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStoreFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
