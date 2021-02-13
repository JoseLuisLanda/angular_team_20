import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendEmailVerificationComponent } from './components/send-email-verification/send-email-verification.component';

const routes: Routes = [
  {path: '', component: SendEmailVerificationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendEmailVerificationRoutingModule { }
