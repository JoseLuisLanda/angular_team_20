import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyActionCodeComponent } from './apply-action-code.component';

describe('ApplyActionCodeComponent', () => {
  let component: ApplyActionCodeComponent;
  let fixture: ComponentFixture<ApplyActionCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyActionCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyActionCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
