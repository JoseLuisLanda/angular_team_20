import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComunidadRoutingModule } from './comunidad-routing.module';
import { ComunidadesComponent } from './comunidades/comunidades.component';


@NgModule({
  declarations: [ComunidadesComponent],
  imports: [
    CommonModule,
    ComunidadRoutingModule
  ]
})
export class ComunidadModule { }
