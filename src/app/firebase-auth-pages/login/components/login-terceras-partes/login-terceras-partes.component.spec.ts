import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTercerasPartesComponent } from './login-terceras-partes.component';

describe('LoginTercerasPartesComponent', () => {
  let component: LoginTercerasPartesComponent;
  let fixture: ComponentFixture<LoginTercerasPartesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTercerasPartesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTercerasPartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
