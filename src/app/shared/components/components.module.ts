import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComunidadComponent } from './comunidad/comunidad.component';
import { TallerComponent } from './taller/taller.component';

@NgModule({
  declarations: [ComunidadComponent, TallerComponent],
  imports: [CommonModule],
  exports: [ComunidadComponent, TallerComponent],
})
export class ComponentsModule {}
