import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilegruposComponent } from './profilegrupos.component';

describe('ProfilegruposComponent', () => {
  let component: ProfilegruposComponent;
  let fixture: ComponentFixture<ProfilegruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilegruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilegruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
