import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmPasswordResetRoutingModule } from './confirm-password-reset-routing.module';
import { ConfirmPasswordResetComponent } from './components/confirm-password-reset/confirm-password-reset.component';


@NgModule({
  declarations: [ConfirmPasswordResetComponent],
  imports: [
    CommonModule,
    ConfirmPasswordResetRoutingModule
  ]
})
export class ConfirmPasswordResetModule { }
