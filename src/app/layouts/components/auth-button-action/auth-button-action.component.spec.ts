import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthButtonActionComponent } from './auth-button-action.component';

describe('AuthButtonActionComponent', () => {
  let component: AuthButtonActionComponent;
  let fixture: ComponentFixture<AuthButtonActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthButtonActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthButtonActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
