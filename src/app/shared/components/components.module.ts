import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunidadComponent } from './comunidad/comunidad.component';
import { TallerComponent } from './taller/taller.component';
import { CoursesComponent } from './course/courses/courses.component';

@NgModule({
  declarations: [ComunidadComponent, TallerComponent,CoursesComponent],
  imports: [CommonModule],
  exports: [ComunidadComponent, TallerComponent, CoursesComponent],
})
export class ComponentsModule {}
