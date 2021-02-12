import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterPageRoutingModule } from './register-page-routing.module';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { RegisterPageFormComponent } from './components/register-page-form/register-page-form.component';


@NgModule({
  declarations: [RegisterPageComponent, RegisterPageFormComponent],
  imports: [
    CommonModule,
    RegisterPageRoutingModule
  ]
})
export class RegisterPageModule { }
