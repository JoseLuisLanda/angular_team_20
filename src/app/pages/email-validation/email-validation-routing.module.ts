import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailValidationComponent } from './components/email-validation/email-validation.component';

const routes: Routes = [
  {path: '/mode=:mode&oobCode=:code', component: EmailValidationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailValidationRoutingModule { }
