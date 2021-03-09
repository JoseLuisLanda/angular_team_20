import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunidadComponent } from './comunidad/comunidad.component';
import { TallerComponent } from './taller/taller.component';
import { CoursesComponent } from './course/courses/courses.component';
import { InsigniaComponent } from './insignia/insignia.component';

@NgModule({
  declarations: [
    ComunidadComponent,
    TallerComponent,
    CoursesComponent,
    InsigniaComponent,
  ],
  imports: [CommonModule],
  exports: [
    ComunidadComponent,
    TallerComponent,
    CoursesComponent,
    InsigniaComponent,
  ],
})
export class ComponentsModule {}
