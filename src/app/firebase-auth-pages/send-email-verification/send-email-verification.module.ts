import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendEmailVerificationRoutingModule } from './send-email-verification-routing.module';
import { SendEmailVerificationComponent } from './components/send-email-verification/send-email-verification.component';


@NgModule({
  declarations: [SendEmailVerificationComponent],
  imports: [
    CommonModule,
    SendEmailVerificationRoutingModule
  ]
})
export class SendEmailVerificationModule { }
