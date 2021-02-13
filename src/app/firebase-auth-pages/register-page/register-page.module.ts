import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPageRoutingModule } from './register-page-routing.module';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { RegisterPageFormComponent } from './components/register-page-form/register-page-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RegisterPageComponent, RegisterPageFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterPageRoutingModule
  ]
})
export class RegisterPageModule { }
