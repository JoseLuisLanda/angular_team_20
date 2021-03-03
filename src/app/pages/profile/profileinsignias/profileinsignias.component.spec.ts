import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileinsigniasComponent } from './profileinsignias.component';

describe('ProfileinsigniasComponent', () => {
  let component: ProfileinsigniasComponent;
  let fixture: ComponentFixture<ProfileinsigniasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileinsigniasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileinsigniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
