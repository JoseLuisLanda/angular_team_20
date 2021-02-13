import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendPasswordResetEmailComponent } from './components/send-password-reset-email/send-password-reset-email.component';

const routes: Routes = [
  {path: '', component: SendPasswordResetEmailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendPasswordResetEmailRoutingModule { }
