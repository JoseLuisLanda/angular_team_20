import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PerfilRutasModule } from './perfil-rutas.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PerfilRutasModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: []
})
export class PerfilModule { }
