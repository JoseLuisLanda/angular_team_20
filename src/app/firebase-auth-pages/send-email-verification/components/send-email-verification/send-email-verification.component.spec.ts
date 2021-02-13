import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailVerificationComponent } from './send-email-verification.component';

describe('SendEmailVerificationComponent', () => {
  let component: SendEmailVerificationComponent;
  let fixture: ComponentFixture<SendEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEmailVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
