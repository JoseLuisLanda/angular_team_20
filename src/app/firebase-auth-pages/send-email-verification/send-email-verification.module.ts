import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendEmailVerificationRoutingModule } from './send-email-verification-routing.module';
import { SendEmailVerificationComponent } from './components/send-email-verification/send-email-verification.component';
import { SendEmailVerificationCbComponent } from './components/send-email-verification-cb/send-email-verification-cb.component';


@NgModule({
  declarations: [SendEmailVerificationComponent, SendEmailVerificationCbComponent],
  imports: [
    CommonModule,
    SendEmailVerificationRoutingModule
  ]
})
export class SendEmailVerificationModule { }
