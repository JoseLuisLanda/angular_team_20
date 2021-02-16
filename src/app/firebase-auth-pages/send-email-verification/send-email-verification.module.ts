import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendEmailVerificationRoutingModule } from './send-email-verification-routing.module';
import { SendEmailVerificationComponent } from './components/send-email-verification/send-email-verification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SendEmailVerificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SendEmailVerificationRoutingModule
  ]
})
export class SendEmailVerificationModule { }
