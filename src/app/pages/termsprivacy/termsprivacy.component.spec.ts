import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsprivacyComponent } from './termsprivacy.component';

describe('TermsprivacyComponent', () => {
  let component: TermsprivacyComponent;
  let fixture: ComponentFixture<TermsprivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsprivacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsprivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
