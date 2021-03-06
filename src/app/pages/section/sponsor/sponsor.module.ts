import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorRoutingModule } from './sponsor-routing.module';
import { SponsorsComponent } from './sponsors/sponsors.component';


@NgModule({
  declarations: [SponsorsComponent],
  imports: [
    CommonModule,
    SponsorRoutingModule
  ]
})
export class SponsorModule { }
