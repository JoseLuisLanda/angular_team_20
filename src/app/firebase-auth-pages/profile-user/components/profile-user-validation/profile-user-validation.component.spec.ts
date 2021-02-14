import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserValidationComponent } from './profile-user-validation.component';

describe('ProfileUserValidationComponent', () => {
  let component: ProfileUserValidationComponent;
  let fixture: ComponentFixture<ProfileUserValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
