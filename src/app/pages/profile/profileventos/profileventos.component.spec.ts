import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileventosComponent } from './profileventos.component';

describe('ProfileventosComponent', () => {
  let component: ProfileventosComponent;
  let fixture: ComponentFixture<ProfileventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
