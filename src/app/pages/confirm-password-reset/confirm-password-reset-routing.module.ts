import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmPasswordResetComponent } from './components/confirm-password-reset/confirm-password-reset.component';

const routes: Routes = [
  {path: '', component: ConfirmPasswordResetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmPasswordResetRoutingModule { }
