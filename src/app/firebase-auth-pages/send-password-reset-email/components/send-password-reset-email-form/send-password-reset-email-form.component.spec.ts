import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPasswordResetEmailFormComponent } from './send-password-reset-email-form.component';

describe('SendPasswordResetEmailFormComponent', () => {
  let component: SendPasswordResetEmailFormComponent;
  let fixture: ComponentFixture<SendPasswordResetEmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendPasswordResetEmailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPasswordResetEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
