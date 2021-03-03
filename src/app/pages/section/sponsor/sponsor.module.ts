import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorRoutingModule } from './sponsor-routing.module';
import { SponsorsComponent } from './sponsors/sponsors.component';
import {SwiperModule} from 'swiper/angular';


@NgModule({
  declarations: [SponsorsComponent],
  imports: [
    CommonModule,
    SponsorRoutingModule,
    SwiperModule
  ]
})
export class SponsorModule { }
