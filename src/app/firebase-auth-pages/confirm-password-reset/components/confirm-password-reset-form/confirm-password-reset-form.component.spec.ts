import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPasswordResetFormComponent } from './confirm-password-reset-form.component';

describe('ConfirmPasswordResetFormComponent', () => {
  let component: ConfirmPasswordResetFormComponent;
  let fixture: ComponentFixture<ConfirmPasswordResetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPasswordResetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPasswordResetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
