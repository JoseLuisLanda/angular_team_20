import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplyActionCodeRoutingModule } from './apply-action-code-routing.module';
import { ApplyActionCodeComponent } from './components/apply-action-code/apply-action-code.component';


@NgModule({
  declarations: [ApplyActionCodeComponent],
  imports: [
    CommonModule,
    ApplyActionCodeRoutingModule
  ]
})
export class ApplyActionCodeModule { }
