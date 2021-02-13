import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageFormComponent } from './register-page-form.component';

describe('RegisterPageFormComponent', () => {
  let component: RegisterPageFormComponent;
  let fixture: ComponentFixture<RegisterPageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
