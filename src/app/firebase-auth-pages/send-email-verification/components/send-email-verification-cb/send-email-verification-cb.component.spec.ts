import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailVerificationCbComponent } from './send-email-verification-cb.component';

describe('SendEmailVerificationCbComponent', () => {
  let component: SendEmailVerificationCbComponent;
  let fixture: ComponentFixture<SendEmailVerificationCbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEmailVerificationCbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailVerificationCbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
