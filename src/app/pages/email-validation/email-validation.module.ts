import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailValidationRoutingModule } from './email-validation-routing.module';
import { EmailValidationComponent } from './components/email-validation/email-validation.component';


@NgModule({
  declarations: [EmailValidationComponent],
  imports: [
    CommonModule,
    EmailValidationRoutingModule
  ]
})
export class EmailValidationModule { }
