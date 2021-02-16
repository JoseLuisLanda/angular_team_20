import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendPasswordResetEmailRoutingModule } from './send-password-reset-email-routing.module';
import { SendPasswordResetEmailComponent } from './components/send-password-reset-email/send-password-reset-email.component';
import { SendPasswordResetEmailCbComponent } from './components/send-password-reset-email-cb/send-password-reset-email-cb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendPasswordResetEmailFormComponent } from './components/send-password-reset-email-form/send-password-reset-email-form.component';


@NgModule({
  declarations: [SendPasswordResetEmailComponent, SendPasswordResetEmailCbComponent, SendPasswordResetEmailFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SendPasswordResetEmailRoutingModule
  ]
})
export class SendPasswordResetEmailModule { }
