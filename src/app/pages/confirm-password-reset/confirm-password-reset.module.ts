import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmPasswordResetRoutingModule } from './confirm-password-reset-routing.module';
import { ConfirmPasswordResetComponent } from './components/confirm-password-reset/confirm-password-reset.component';
import { ConfirmPasswordResetFormComponent } from './components/confirm-password-reset-form/confirm-password-reset-form.component';


@NgModule({
  declarations: [ConfirmPasswordResetComponent, ConfirmPasswordResetFormComponent],
  imports: [
    CommonModule,
    ConfirmPasswordResetRoutingModule
  ]
})
export class ConfirmPasswordResetModule { }
