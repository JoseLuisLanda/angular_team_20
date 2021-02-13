import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyActionCodeComponent } from './components/apply-action-code/apply-action-code.component';

const routes: Routes = [
  {path: '', component: ApplyActionCodeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplyActionCodeRoutingModule { }
