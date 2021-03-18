import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunidadComponent } from './comunidad/comunidad.component';
import { TallerComponent } from './taller/taller.component';
import { CoursesComponent } from './course/courses/courses.component';
import { SponsorsComponent } from './sponsor/sponsors.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
@NgModule({
  declarations: [ComunidadComponent, TallerComponent, CoursesComponent, SponsorsComponent],
  imports: [CommonModule,IvyCarouselModule],
  exports: [ComunidadComponent, TallerComponent, CoursesComponent, SponsorsComponent],
})
export class ComponentsModule {}
