import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPasswordResetEmailCbComponent } from './send-password-reset-email-cb.component';

describe('SendPasswordResetEmailCbComponent', () => {
  let component: SendPasswordResetEmailCbComponent;
  let fixture: ComponentFixture<SendPasswordResetEmailCbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendPasswordResetEmailCbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPasswordResetEmailCbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
